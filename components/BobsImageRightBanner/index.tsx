import { BrManageContentButton, BrProps } from '@bloomreach/react-sdk';
import React from 'react';

const BobsImageRightBanner = ({ component, page }: BrProps): React.ReactElement | null => {
  const { document: documentRef } = component.getModels();
  const document = documentRef && page.getContent(documentRef);

  if (!document) {
    return page.isPreview() ? <div /> : null;
  }

  const {
    icon,
    title,
    description,
    imageUrl,
  } = document.getData();

  return (
    <section className='image-right-banner'>
      <BrManageContentButton content={document} />
      <div className='image-right-banner__inner'>
        <div className='image-right-banner__left'>
          <div>
            <span><img src='https://via.placeholder.com/32x32.jpg' alt='icon' /></span>
            <h4>{ title }</h4>
          </div>

          <p>{ description }</p>
        </div>
        <div className='image-right-banner__right'>
          <img src={imageUrl} alt={title} />
        </div>
      </div>
    </section>
  );
};

export { BobsImageRightBanner };
