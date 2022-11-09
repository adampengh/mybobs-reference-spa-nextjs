import { CommerceContext } from 'components/CommerceContext';
import React, { useContext, useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';

const DOCUMENTS_ENDPOINT = 'https://mybobs.bloomreach.io/delivery/site/v1/channels/mybobs/documents';

const ProductComparison = ({
  item,
  selectedVariant,
}: any) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filters, setFilters] = useState([]);

  // Fetch the product-comparison-rules document from the CMS
  useEffect(() => {
    fetch(`${DOCUMENTS_ENDPOINT}/content/documents/mybobs/product-comparison-rules`)
      .then((response) => response.json())
      .then((data) => {
        const [uuid] = Object.keys(data?.content);
        const rules = data?.content?.[uuid]?.data?.productComparisonRules;

        let productType = selectedVariant?.customAttrs
          .find((attribute: any) => attribute.name === 'product_type_category');
        productType = productType?.values?.[0];

        let filterRules = rules
          .find((comparisonRule: any) => comparisonRule.productType.includes(productType));
        filterRules = filterRules.filter;

        const localFilters = filterRules.map((filterRule: any) => {
          return selectedVariant.customAttrs
            .find((customAttr: any) => customAttr.name === filterRule);
        });
        setFilters(localFilters);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setIsLoaded(true);
      });
  }, []);

  if (!isLoaded) {
    return null;
  }

  if (!filters) {
    return null;
  }

  return (
    <section>
      <h1>Product comparison</h1>
      <ProductComparisonComponent
        item={item}
        selectedVariant={selectedVariant}
        filters={filters}
      />
    </section>
  );
};


const ProductComparisonComponent = ({
  item,
  selectedVariant,
  filters,
}: any) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState({});
  const pid = selectedVariant.itemId.id;
  const fieldsString = filters.map((filter: any) => filter.name).join(',');
  const filtersString = filters.map((filter: any) => `filter=${filter.name}=${filter.values[0]}`).join('&');

  const {
    discoveryAccountId,
    discoveryDomainKey,
  } = useContext(CommerceContext);

  const widgetType = 'item';
  const widgetId = '6j83n3lz';
  const fields = `pid,price,title,sku_list_price,sku_sale_price,sku_clearance_price,thumb_image,skuid,${fieldsString}`;
  const pathwaysUrl = `https://pathways-staging.dxpapi.com/api/v2/widgets/${widgetType}/${widgetId}?account_id=${discoveryAccountId}&domain_key=${discoveryDomainKey}&url=https%3A%2F%2Fwww.mybobs.com%2F&fields=${fields}&_br_uid_2=uid%3D4288793246591%3Av%3D12.0%3Ats%3D1657717734084%3Ahc%3D140&item_ids=${pid}&rows=3&${filtersString}`

  // Make request for pathways data
  useEffect(() => {
    fetch(pathwaysUrl)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data?.response?.docs);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error(err);
        setIsLoaded(true);
      });
  }, []);

  if (!isLoaded) {
    return null;
  }

  if (!products) {
    return (
      <h1>No Products Returned</h1>
    );
  }

  return (
    <section className='product-comparison'>
      <ul>
        <li>
          <img src={item.imageSet.original.link.href} alt='placeholder' />
          <p>{ item?.displayName }</p>
          <p>
            <CurrencyFormat
              className='product-comparison__price'
              displayType='text'
              prefix='$'
              decimalScale={2}
              fixedDecimalScale={true}
              value={ item?.purchasePrice?.moneyAmounts?.[0].amount }
            />
          </p>
        </li>
        {products.map((product: any, index: number) => {
          return (
            <li key={index}>
              <img src={product.thumb_image} alt='placeholder' />
              <p>{ product.title }</p>
              <CurrencyFormat
                className='product-comparison__price'
                displayType='text'
                prefix='$'
                decimalScale={2}
                fixedDecimalScale={true}
                value={ product?.price }
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ProductComparison;
