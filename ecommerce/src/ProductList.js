import React, { useEffect, useRef, useReducer } from 'react';
import Product from './Product';
import Loader from './Loader';
import Ad from './Ad';
import ScrollRef from './ScrollRef';
import SortProductList from './SortProductList';

import { useLazyLoad } from './hooks';
import {PRODUCT_LIMIT, AD_AFTER_PRODUCTS} from './constants';

import { 
  productsActions, 
  productsReducer, 
  paginateReducer, 
  productsInitialState,
  paginateInitialState
} from './reducers';

import './ProductList.css';


const ProductList = props => {
  
  const [productsData, productsDispatch] = useReducer(productsReducer, productsInitialState);
  const [paginate, paginateDispatch] = useReducer(paginateReducer, paginateInitialState);
  const scrollRef = useRef(null);
  let sortRef = useRef();

  const getProducts = async () => {
    const url = `http://localhost:3000/api/products?_page=${paginate.page}&_limit=${PRODUCT_LIMIT}&_sort=${productsData.sort}`
    productsDispatch({type: productsActions.LOADING, loading: true});
    const res = await fetch(url);
    const fetchedProducts = await res.json();
    if(sortRef.current){
      productsDispatch({type: productsActions.RESET_PRODUCTS})
      sortRef.current = false;
    }
    productsDispatch({type: productsActions.MERGE_PRODUCTS, products: fetchedProducts });
    productsDispatch({type: productsActions.LOADING, loading: false });
    if (productsData.products.length >= 500){
      productsDispatch({ type: productsActions.FETCHED_ALL, fetchedAll: true })
    }
    console.log(productsData.products)
  }

  useLazyLoad(scrollRef, paginateDispatch, [productsData.sort]);
  
  useEffect(() => {
    getProducts();
  }, [paginate.page, productsData.sort]);

  const handleSort = (e) => {
    sortRef.current = true;
    productsDispatch({type: productsActions.SORT_PRODUCTS, sort: e.target.value})
  }

  const renderProductsAndAds = () => {
    return productsData.products.map((p ,i) => {
      let showAd = i > 0 && i % AD_AFTER_PRODUCTS === 0;
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



// function Counter() {
//   const [count, setCount] = useState(0);

//   const prevCountRef = useRef();
//   useEffect(() => {
//     prevCountRef.current = count;
//   });
//   const prevCount = prevCountRef.current;

//   return <h1>Now: {count}, before: {prevCount}</h1>;
// }