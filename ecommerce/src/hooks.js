import { useEffect } from "react";
import { paramsActions, productsActions } from './reducers';
import { TOTAL_PRODUCTS } from './constants';


export const useLazyLoad = (scrollRef, dispatch) => {
  const scrollObserver = node => {
    const observer = new IntersectionObserver(changes => {
      changes.forEach(c => {
        if (c.intersectionRatio > 0) {
          dispatch({ type: paramsActions.INCREMENT_PAGE });
        }
      });
    }, {rootMargin: '0px 0px'});
    observer.observe(node);
  }
  
  useEffect(() => {
    if (scrollRef.current) scrollObserver(scrollRef.current);
  }, [scrollRef]);
}

export const useFetch = (url, params, productsData, productsDispatch) => { 
  const fetchProducts = async (url, productsDispatch) => {
    productsDispatch({ type: productsActions.LOADING, loading: true });
    const res = await fetch(url);
    const fetchedProducts = await res.json();
    productsDispatch({ type: productsActions.MERGE_PRODUCTS, products: fetchedProducts });
    productsDispatch({ type: productsActions.LOADING, loading: false });
  }

  useEffect(() => {
    if (!productsData.fetchedAll) fetchProducts(url, productsDispatch);
  }, [params._page, params._sort]);

  useEffect(() => {
    if (productsData.products.length >= TOTAL_PRODUCTS) {
      productsDispatch({ type: productsActions.FETCHED_ALL, fetchedAll: true })
    }
  }, [productsData.products.length])
}