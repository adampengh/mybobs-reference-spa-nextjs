import { BrManageContentButton, BrProps } from '@bloomreach/react-sdk';
import React from 'react';
import { ContentCard } from '../../compounds';

const BobsThreeColumnImageCta = ({ component, page }: BrProps): React.ReactElement | null => {
  const { document: documentRef } = component.getModels();
  const document = documentRef && page.getContent(documentRef);

  if (!document) {
    return page.isPreview() ? <div /> : null;
  }

  const {
    buttonBgColor,
    buttonText,
    buttonTextColor,
    buttonUrl,
    contentCards,
    title,
  } = document?.getData();

  return (
    <section className={`three-column-image-cta ${page.isPreview() ? 'has-edit-button' : ''}`}>
      <BrManageContentButton content={document} />
      <h2>{ title }</h2>
      <div className='content-cards'>
        { contentCards.map((contentCard: any, key: number) => (
          <ContentCard key={key} content={contentCard} />
        ))}
      </div>
      <div className='show-more'>
        <a
          className='show-more__button'
          href={buttonUrl}
          style={{
            backgroundColor: buttonBgColor,
            color: buttonTextColor,
            border: `1px solid ${buttonTextColor}`,
          }}
        >{ buttonText }</a>
      </div>
    </section>
  );
};

export { BobsThreeColumnImageCta };
