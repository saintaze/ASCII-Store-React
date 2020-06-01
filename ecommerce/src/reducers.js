export const productsActions = {
  FETCHED_ALL: 'FETCHED_ALL',
  LOADING: 'LOADING',
  MERGE_PRODUCTS: 'MERGE_PRODUCTS',
  SORT_PRODUCTS: 'SORT_PRODUCTS',
  RESET_PRODUCTS: 'RESET_PRODUCTS'
}

export const pageActions = {
  INCREMENT_PAGE: 'INCREMENT_PAGE'
}

export const productsInitialState = { 
  products: [], 
  loading: false, 
  fetchedAll: false, 
  sort: 'id' 
};

export const paginateInitialState = { 
  page: 1 
};

export const productsReducer = (state, action) => {
  switch (action.type) {
    case productsActions.LOADING:
      return { ...state, loading: action.loading };
    case productsActions.MERGE_PRODUCTS:
      return { ...state, products: [...state.products, ...action.products] };
    case productsActions.FETCHED_ALL:
      return { ...state, fetchedAll: action.fetchedAll }
    case productsActions.SORT_PRODUCTS:
      return { ...state, sort: action.sort };
    case productsActions.RESET_PRODUCTS:
      return { ...state, products: [] };
    default:
      return state
  }
}

export const paginateReducer = (state, action) => {
  switch (action.type) {
    case pageActions.INCREMENT_PAGE:
      return { ...state, page: state.page + 1 }
    default:
      return state
  }
}




// sort means reset page, reset, feathedall, reset prodcuts