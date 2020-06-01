import { useEffect } from "react";
import { pageActions } from './reducers';
import { PRODUCT_LIMIT } from './constants';


export const useLazyLoad = (scrollRef, dispatch, dependencies) => {
  const scrollObserver = node => {
    console.log('called')
    let productsLength = 0;
    const observer = new IntersectionObserver(changes => {
      changes.forEach(c => {
        console.log(c)
        if (c.intersectionRatio > 0) {
          dispatch({ type: pageActions.INCREMENT_PAGE })
          productsLength += PRODUCT_LIMIT; 
          if (productsLength >= 500) observer.unobserve(node);
          console.log(productsLength)
        }
      });
    }, {rootMargin: '700px 0px'});
    observer.observe(node);
  }
  useEffect(() => {
    console.log('DEPEND', dependencies)
    if (scrollRef.current) scrollObserver(scrollRef.current);
  }, dependencies);
}

