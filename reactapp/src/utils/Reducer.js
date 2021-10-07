export const SortBy = {
  NewArrivals: 'New Arrivals',
  PriceLowToHigh: 'Price (Low to High)',
  PriceHighToLow: 'Price (High to Low)'
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
  products: [
    {
      productId: 1,
      imageUrl: 'https://m.media-amazon.com/images/I/71os5DRhuSL._SY741_.jpg',
      productName: 'Samsung Galaxy M32 5G',
      price: 12999,
      description: '128 GB Storage\n6 GB RAM\n720p Display\nMediaTek 720 Octa Core 2Ghz Processor\n5000mAh Battery\nAndroid 11\nVersatile Quad camera setup-48MP (F 1.8) main camera + 8MP (F2.2) Ultra wide camera+ 5MP (F2.4) depth camera + 2MP (2.4) Macro Camera| 13MP (F2.2) front camera',
      quantity: 10 
    },
    {
      productId: 2,
      imageUrl: 'https://m.media-amazon.com/images/I/81aQWPoGdOL._SY741_.jpg',
      productName: 'Redmi Note 10 Pro',
      price: 17499,
      description: '128 GB Storage\n6 GB RAM\n1080p Display\nQualcomm Snapdragon 732G with Kryo 470 Octa-core 2.3Ghz\n5020mAh Battery\n64 MP Quad Rear camera with 8MP Ultra-wide, 5MP Telemacro and Portrait lens| 16 MP Front camera',
      quantity: 18
    },
    {
      productId: 3,
      imageUrl: 'https://m.media-amazon.com/images/I/61IwksZ-DGL._SX679_.jpg',
      productName: 'OnePlus 9R 5G',
      price: 36999,
      description: '128GB Storage\n8 GB RAM\nFluid AMOLED display with 120 Hz of Refresh rate\nQualcomm Snapdragon 870 5G with upgraded Qualcomm Kryo 585 CPU at 3.2Ghz\n4500mAh Battery\nOxygen OS Android 11\nLoaded with Quad rear camera module that features a 48 MP Main camera, 16 MP Ultra Wide angle Camera, 5 MP Macro camera and a 2 MP Monochrome camera. The device also comes with a 16 MP front Camera',
      quantity: 6
    }
  ],
  filter: { ...defaultFilterState },
  filterToggle: false
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_FILTERS: 'SET_FILTERS',
  SET_FILTER_TOGGLE: 'SET_FILTER_TOGGLE'
};


const reducer = (state, action) => {
  console.log(action);

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
      default: 
          return state;
  }
}

export default reducer;