import React from 'react';
import CurrencyFormat from 'react-currency-format';

interface ProductPriceProps {
    price: any;
    salePrice?: any;
}

const ProductPrice = ({ price, salePrice }: ProductPriceProps): React.ReactElement => {
  if (salePrice && price !== salePrice) {
    return (
      <div className='product-price'>
        <CurrencyFormat
          className='product-price__sale'
          displayType='text'
          prefix='$'
          decimalScale={2}
          fixedDecimalScale={true}
          value={ 1299.00 }
        />
        <CurrencyFormat
          className='product-price__list'
          displayType='text'
          prefix='$'
          decimalScale={2}
          fixedDecimalScale={true}
          value={ 1499.00 }
        />
      </div>
    );
  }

  return (
    <div className='product-price'>
      <CurrencyFormat
        className='product-price__regular'
        displayType='text'
        prefix='$'
        decimalScale={2}
        fixedDecimalScale={true}
        value={ 1299.00 }
      />
    </div>
  );
};

export default ProductPrice;
