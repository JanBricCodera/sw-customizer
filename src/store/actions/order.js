import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseSandwichSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_SANDWICH_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchaseSandwichFail = error => {
  return {
    type: actionTypes.PURCHASE_SANDWICH_FAIL,
    error: error
  };
};
export const purchaseSandwichStart = () => {
  return {
    type: actionTypes.PURCHASE_SANDWICH_START
  };
};

export const purchaseSandwich = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseSandwichStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then(response => {
        dispatch(purchaseSandwichSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchaseSandwichFail(error));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const retrieveOrderListSuccess = orderList => {
  return {
    type: actionTypes.RETRIEVE_ORDERLIST_SUCCESS,
    orders: orderList
  };
};

export const retrieveOrderListFail = error => {
  return {
    type: actionTypes.RETRIEVE_ORDERLIST_FAIL,
    error: error
  };
};

export const retrieveOrderListStart = () => {
  return {
    type: actionTypes.RETRIEVE_ORDERLIST_START
  };
};

export const retrieveOrderList = (token, userId) => {
  return dispatch => {
    dispatch(retrieveOrderListStart());
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(retrieveOrderListSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(retrieveOrderListFail(err));
      });
  };
};
