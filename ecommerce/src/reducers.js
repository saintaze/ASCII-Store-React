export const productsActions = {
  FETCHED_ALL: 'FETCHED_ALL',
  LOADING: 'LOADING',
  MERGE_PRODUCTS: 'MERGE_PRODUCTS'
}

export const pageActions = {
  INCREMENT_PAGE: 'INCREMENT_PAGE'
}

export const productsReducer = (state, action) => {
  switch (action.type) {
    case productsActions.LOADING:
      return { ...state, loading: action.loading };
    case productsActions.MERGE_PRODUCTS:
      return { ...state, products: [...state.products, ...action.products] };
    case productsActions.FETCHED_ALL:
      return { ...state, fetchedAll: action.fetchedAll }
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