export const SortBy = {
  NewArrivals: 'New Arrivals',
  PriceLowToHigh: 'Price (Low to High)',
  PriceHighToLow: 'Price (High to Low)',
  Quantity: 'Quantity'
}

export const defaultFilterState = {
  productName: '',
  priceRangeFrom: 0,
  priceRangeTo: 20000,
  ram: [],
  storage: [],
  sort: SortBy.NewArrivals
}

export const initialState = {
  user: null,
  userType: null,
  products: [],
  banners : [{
    bannerUrl : 'https://digitech101.in/wp-content/uploads/2021/06/M32_PC_LP_Top_Banner_2.jpg',
    productId : 1
  },
  {
    bannerUrl : 'https://1.bp.blogspot.com/-bkcUjzib7Fc/YED90uGP2dI/AAAAAAAAdJ0/lEvKObR6s4suD4vvyGU3NZAmdh1x6MobwCLcBGAsYHQ/s800/redmi-note-10-series%2B%25281%2529.png',
    productId : 2
  },
  {
    bannerUrl : 'https://forums-images.oneplus.net/attachments/1562/1562975-87fd856c1b0eabe2805d8d0ad4ed9e31.png',
    productId : 3
  }
  ],
  filter: { ...defaultFilterState },
  filterToggle: false,
  snackbar: {
    open: false,
    message: '',
    type: 'error'
  }
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_FILTERS: 'SET_FILTERS',
  SET_FILTER_TOGGLE: 'SET_FILTER_TOGGLE',
  SET_SNACKBAR: 'SET_SNACKBAR',
  SET_PRODUCTS: 'SET_PRODUCTS'
};

export function openSnackbar(message, type = 'error') {
  return {
    type: actionTypes.SET_SNACKBAR,
    snackbar: {
      open: true,
      type,
      message
    }
  }
}

const reducer = (state, action) => {
  switch(action.type) {
      case actionTypes.SET_USER:
          return {
              ...state, 
              user: action.user,
              userType: action.userType,
          };
      case actionTypes.SET_FILTERS:
          return {
              ...state,
              filter: action.filter
          };
      case actionTypes.SET_FILTER_TOGGLE:
          return {
              ...state,
              filterToggle: action.filterToggle
          };
      case actionTypes.SET_SNACKBAR:
          return {
            ...state,
            snackbar: action.snackbar
          }
      case actionTypes.SET_PRODUCTS:
          return {
            ...state,
            products: action.products
          }
      default: 
          return state;
  }
}

export default reducer;