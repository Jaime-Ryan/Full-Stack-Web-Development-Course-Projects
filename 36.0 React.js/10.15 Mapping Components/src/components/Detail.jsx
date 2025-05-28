import { memo, useCallback } from 'react';

/**
 * Detail Component
 * Displays contact detail information (phone/email) with interactive functionality
 * Memoized for performance optimization
 */
const Detail = memo(({ detailInfo, type, icon, ...props }) => {
  const handleClick = useCallback(() => {
    if (type === 'phone') {
      window.location.href = `tel:${detailInfo}`;
    } else if (type === 'email') {
      window.location.href = `mailto:${detailInfo}`;
    }
  }, [detailInfo, type]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick]
  );

  return (
    <div
      className={`detail detail-${type}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      title={type === 'phone' ? 'Click to call' : 'Click to send email'}
      {...props}
    >
      <span className="detail-icon" aria-hidden="true">
        {icon}
      </span>
      <span className="detail-text">{detailInfo}</span>
    </div>
  );
});

export default Detail;
