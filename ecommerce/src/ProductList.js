import React, { useEffect, useRef, useReducer } from 'react';
import Product from './Product';
import Loader from './Loader';
import Ad from './Ad';
import ScrollRef from './ScrollRef';

import {productsActions, pageActions, productsReducer, paginateReducer} from './reducers';
import { useLazyLoad } from './hooks';

import './ProductList.css';


const ProductList = props => {
  const productsState = { products: [], loading: false, fetchedAll: false };
  const paginateState = { page: 1 };
  const [productsData, productsDispatch] = useReducer(productsReducer, productsState);
  const [paginate, paginateDispatch] = useReducer(paginateReducer, paginateState);
  const scrollRef = useRef(null);

  const getProducts = async () => {
    const url = `http://localhost:3000/api/products?_page=${paginate.page}&_limit=12`
    productsDispatch({type: productsActions.LOADING, loading: true});
    const res = await fetch(url);
    const fetchedProducts = await res.json();
    productsDispatch({type: productsActions.MERGE_PRODUCTS, products: fetchedProducts });
    productsDispatch({type: productsActions.LOADING, loading: false });
    if (productsData.products.length >= 500){
      productsDispatch({ type: productsActions.FETCHED_ALL, fetchedAll: true })
    }
    console.log(productsData.products)
  }

  useLazyLoad(scrollRef, paginateDispatch);
  
  useEffect(() => {
    getProducts();
  }, [paginate.page]);

  const renderProductsAndAds = () => {
    return productsData.products.map((p ,i) => {
      let showAd = i > 0 && i % 12 === 0;
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
      <div className="ProductList">
        {renderProductsAndAds()}
      </div>
      {productsData.fetchedAll && <div className="ProductList-end">- end of catalogue -</div>}
      <ScrollRef productsLength={productsData.products.length} selector={scrollRef}/>
    </>
  );
}

export default ProductList;