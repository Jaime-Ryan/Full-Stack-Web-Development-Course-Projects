// Main JavaScript file for Book Notes application

// Handle sort change
function handleSortChange(sortValue) {
    const url = new URL(window.location);
    url.searchParams.set('sort', sortValue);
    window.location.href = url.toString();
}

// Preview book cover when ISBN is entered
async function previewCover(isbn) {
    const coverPreview = document.getElementById('cover-preview');
    const coverImage = document.getElementById('cover-image');
    
    if (!isbn || isbn.trim() === '') {
        coverPreview.style.display = 'none';
        return;
    }
    
    try {
        // Clean ISBN (remove hyphens and spaces)
        const cleanIsbn = isbn.replace(/[-\s]/g, '');
        const coverUrl = `https://covers.openlibrary.org/b/isbn/${cleanIsbn}-L.jpg`;
        
        // Test if the cover exists
        const response = await fetch(`/api/check-cover/${cleanIsbn}`);
        const data = await response.json();
        
        if (data.exists) {
            coverImage.src = data.url;
            coverPreview.style.display = 'block';
        } else {
            coverPreview.style.display = 'none';
        }
    } catch (error) {
        console.error('Error checking cover:', error);
        coverPreview.style.display = 'none';
    }
}

// Handle image load errors
function handleImageError(img) {
    img.src = '/images/default-book-cover.svg';
    img.onerror = null; // Prevent infinite loop
}

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add loading states to forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                
                // Re-enable after 5 seconds as fallback
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                    submitBtn.innerHTML = originalText;
                }, 5000);
            }
        });
    });
    
    // Add smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add keyboard navigation for book cards
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const editLink = card.querySelector('a[href*="/edit"]');
                if (editLink) {
                    editLink.click();
                }
            }
        });
    });
    
    // Auto-focus first input on form pages
    const firstInput = document.querySelector('.form-input:first-of-type');
    if (firstInput) {
        firstInput.focus();
    }
    
    // Add confirmation for delete actions
    const deleteButtons = document.querySelectorAll('button[onclick*="confirm"]');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm('Are you sure you want to delete this book? This action cannot be undone.')) {
                e.preventDefault();
                return false;
            }
        });
    });
    
    // Enhance rating display with interactive stars
    const ratingSelects = document.querySelectorAll('select[name="rating"]');
    ratingSelects.forEach(select => {
        select.addEventListener('change', function() {
            updateRatingDisplay(this);
        });
        updateRatingDisplay(select); // Initialize
    });
});

// Update rating display with stars
function updateRatingDisplay(selectElement) {
    const value = parseInt(selectElement.value);
    const container = selectElement.parentNode;
    
    // Remove existing star display
    const existingStars = container.querySelector('.rating-stars-display');
    if (existingStars) {
        existingStars.remove();
    }
    
    if (value > 0) {
        const starsDisplay = document.createElement('div');
        starsDisplay.className = 'rating-stars-display';
        starsDisplay.style.marginTop = '0.5rem';
        starsDisplay.style.color = '#fbbf24';
        starsDisplay.innerHTML = '★'.repeat(value) + '☆'.repeat(10 - value);
        container.appendChild(starsDisplay);
    }
}

// Utility function to debounce API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced version of preview cover
const debouncedPreviewCover = debounce(previewCover, 500);

// Add event listeners for ISBN input
document.addEventListener('DOMContentLoaded', function() {
    const isbnInput = document.getElementById('isbn');
    if (isbnInput) {
        isbnInput.addEventListener('input', function() {
            debouncedPreviewCover(this.value);
        });
    }
});

// Handle network errors gracefully
window.addEventListener('online', function() {
    console.log('Connection restored');
    // You could add a notification here
});

window.addEventListener('offline', function() {
    console.log('Connection lost');
    // You could add a notification here
});

// Add print functionality
function printBookList() {
    window.print();
}

// Modal functionality
function openBookModal(bookCard) {
    if (!bookCard) return;
    
    const modal = document.getElementById('bookModal');
    const title = bookCard.dataset.bookTitle;
    const author = bookCard.dataset.bookAuthor;
    const cover = bookCard.dataset.bookCover;
    const rating = bookCard.dataset.bookRating;
    const ratingStars = bookCard.dataset.bookRatingStars;
    const date = bookCard.dataset.bookDate;
    const notes = bookCard.dataset.bookNotes;
    
    // Populate modal content
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalAuthor').textContent = `by ${author}`;
    document.getElementById('modalCover').src = cover;
    document.getElementById('modalCover').alt = `${title} cover`;
    
    // Rating
    if (rating) {
        document.getElementById('modalRatingStars').textContent = ratingStars;
        document.getElementById('modalRatingNumber').textContent = `(${rating}/10)`;
    } else {
        document.getElementById('modalRatingStars').textContent = '☆☆☆☆☆☆☆☆☆☆';
        document.getElementById('modalRatingNumber').textContent = '(No rating)';
    }
    
    // Date
    const dateContainer = document.getElementById('modalDateContainer');
    if (date) {
        document.getElementById('modalDate').textContent = date;
        dateContainer.style.display = 'flex';
    } else {
        dateContainer.style.display = 'none';
    }
    
    // Notes
    const notesContent = document.getElementById('modalNotesContent');
    if (notes && notes.trim()) {
        notesContent.textContent = notes;
        notesContent.className = 'modal-notes-content';
    } else {
        notesContent.textContent = 'No notes available for this book.';
        notesContent.className = 'modal-notes-content modal-no-notes';
    }
    
    // Show modal
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus management for accessibility
    const closeButton = modal.querySelector('.modal-close');
    closeButton.focus();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeBookModal() {
    const modal = document.getElementById('bookModal');
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Close modal when clicking outside and handle book card clicks
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('bookModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeBookModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeBookModal();
            }
        });
    }
    
    // Handle book card clicks using event delegation
    document.addEventListener('click', function(e) {
        // Find the closest book card
        const bookCard = e.target.closest('.clickable-card');
        if (bookCard) {
            // Don't open modal if clicking on action buttons
            if (e.target.closest('.book-actions')) {
                return;
            }
            console.log('Book card clicked:', bookCard.dataset.bookTitle);
            openBookModal(bookCard);
        }
    });
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleSortChange,
        previewCover,
        handleImageError,
        updateRatingDisplay,
        debounce,
        openBookModal,
        closeBookModal
    };
} 