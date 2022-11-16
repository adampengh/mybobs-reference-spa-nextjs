import React, { useContext, useMemo } from 'react';
import { BrComponentContext, BrPageContext } from '@bloomreach/react-sdk';
import { ProductDetailInputProps, useProductDetail } from '@bloomreach/connector-components-react';
import { useCookies } from 'react-cookie';
import CurrencyFormat from 'react-currency-format';
import { CommerceContext } from '../components/CommerceContext';

const CommerceProductCompound = ({ product }: any): React.ReactElement | null => {
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

export default CommerceProductCompound;
