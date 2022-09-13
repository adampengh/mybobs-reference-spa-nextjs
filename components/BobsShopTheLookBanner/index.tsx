import { BrProps } from '@bloomreach/react-sdk';
import React, { useState } from 'react';

const BobsShopTheLookBanner = ({ component, page }: BrProps): React.ReactElement | null => {
  const [showOverlay, setShowOverlay] = useState(true);

  const { document: documentRef } = component.getModels();
  const document = documentRef && page.getContent(documentRef);

  if (!document) {
    return page.isPreview() ? <div>Please select a document</div> : null;
  }

  const {
    buttonText,
    expansionLinkText,
    expansionLinkUrl,
    imageUrl,
    products,
  } = document.getData();

  return (
    <section className='shop-the-look'>
      <img src={imageUrl} alt='' />

      <button
        className='shop-the-look__button'
        onClick={() => setShowOverlay(!showOverlay)}
      >
        <span>{ buttonText }</span>
      </button>

      <div className={`shop-the-look__overlay ${showOverlay ? 'show' : 'hide'}`}>
        <div className='shop-the-look__products'>
          { products.map((product: any, index: number) => {
            return (
              <a href={products.productUrl} key={index} className='shop-the-look__product'>
                <div className='shop-the-look__product-img'>
                  <img src={product.productImageUrl} alt={product.productDescription} />
                </div>
                <div className='shop-the-look__product-text'>
                  <p className='shop-the-look__product-description'>{ product.productDescription }</p>
                  <p className='shop-the-look__product-price'>{ product.productPrice }</p>
                </div>
              </a>
            );
          })}
        </div>
        <div className='shop-the-look__link'>
          <a href={expansionLinkUrl}>{expansionLinkText}</a>
        </div>
      </div>
    </section>
  );
};

export { BobsShopTheLookBanner };
