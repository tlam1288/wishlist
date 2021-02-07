import { ADD_ITEM, DELETE_ITEM, DELETE_ALL } from "./actions";

const INITIAL_STATE = {
  wishList: [],
};

function deleteItem(array, action) {
  return array.filter((item, index) => index !== action.payload);
}

// Complete the three cases below
const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        wishList: [
          ...state.wishList,
          {
            value: action.payload,
          },
        ],
      };
    case DELETE_ITEM:
      console.log(action);
      return {
        ...state,
        wishList: deleteItem(state.wishList, action),
      };
    case DELETE_ALL:
      return {
        wishList: [],
      };
    default:
      return state;
  }
};

export default reducer;
