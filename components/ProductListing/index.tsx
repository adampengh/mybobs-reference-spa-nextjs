import { BrComponent, BrProps } from '@bloomreach/react-sdk';
import { useCookies } from 'react-cookie';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  CategoryInputProps,
  useCategory,
  useProductGridCategory,
  useProductGridSearch,
} from '@bloomreach/connector-components-react';
import { useRouter } from 'next/router';
import { Reference } from '@bloomreach/spa-sdk';
import { CommerceContext } from '../CommerceContext';
import { Container, Row, Column } from '../../uikit';
import PageTitle from '../atoms/PageTitle';
import ProductCard from '../molecules/ProductCard';
import FacetsList from './FacetsList';
import VisualNavigation from './VisualNavigation';

type SearchHookType = typeof useProductGridSearch | typeof useProductGridCategory;
type ProductGridParamsType = Parameters<SearchHookType>[0];

const ProductListing = ({ component, page }: BrProps): React.ReactElement | null => {
  const router = useRouter();
  const [cookies] = useCookies(['_br_uid_2']);
  const limit = 24;
  const searchType = 'category';
  const view = '';

  const [mobileColumns, setMobileColumns] = useState(2);
  const [desktopColumns, setDesktopColumns] = useState(3);

  // let [querySort, ] = useState('-price');
  const [queryPageSize, setQueryPageSize] = useState(24);
  // let [queryOffset, ] = useState(0);

  const {
    categoryId,
  } = component.getParameters();

  const {
    discoveryDomainKey,
    discoveryConnector,
    discoveryViewId,
    discoveryAccountId,
    discoveryAuthKey,
    discoveryCustomAttrFields,
    discoveryCustomVarAttrFields,
    discoveryCustomVarListPriceField,
    discoveryCustomVarPurchasePriceField,
    brEnvType,
  } = useContext(CommerceContext);

  const filtersParameter = '';
  const allowedFilters = useMemo(
    () =>
      filtersParameter
        .split(';')
        .map((filter) => filter.trim())
        .filter(Boolean),
    [filtersParameter],
  );

  const queryParameter = '';
  const query = useMemo(() => (router.query.q as string) ?? queryParameter, [router.query.q, queryParameter]);

  const id = component?.getId() ?? '';
  const { pageNumber, sortFields, filters } = useMemo(() => {
    const search = new URLSearchParams(router.asPath.split('?')[1] ?? '');
    return {
      pageNumber: Number(search.get(`${id}:page`) ?? 1),
      sortFields: search.get(`${id}:sort`) ?? undefined,
      filters:
        allowedFilters
          ?.map((filter) => ({ id: filter, values: search.getAll(`${id}:filter:${filter}`) }))
          .filter(({ values }) => values.length) ?? [],
    };
  }, [id, allowedFilters, router.asPath]);

  const params: ProductGridParamsType = useMemo(() => {
    const defaults: ProductGridParamsType = {
      discoveryAccountId,
      discoveryAuthKey,
      discoveryDomainKey,
      sortFields,
      customAttrFields: discoveryCustomAttrFields,
      customVariantAttrFields: discoveryCustomVarAttrFields,
      customVariantListPriceField: discoveryCustomVarListPriceField,
      customVariantPurchasePriceField: discoveryCustomVarPurchasePriceField,
      facetFieldFilters: filters,
      pageSize: limit,
      connector: discoveryConnector,
      offset: limit * (pageNumber - 1),
      brUid2: cookies._br_uid_2,
      discoveryViewId: view || discoveryViewId,
      brEnvType,
    };
    if (searchType === 'category') {
      return {
        ...defaults,
        categoryId: categoryId || ' ', // workaround for "All categories"
      };
    }

    return {
      ...defaults,
      searchText: query,
    };
  }, [
    discoveryAccountId,
    discoveryAuthKey,
    discoveryDomainKey,
    sortFields,
    discoveryCustomAttrFields,
    discoveryCustomVarAttrFields,
    discoveryCustomVarListPriceField,
    discoveryCustomVarPurchasePriceField,
    filters,
    limit,
    discoveryConnector,
    pageNumber,
    cookies._br_uid_2,
    view,
    discoveryViewId,
    query,
    categoryId,
    brEnvType,
  ]);

  // const [pageState, setPageState] = useState(page);
  // const [sortingState, setSorting] = useState(sortFields);
  // const [filtersState, setFilters] = useState<any[]>(filters);
  // const [filteringVisibility, toggleFiltering] = useState(false);
  // const [action, setAction] = useState<string>();
  const [error, setError] = useState<Error>();

  const useSearch: SearchHookType = searchType === 'category' ? useProductGridCategory : useProductGridSearch;
  const [, results, loading, searchError] = useSearch(params as any);
  useEffect(() => {
    setError(searchError);
  }, [searchError]);

  if (loading) {
    return null;
  }

  if (error) {
    return <div className="alert alert-danger" role="alert">{error.message}</div>;
  }

  if (!results) {
    return null;
  }

  const {
    // count,
    facetResult,
    items,
    // offset,
    // total,
  } = results;

  console.log('facet result', facetResult);

  // ================================================
  // Inline Content Banners
  // ================================================
  const productListingInlineBanners = component.getComponent('ProductListingInlineBanners');
  const paginationRef = productListingInlineBanners && productListingInlineBanners?.getModels()?.pagination;
  const pagination = paginationRef && page.getContent(paginationRef);

  const documentRef = pagination && pagination?.getItems()?.[0];
  const document = documentRef && page?.getContent(documentRef);

  const { contentCards, categoryId: inlineBannersCategoryId } = document.getData();
  console.log('inlineBannersCategoryId', inlineBannersCategoryId);
  // let cards = [];
  const cards = inlineBannersCategoryId === categoryId
    ? contentCards?.map((reference: Reference) => {
      const item = page.getContent(reference);
      return item?.getData();
    })
    : [];

  const sortedBanners = cards && cards.sort((a: any, b: any) => {
    return a?.position - b?.position;
  });
  const products = items.map((item: any, index: number) => {
    return sortedBanners?.find((banner: any) => banner.position === index + 1) || item;
  });

  // ================================================
  // Visual Navigation
  // ================================================
  const visualNavigationComponent = component.getComponent('VisualNavigation');
  const model = visualNavigationComponent && visualNavigationComponent.getModels();
  const visualNavPaginationRef = model && model.pagination;
  const visualNavPaginationPagination = visualNavPaginationRef && page.getContent(visualNavPaginationRef);
  const ref = visualNavPaginationPagination && visualNavPaginationPagination?.getItems()?.[0];
  const visualNavigation = ref && page?.getContent(ref);
  console.log('visualNavigation', visualNavigation.getData());
  const {
    categoryId: visualNavCategory,
    categories,
  } = visualNavigation?.getData();

  return (
    <>
      <Container className={`full-width pt-3 ${categoryId === visualNavCategory ? 'has-visual-navigation' : ''}`}>
        <Container>
          <Row>
            <Column>
              Breadcrumbs
              {/* <CategoryBreadcrumb text={pageTitle} /> */}
            </Column>
          </Row>
        </Container>
        { categoryId === visualNavCategory
          && <Row>
            <VisualNavigation categories={categories} />
          </Row>
        }
      </Container>

      <Container className='product-listing'>
        <Row>
          <Column>
            <CategoryName categoryId={categoryId} />
          </Column>
        </Row>

        <Row className='product-listing__header'>
          <Column className='product-listing__header-sorting'>
            <label>Sort By: </label>
            <select>
              <option>Newest</option>
              <option>Best Selling</option>
              <option>Price: High to Low</option>
              <option>Price: Low to Hight</option>
            </select>
          </Column>
          <Column className='product-listing__header-options'>
            <span className='button-group'>
              <label>Grid View: </label>
              <span className='hidden-lg'>
                {[1, 2].map((item) => {
                  return (
                    <button
                      className={`button ${mobileColumns === item ? 'active' : ''}`}
                      value={ item }
                      onClick={() => setMobileColumns(Number(item))}
                      key={item}
                    >
                      { item }
                    </button>
                  );
                })}
              </span>
              <span className='hidden-sm hidden-md'>
                {[3, 4].map((item) => {
                  return (
                    <button
                      className={`button ${desktopColumns === item ? 'active' : ''}`}
                      value={ item }
                      onClick={() => setDesktopColumns(Number(item))}
                      key={item}
                    >
                      { item }
                    </button>
                  );
                })}
              </span>
            </span>
            <span className='button-group'>
              <label>Products: </label>
              <span>
                {[24, 48].map((item, index) => {
                  return (
                    <button
                      className={`button ${queryPageSize === item ? 'active' : ''}`}
                      value={ item }
                      onClick={() => setQueryPageSize(Number(item))}
                      key={index}
                    >
                      { item }
                    </button>
                  );
                })}
              </span>
            </span>
          </Column>
        </Row>

        <Row className='product-grid'>
          <Column className='product-grid__facets'>
              <p>Facets</p>
              <FacetsList facets={facetResult?.fields} />
          </Column>
          <Column className='product-grid__grid'>
            <ul
              className='product-grid__list'
              data-mobile-columns={mobileColumns}
              data-desktop-columns={desktopColumns}>
              { products && products.map((item: any, index: number) => {
                return <Item item={item} key={index} />;
              }) }
            </ul>
          </Column>
        </Row>

        <Row>
          <Column>
            {/* <p style={{ textAlign: 'center' }}>
              Items <span>{ start }</span> to <span>{ end }</span> of <span>{ total } </span>
            </p> */}
          </Column>
        </Row>
      </Container>
    </>
  );
};

