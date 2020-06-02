import React, { useRef, useReducer } from 'react';
import Product from './Product';
import Loader from './Loader';
import Ad from './Ad';
import ScrollRef from './ScrollRef';
import SortProductList from './SortProductList';

import { useLazyLoad, useFetch } from './hooks';
import { getApiUrl } from './helpers';
import { AD_AFTER_PRODUCTS } from './constants';

import { 
  productsActions, 
  productsReducer,
  paramsActions, 
  paramsReducer, 
  productsInitialState,
  paramsInitialState
} from './reducers';

import './ProductList.css';

const ProductList = props => {
  
  const [productsData, productsDispatch] = useReducer(productsReducer, productsInitialState);
  const [params, paramsDispatch] = useReducer(paramsReducer, paramsInitialState);
  const url = getApiUrl(params);
  const scrollRef = useRef(null);
  
  useFetch(url, params, productsData, productsDispatch);
  useLazyLoad(scrollRef, paramsDispatch);

  const handleSort = (e) => {
    console.log('clicked', e.target.value)
    productsDispatch({ type: productsActions.FETCHED_ALL, fetchedAll: false })
    productsDispatch({ type: productsActions.RESET_PRODUCTS })
    paramsDispatch({ type: paramsActions.RESET_PAGE })
    paramsDispatch({ type: paramsActions.SORT_PAGE, sort: e.target.value })
  }

  const renderProductsAndAds = () => {
    return productsData.products.map((p ,i) => {
      const showAd = i > 0 && i % AD_AFTER_PRODUCTS === 0;
      return (
        <React.Fragment key={i}>
          {showAd && <Ad />}
          <Product product={p} />
        </React.Fragment>
      )
    });
  }

  return (
    <>
      {productsData.loading && <Loader />}
      <SortProductList handleSort={handleSort}/>
      <div className="ProductList">
        {renderProductsAndAds()}
      </div>
      {productsData.fetchedAll && <div className="ProductList-end">- end of catalogue -</div>}
      <ScrollRef productsLength={productsData.products.length} selector={scrollRef}/>
    </>
  );
}

export default ProductList;


