import React, { useContext, useMemo } from 'react';
import { BrComponentContext, BrPageContext, BrProps } from '@bloomreach/react-sdk';
import { ContainerItem, getContainerItemContent } from '@bloomreach/spa-sdk';
import { Tab, Tabs } from 'react-bootstrap';
import { ProductDetailInputProps, useProductDetail } from '@bloomreach/connector-components-react';
import { useCookies } from 'react-cookie';
import { CommerceContext } from 'components/CommerceContext';
import CurrencyFormat from 'react-currency-format';

interface BobsShopByStyle {
  title?: string;
}

const BobsShopByStyle = ({ component, page }: BrProps<ContainerItem>): React.ReactElement => {
  const {
    linkText,
    linkUrl,
    tabs,
    title,
  } = component && page && getContainerItemContent<any>(component, page);

  return (
    <section className='shop-by-style'>
      <div className='shop-by-style__top'>
        { title && <h1>{ title }</h1> }
        <p>
          <a href={linkUrl}>{linkText}</a>
        </p>
      </div>

      <div className='shop-by-style__tabs'>
        <Tabs
          defaultActiveKey={tabs[0].tabName}
          id="shop-by-style"
          className="mb-3"
        >
          { tabs.map((tab: any, index: number) => {
            const {
              buttonText,
              buttonUrl,
              commerceProductCompound: products,
              tabName,
              tabText,
              tabTitle,
            } = tab;
            return (
              <Tab key={index} eventKey={tabName} title={tabName}>
                <div className='tab-grid'>
                  <div className='text'>
                    <h3>{tabTitle}</h3>
                    <p>{tabText}</p>
                  </div>
                  { products.map((product: any, i: number) => {
                    return <Product component={component} product={product} key={i} />;
                  })}
                </div>
              </Tab>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

const Product = ({ product }: any): React.ReactElement | null => {
  const pids = product.productid.match(/id=([\w\d._=-]+[\w\d=]?)?;code=([\w\d._=/-]+[\w\d=]?)?/i) ?? [];
  const pid = `${pids[1]}___${pids[2]}`;

  const component = useContext(BrComponentContext);
  const page = useContext(BrPageContext);

  const { specifications: specificationsRef } = component?.getModels<any>();
  const specificationsBundle = specificationsRef && page?.getContent<Document>(specificationsRef);

  const [cookies] = useCookies(['_br_uid_2']);

  const {
    discoveryAccountId,
    discoveryAuthKey,
    discoveryConnector,
    discoveryCustomAttrFields,
    discoveryCustomVarAttrFields,
    discoveryCustomVarListPriceField,
    discoveryCustomVarPurchasePriceField,
    discoveryDomainKey,
    discoveryViewId,
    brEnvType,
  } = useContext(CommerceContext);

  const { keys = [] } = specificationsBundle?.getData() ?? {};
  const customAttrFields = useMemo(() => {
    const result = [...(discoveryCustomAttrFields ?? [])];
    keys.filter((key: any) => !result.includes(key)).forEach((key: any) => result.push(key));
    return result;
  }, [keys, discoveryCustomAttrFields]);

  const params: ProductDetailInputProps = useMemo(
    () => ({
      itemId: pid,
      brUid2: cookies._br_uid_2,
      connector: discoveryConnector,
      customAttrFields,
      customVariantAttrFields: discoveryCustomVarAttrFields,
      customVariantListPriceField: discoveryCustomVarListPriceField,
      customVariantPurchasePriceField: discoveryCustomVarPurchasePriceField,
      discoveryAccountId,
      discoveryAuthKey,
      discoveryDomainKey,
      discoveryViewId,
      brEnvType,
    }),
    [
      cookies._br_uid_2,
      customAttrFields,
      pid,
      discoveryAccountId,
      discoveryAuthKey,
      discoveryConnector,
      discoveryCustomVarAttrFields,
      discoveryCustomVarListPriceField,
      discoveryCustomVarPurchasePriceField,
      discoveryDomainKey,
      discoveryViewId,
      brEnvType,
    ],
  );

  const [item, loading, error] = useProductDetail(params);

  if (loading) {
    return <div className="shimmer py-3 mb-2" />;
  }

  if (error) {
    return null;
  }

  if (!item) {
    return null;
  }

  return (
    <div>
      <img src={item?.imageSet?.original?.link?.href} alt={item?.displayName} loading='lazy' />
      <p style={{ fontWeight: 'bold' }}>{ item?.displayName }</p>
      <CurrencyFormat
        displayType='text'
        prefix='$'
        decimalScale={2}
        fixedDecimalScale={true}
        value={ item?.purchasePrice?.moneyAmounts?.[0]?.displayValue }
      />
    </div>
  );
};

export { BobsShopByStyle };
