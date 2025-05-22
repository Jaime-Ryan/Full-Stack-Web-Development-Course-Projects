require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set EJS as templating engine
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');

// Configure Axios defaults for Open Food Facts API
const api = axios.create({
    baseURL: 'https://world.openfoodfacts.org',
    headers: {
        'User-Agent': 'FoodFactsExplorer/1.0 (educational.project@example.com)'
    }
});

// Handle API errors
const handleApiError = (error) => {
    console.error('API Error:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        params: error.config?.params
    });
    return 'An error occurred while fetching data. Please try again.';
};

// Normalize text for comparison
const normalizeText = (text) => {
    if (!text) return '';
    return text.toLowerCase()
              .replace(/[^a-z0-9]/g, '')
              .trim();
};

// Check if a product matches search criteria
const isProductMatch = (product, searchTerm) => {
    if (!product) return false;

    const normalizedSearch = normalizeText(searchTerm);
    
    // Check primary fields (exact matches)
    const nameMatch = normalizeText(product.product_name).includes(normalizedSearch);
    const brandMatch = normalizeText(product.brands).includes(normalizedSearch);
    
    if (nameMatch || brandMatch) return { match: true, score: 2 };

    // Check secondary fields (partial matches)
    const genericNameMatch = normalizeText(product.generic_name).includes(normalizedSearch);
    const categoryMatch = product.categories_tags?.some(tag => 
        normalizeText(tag.replace(/^en:/, '')).includes(normalizedSearch)
    );

    if (genericNameMatch || categoryMatch) return { match: true, score: 1 };

    // Check if it might be a barcode
    if (/^\d+$/.test(searchTerm) && product.code === searchTerm) {
        return { match: true, score: 3 };
    }

    return { match: false, score: 0 };
};

// Routes
app.get('/', (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        console.error('Error rendering index:', error);
        res.status(500).render('error', { message: 'Error loading the home page' });
    }
});

// Search products
app.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        
        if (!query) {
            return res.redirect('/');
        }

        // URL encode the search terms
        const encodedQuery = encodeURIComponent(query);
        
        // Try V1 search endpoint for better full-text search
        let response = await api.get('/cgi/search.pl', {
            params: {
                search_terms: encodedQuery,
                page_size: 50, // Get more results for better filtering
                json: true,
                fields: 'code,product_name,image_url,nutriscore_grade,nova_group,ingredients_text,nutriments,brands,generic_name,categories_tags'
            }
        }).catch(error => {
            throw new Error(handleApiError(error));
        });

        let products = response.data.products || [];

        // If the query looks like a barcode, try direct product lookup
        if (/^\d+$/.test(query)) {
            try {
                const barcodeResponse = await api.get(`/api/v0/product/${query}.json`);
                if (barcodeResponse.data.product) {
                    products.unshift(barcodeResponse.data.product); // Add to start of results
                }
            } catch (error) {
                console.log('Barcode lookup failed, continuing with search results');
            }
        }

        // Score and filter products
        const scoredProducts = products
            .map(product => ({
                ...product,
                matchResult: isProductMatch(product, query)
            }))
            .filter(product => product.matchResult.match);

        // Sort by relevance score
        scoredProducts.sort((a, b) => b.matchResult.score - a.matchResult.score);

        // Get the final list of products
        let validProducts = scoredProducts.map(({ matchResult, ...product }) => product);

        // Fallback: If no relevant results but we have some results, show top 5 as suggestions
        const showingFallback = validProducts.length === 0 && products.length > 0;
        if (showingFallback) {
            validProducts = products
                .filter(p => p && p.product_name) // Ensure basic validity
                .slice(0, 5);
        }
        
        res.render('search-results', { 
            products: validProducts,
            query,
            error: null,
            showingFallback
        });
    } catch (error) {
        console.error('Search error:', error);
        res.render('search-results', { 
            products: [],
            query: req.query.q || '',
            error: error.message || 'Error searching products. Please try again.',
            showingFallback: false
        });
    }
});

// Get product details
app.get('/product/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            throw new Error('Product ID is required');
        }

        const response = await api.get(`/api/v0/product/${req.params.id}.json`).catch(error => {
            throw new Error(handleApiError(error));
        });
        
        if (!response || !response.data || !response.data.product) {
            throw new Error('Product not found');
        }

        res.render('product-details', { 
            product: response.data.product,
            error: null
        });
    } catch (error) {
        console.error('Product fetch error:', error);
        res.render('error', { 
            message: error.message || 'Error fetching product details. Please try again.'
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(err.status || 500).render('error', { 
        message: err.message || 'Something went wrong! Please try again.'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('error', { 
        message: 'Page not found'
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 