import React from 'react';
import styles from './ContentCard.module.scss';

const ContentCard = ({ content }: any): React.ReactElement => {
  const {
    buttonText,
    buttonUrl,
    description,
    imageUrl,
    title,
  } = content;

  return (
    <div className={`${styles['content-card']}`}>
      <img src={imageUrl} alt={description} />
      <h4 className={`${styles['content-card__title']}`}>{ title }</h4>
      { description && <p className={`${styles['content-card__description']}`}>{ description }</p> }
      <a className={`${styles['content-card__button']}`} href={buttonUrl}>{ buttonText }</a>
    </div>
  );
};

export { ContentCard };
