import { memo } from 'react';
import Avatar from './Avatar';
import Detail from './Detail';

/**
 * Contact Card Component
 * Displays contact information in a card format
 * Memoized for performance optimization
 */
const Card = memo(({ id, name, img, tel, email }) => {
  return (
    <article className="card" role="article" aria-labelledby={`contact-${id}`}>
      <div className="top">
        <h2 id={`contact-${id}`} className="name">
          {name}
        </h2>
        <Avatar img={img} alt={`${name}'s profile picture`} />
      </div>
      <div className="bottom">
        <Detail
          detailInfo={tel}
          type="phone"
          icon="📞"
          aria-label={`Phone number: ${tel}`}
        />
        <Detail
          detailInfo={email}
          type="email"
          icon="✉️"
          aria-label={`Email address: ${email}`}
        />
      </div>
    </article>
  );
});

// PropTypes validation for development
if (process.env.NODE_ENV === 'development') {
  Card.propTypes = {
    id: (props, propName, componentName) => {
      if (typeof props[propName] !== 'number') {
        return new Error(
          `Invalid prop \`${propName}\` of type \`${typeof props[propName]}\` supplied to \`${componentName}\`, expected \`number\`.`
        );
      }
    },
    name: (props, propName, componentName) => {
      if (typeof props[propName] !== 'string' || props[propName].length === 0) {
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected non-empty string.`
        );
      }
    },
    img: (props, propName, componentName) => {
      if (
        typeof props[propName] !== 'string' ||
        !props[propName].startsWith('http')
      ) {
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected valid URL string.`
        );
      }
    },
    tel: (props, propName, componentName) => {
      if (typeof props[propName] !== 'string') {
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected string.`
        );
      }
    },
    email: (props, propName, componentName) => {
      if (
        typeof props[propName] !== 'string' ||
        !props[propName].includes('@')
      ) {
        return new Error(
          `Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected valid email string.`
        );
      }
    },
  };
}

export default Card;
