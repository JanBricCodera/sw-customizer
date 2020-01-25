import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };
    case actionTypes.PURCHASE_SANDWICH_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_SANDWICH_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      };
    case actionTypes.PURCHASE_SANDWICH_FAIL:
      return { ...state, loading: false };
    case actionTypes.RETRIEVE_ORDERLIST_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.RETRIEVE_ORDERLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders
      };
    case actionTypes.RETRIEVE_ORDERLIST_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
