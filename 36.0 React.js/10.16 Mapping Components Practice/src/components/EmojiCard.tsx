import { memo } from 'react';
import type { EmojiEntry } from '../data/emojipedia';

interface EmojiCardProps {
  entry: EmojiEntry;
  onCardClick?: (entry: EmojiEntry) => void;
}

/**
 * EmojiCard component displays an individual emoji entry with its details.
 * Uses React.memo for performance optimization and follows accessibility best practices.
 */
const EmojiCard = memo(({ entry, onCardClick }: EmojiCardProps) => {
  const { emoji, name, meaning, category, tags } = entry;

  const handleClick = () => {
    onCardClick?.(entry);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <article 
      className="term"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={onCardClick ? "button" : undefined}
      tabIndex={onCardClick ? 0 : undefined}
      aria-label={`${name} emoji card${onCardClick ? ', click to interact' : ''}`}
    >
      <dt>
        <span 
          className="emoji" 
          role="img" 
          aria-label={name}
          title={`${emoji} - ${name}`}
        >
          {emoji}
        </span>
        <h3 className="term-title">{name}</h3>
      </dt>
      
      <dd>
        <p className="meaning">{meaning}</p>
        
        <div className="metadata">
          <span className="category" aria-label={`Category: ${category}`}>
            {category}
          </span>
          
          {tags.length > 0 && (
            <div className="tags" aria-label="Tags">
              {tags.map((tag, index) => (
                <span key={tag} className="tag">
                  {tag}
                  {index < tags.length - 1 && ', '}
                </span>
              ))}
            </div>
          )}
        </div>
      </dd>
    </article>
  );
});

// Display name for React DevTools
EmojiCard.displayName = 'EmojiCard';

export default EmojiCard; 