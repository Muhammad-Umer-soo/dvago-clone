export const cartReducer = (state, action) => {
  switch (action.type) {
    case "addProduct": {
      const existingProduct = state.find((item) => item.id === action.data.id);

      if (existingProduct) {
        return state.map((item) =>
          item.id === action.data.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...state,
        {
          ...action.data,
          quantity: 1,
        },
      ];
    }

    case "increaseQty":
      return state.map((item) =>
        item.id === action.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

    case "decreaseQty":
      return state.map((item) =>
        item.id === action.id
          ? {
              ...item,
              quantity: Math.max(item.quantity - 1, 1),
            }
          : item
      );

    case "deleteProduct":
      return state.filter((item) => item.id !== action.data.id);

    case "deleteAllProduct":
      return [];

    case "setCart":
      return action.data;

    default:
      return state;
  }
};
