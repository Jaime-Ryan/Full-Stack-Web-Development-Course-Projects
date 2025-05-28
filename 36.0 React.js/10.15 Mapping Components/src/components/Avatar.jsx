import { memo, useState } from 'react';

/**
 * Avatar Component
 * Displays user profile image with fallback handling
 * Memoized for performance optimization
 */
const Avatar = memo(({ img, alt }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  if (imageError) {
    return (
      <div className="avatar avatar-fallback" role="img" aria-label={alt}>
        <span className="avatar-initials">
          {alt
            ?.split(' ')
            .map((name) => name[0])
            .join('')
            .toUpperCase() || '?'}
        </span>
      </div>
    );
  }

  return (
    <div className="avatar-container">
      {isLoading && (
        <div className="avatar-skeleton" aria-hidden="true">
          Loading...
        </div>
      )}
      <img
        className={`avatar ${isLoading ? 'avatar-loading' : ''}`}
        src={img}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
});

export default Avatar;
