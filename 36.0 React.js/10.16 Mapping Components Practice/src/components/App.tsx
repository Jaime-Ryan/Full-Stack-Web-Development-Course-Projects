import { useState, useMemo, useCallback } from 'react';
import EmojiCard from './EmojiCard';
import { emojipedia, type EmojiEntry } from '../data/emojipedia';

// Define the category filter type
type CategoryFilter = EmojiEntry['category'] | 'all';

/**
 * Main App component demonstrating React 19 mapping components
 * with TypeScript, filtering, and modern React patterns
 */
function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState<EmojiEntry | null>(null);

  // Get unique categories for filter buttons
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(emojipedia.map(entry => entry.category))
    );
    return ['all', ...uniqueCategories] as CategoryFilter[];
  }, []);

  // Filter emojis based on category and search term
  const filteredEmojis = useMemo(() => {
    return emojipedia.filter(entry => {
      const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  // Handle emoji card click
  const handleEmojiClick = useCallback((entry: EmojiEntry) => {
    setSelectedEmoji(entry);
    // Optional: Add analytics or other side effects here
    console.log(`Emoji clicked: ${entry.name}`);
  }, []);

  // Handle category filter change
  const handleCategoryChange = useCallback((category: CategoryFilter) => {
    setSelectedCategory(category);
  }, []);

  // Handle search input change
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }, []);

  // Clear selection modal
  const clearSelection = useCallback(() => {
    setSelectedEmoji(null);
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>Emojipedia</h1>
        <p>
          Discover the meaning behind your favorite emojis. Built with React 19, 
          TypeScript, and modern component mapping patterns.
        </p>
      </header>

      {/* Search and Filter Controls */}
      <section className="controls" aria-label="Search and filter controls">
        <div className="search-container">
          <label htmlFor="emoji-search" className="search-label">
            Search emojis:
          </label>
          <input
            id="emoji-search"
            type="text"
            placeholder="Search by name, meaning, or tags..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            aria-describedby="search-help"
          />
          <small id="search-help" className="search-help">
            Try searching for "strength", "love", or "celebration"
          </small>
        </div>

        <div className="filter-container">
          <fieldset className="category-filters">
            <legend>Filter by category:</legend>
            {categories.map(category => (
              <label key={category} className="filter-option">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(category)}
                  className="filter-radio"
                />
                <span className="filter-label">
                  {category === 'all' ? 'All Categories' : category}
                </span>
              </label>
            ))}
          </fieldset>
        </div>
      </section>

      {/* Results Summary */}
      <div className="results-summary" aria-live="polite">
        {searchTerm && (
          <p>
            Found {filteredEmojis.length} emoji{filteredEmojis.length !== 1 ? 's' : ''} 
            matching "{searchTerm}"
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        )}
      </div>

      {/* Emoji Grid - Demonstrating Component Mapping */}
      <main className="dictionary" role="main">
        {filteredEmojis.length > 0 ? (
          filteredEmojis.map(entry => (
            <EmojiCard
              key={entry.id}
              entry={entry}
              onCardClick={handleEmojiClick}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No emojis found matching your criteria.</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="reset-button"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Modal for selected emoji details */}
      {selectedEmoji && (
        <div 
          className="modal-overlay" 
          onClick={clearSelection}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div 
            className="modal-content" 
            onClick={e => e.stopPropagation()}
          >
            <header className="modal-header">
              <h2 id="modal-title">
                {selectedEmoji.emoji} {selectedEmoji.name}
              </h2>
              <button 
                onClick={clearSelection}
                className="close-button"
                aria-label="Close modal"
              >
                ×
              </button>
            </header>
            
            <div className="modal-body">
              <p className="modal-meaning">{selectedEmoji.meaning}</p>
              <div className="modal-metadata">
                <p><strong>Category:</strong> {selectedEmoji.category}</p>
                <p><strong>Tags:</strong> {selectedEmoji.tags.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>
          Built with React 19 • Demonstrating modern component mapping patterns • 
          <a 
            href="https://react.dev" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App; 