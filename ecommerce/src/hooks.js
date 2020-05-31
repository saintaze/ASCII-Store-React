import { useEffect } from "react";
import { pageActions } from './reducers';

export const useLazyLoad = (scrollRef, dispatch) => {
  const scrollObserver = node => {
    let productsLength = 0;
    const observer = new IntersectionObserver(changes => {
      changes.forEach(c => {
        if (c.intersectionRatio > 0) {
          dispatch({ type: pageActions.INCREMENT_PAGE })
          productsLength += 12
          if (productsLength >= 500) observer.unobserve(node);
          console.log(productsLength)
        }
      });
    });
    observer.observe(node);
  }
  useEffect(() => {
    if (scrollRef.current) scrollObserver(scrollRef.current);
  }, []);
}

