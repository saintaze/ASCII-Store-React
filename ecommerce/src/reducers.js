import { PRODUCT_LIMIT } from './constants';

export const productsActions = {
  FETCHED_ALL: 'FETCHED_ALL',
  LOADING: 'LOADING',
  MERGE_PRODUCTS: 'MERGE_PRODUCTS',
  RESET_PRODUCTS: 'RESET_PRODUCTS'
}

export const paramsActions = {
  INCREMENT_PAGE: 'INCREMENT_PAGE',
  RESET_PAGE: 'RESET_PAGE',
  SORT_PAGE: 'SORT_PAGE'
}

export const productsInitialState = { 
  products: [], 
  loading: false, 
  fetchedAll: false
};

export const paramsInitialState = { 
  _page: 1,
  _limit: PRODUCT_LIMIT,
  _sort: 'price'
};

export const productsReducer = (state, action) => {
  switch (action.type) {
    case productsActions.LOADING:
      return { ...state, loading: action.loading };
    case productsActions.MERGE_PRODUCTS:
      return { ...state, products: [...state.products, ...action.products] };
    case productsActions.FETCHED_ALL:
      return { ...state, fetchedAll: action.fetchedAll }
    case productsActions.RESET_PRODUCTS:
      return { ...state, products: [] };
    default:
      return state
  }
}

export const paramsReducer = (state, action) => {
  switch (action.type) {
    case paramsActions.INCREMENT_PAGE:
      return { ...state, _page: state._page + 1 };
    case paramsActions.RESET_PAGE:
      return { ...state, _page: 1 };
    case paramsActions.SORT_PAGE:
      return { ...state, _sort: action.sort };
    default:
      return state
  }
}