const Item = ({ item }: any): React.ReactElement | null => {
  if (item.contentType) {
    const {
      contentCardCompound,
    } = item;

    const {
      image,
    } = contentCardCompound;

    const {
      altText,
      desktopImageUrl,
      mobileImageUrl,
    } = image;
    return (
      <div className='product-card in-grid-banner'>
        <img src={desktopImageUrl} alt={altText} />
      </div>
    );
  }

  // eslint-disable-next-line
  if (item.__typename === 'Item') {
    return (
      <ProductCard
        pid={item?.itemId.id}
        image={item?.imageSet?.original?.link?.href}
        title={item?.displayName}
        price={item.listPrice?.moneyAmounts?.[0].amount}
        salePrice={item?.purchasePrice?.moneyAmounts?.[0].amount}
      />
    );
  }

  return null;
};

const CategoryName = ({ categoryId }: { categoryId: string; }): React.ReactElement | null => {
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
  const [cookies] = useCookies(['_br_uid_2']);
  const params: CategoryInputProps = useMemo(
    () => ({
      categoryId,
      brUid2: cookies._br_uid_2,
      connector: discoveryConnector,
      customAttrFields: discoveryCustomAttrFields,
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
      categoryId,
      cookies._br_uid_2,
      discoveryCustomAttrFields,
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
  const [category] = useCategory(params);
  if (!category) {
    return null;
  }

  return (
    <PageTitle as='h1' style={{ textAlign: 'left' }}>{ category.displayName }</PageTitle>
  );
};

export { ProductListing };
