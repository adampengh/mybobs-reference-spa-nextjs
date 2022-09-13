import React from 'react';
import ProductPrice from '../../atoms/ProductPrice';

interface ProductCardProps {
  pid: string;
  price: string;
  salePrice?: string;
  image: string;
  title: string;
}

const ProductCard = ({
  pid,
  price,
  salePrice,
  image,
  title,
}: ProductCardProps): React.ReactElement | null => {
  const prefix = 'product-card';

  const productUrl = `/p/${pid}/${title.replace(/\s+/g, '-')}`;

  return (
    <div className={prefix}>
      <div className={`${prefix}__img`}>
        <a href={productUrl}>
          { image && <img src='https://via.placeholder.com/360x560.jpg' alt={ title } /> }
        </a>
      </div>

      <a href={productUrl}>
        <div className='product-card__details'>
          <p className='product-card__details-title'>{ title }</p>

          <div className='product-card__details-price'>
            <ProductPrice
              price={price}
              salePrice={salePrice}
            />
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
