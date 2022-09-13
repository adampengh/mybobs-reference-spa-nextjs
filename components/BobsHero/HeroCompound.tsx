import { BrPageContext } from '@bloomreach/react-sdk';
import React, { useContext } from 'react';

const HeroCompound = ({ compound }: any): React.ReactElement | null => {
  const page = useContext(BrPageContext);

  const {
    autoplay,
    imageUrl,
    loop,
    muted,
    openInNewWindow,
    overlayAlign,
    overlayBgColor,
    overlayBgUrl,
    overlayButtonBgColor,
    overlayButtonText,
    overlayButtonTextColor,
    overlayTextBottom,
    overlayTextColor,
    overlayTextTop,
    targetUrl,
    videoId,
  } = compound;

  if (!imageUrl && !videoId) {
    return null;
  }

  const alignment = overlayAlign?.selectionValues?.[0]?.key || 'left';

  return (
    <div className='hero-image'>
      <img src={imageUrl} alt={'hero image'} />

      <div
        className={`hero-image__overlay ${alignment}`}
        style={{
          backgroundColor: overlayBgColor,
          color: overlayTextColor,
        }}
      >
        { overlayTextTop && page
          && <div dangerouslySetInnerHTML={{ __html: page?.rewriteLinks(overlayTextTop?.value) }} /> }
      <a
        href={targetUrl}
        className='hero-image__overlay-button'
        style={{
          backgroundColor: overlayButtonBgColor,
          color: overlayButtonTextColor,
        }}
      >{ overlayButtonText }</a>
      { overlayTextBottom && page
          && <div
            dangerouslySetInnerHTML={{ __html: page?.rewriteLinks(overlayTextBottom?.value) }} /> }
      </div>
    </div>
  );
};

export default HeroCompound;
