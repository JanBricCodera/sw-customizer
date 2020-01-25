import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 4, //base price,
  error: false,
  currentlyBuilding: false
};

const INGREDIENT_PRICES = {
  salad: 0.2,
  cheese: 0.3,
  bacon: 1,
  meat: 0.75
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        currentlyBuilding: true
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        currentlyBuilding: true
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat
        },
        error: false,
        totalPrice: 4,
        currentlyBuilding: false
      };
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
