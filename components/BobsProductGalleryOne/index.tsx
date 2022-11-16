import { BrProps } from '@bloomreach/react-sdk';
import { ContainerItem, getContainerItemContent } from '@bloomreach/spa-sdk';
import React from 'react';
import CommerceProductCompound from '../../compounds/CommerceProductCompound';

const BobsProductGalleryOne = ({ component, page }: BrProps<ContainerItem>): React.ReactElement => {
  const {
    title,
    shopAllLinkText,
    shopAllLinkUrl,
    products,
  } = component && page && getContainerItemContent<any>(component, page);

  return (
    <section className='product-gallery version-one'>
      <div className='product-gallery__heading'>
        <h3>{ title }</h3>
        {shopAllLinkText && shopAllLinkUrl
          && <p>
            <a href={shopAllLinkUrl}>{ shopAllLinkText }</a>
          </p>
        }
      </div>
      <div className='product-gallery__products'>
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <div className='product' key={index}>
              { products
                .filter((product: any, i: number) => index === i)
                .map((product: any, j: number) => (
                  <CommerceProductCompound
                    key={index}
                    product={product.commerceProductCompound} />
                ))
              }
            </div>
          );
        })}
      </div>
    </section>
  );
};

export { BobsProductGalleryOne };
