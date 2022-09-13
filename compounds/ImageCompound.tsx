import React, { useContext } from 'react';
import { BrPageContext } from '@bloomreach/react-sdk';

import styles from './ImageCompound.module.scss';

const ImageCompound = ({ image }: any): React.ReactElement => {
  const page = useContext(BrPageContext);
  const {
    desktopImageUrl,
    mobileImageUrl,
    overlayText,
  } = image;

  return (
    <div className={`${styles.imagecompound}`}>
      <picture>
        { mobileImageUrl && <source srcSet={mobileImageUrl} media="(max-width: 800px)"></source>}
        <img src={desktopImageUrl} alt="Desktop" />
      </picture>
      { page && overlayText
        && <div
          className={`${styles['overlay-text']}`}
          >
            <div dangerouslySetInnerHTML={{ __html: page?.rewriteLinks(page?.sanitize(overlayText?.value)) }} />
          </div>
      }
    </div>
  );
};

export { ImageCompound };
