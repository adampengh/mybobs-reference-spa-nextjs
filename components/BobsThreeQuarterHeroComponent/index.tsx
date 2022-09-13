import { BrManageContentButton, BrProps } from '@bloomreach/react-sdk';
import React from 'react';
import classNames from 'classnames';

const BobsThreeQuarterHeroComponent = ({ component, page }: BrProps): React.ReactElement | null => {
  const { document: documentRef } = component.getModels();
  const document = documentRef && page.getContent(documentRef);

  if (!document) {
    return page.isPreview() ? <div /> : null;
  }

  console.log(document?.getData());

  const {
    buttonLinkUrl,
    buttonText,
    description,
    imageAlignment,
    imageUrl,
    marketingText,
    priceInlayCompound,
    priceInlayPadding,
    priceInlayPosition,
    title,
  } = document?.getData();

  const {
    bgColor,
    bgUrl,
    borderColor,
    bottomText,
    hasBorder,
    isRound,
    price,
    textColor,
    topText,
  } = priceInlayCompound || {};

  const inlayClass = classNames(
    'three-quarter-hero__inlay',
    isRound && 'is-round',
    hasBorder && 'has-border',
    priceInlayPosition.selectionValues?.[0].key && `${priceInlayPosition.selectionValues?.[0].key}`,
  );

  const alignment = imageAlignment?.selectionValues?.[0]?.key;

  return (
    <section className={`three-quarter-hero ${alignment === 'left' ? 'left' : 'right'}`}>
      <BrManageContentButton content={document} />
      <div className='three-quarter-hero__img'>
        <img src={imageUrl} alt={title} />
        <div
          className={inlayClass}
          style={{
            backgroundColor: bgColor,
            borderColor,
            padding: `${priceInlayPadding}px`,
          }}
        >
          <p><strong>{ topText }</strong></p>
          <p>${ price }</p>
          <p>{ bottomText }</p>
        </div>
      </div>
      <div className='three-quarter-hero__text'>
        <h4>{ title }</h4>
        <p> { description }</p>
        { marketingText && <p><strong>{ marketingText }</strong></p>}
        <a className='btn btn-dark' href={buttonLinkUrl}>{ buttonText }</a>
      </div>
    </section>
  );
};

export { BobsThreeQuarterHeroComponent };
