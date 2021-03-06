import { useEffect, useCallback } from "react";
import { paramsActions, productsActions } from './reducers';
import { TOTAL_PRODUCTS } from './constants';


export const useLazyLoad = (scrollRef, dispatch) => {
  const scrollObserver = useCallback(node => {
    const observer = new IntersectionObserver(changes => {
      changes.forEach(c => {
        if (c.intersectionRatio > 0) {
          dispatch({ type: paramsActions.INCREMENT_PAGE });
        }
      });
    }, {rootMargin: '500px 0px'});
    observer.observe(node);
  }, [dispatch]);
  
  useEffect(() => {
    if (scrollRef.current) scrollObserver(scrollRef.current);
  }, [scrollObserver, scrollRef]);
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
  }, [params._page, params._sort, url, productsDispatch, productsData.fetchedAll]);

  useEffect(() => {
    if (productsData.products.length >= TOTAL_PRODUCTS) {
      productsDispatch({ type: productsActions.FETCHED_ALL, fetchedAll: true })
    }
  }, [productsData.products.length, productsDispatch])
}