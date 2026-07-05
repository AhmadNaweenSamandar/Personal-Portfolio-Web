import { createContext, useContext, useReducer, useCallback } from "react";

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.id === action.payload.id && item.selectedSize === action.payload.selectedSize
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === existing.id && item.selectedSize === existing.selectedSize
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(item.id === action.payload.id && item.selectedSize === action.payload.selectedSize)
        ),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id && item.selectedSize === action.payload.selectedSize
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter((item) => item.quantity > 0),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "SET_CHECKOUT_DATA":
      return { ...state, checkoutData: { ...state.checkoutData, ...action.payload } };
    case "COMPLETE_ORDER":
      return {
        ...state,
        items: [],
        orderConfirmation: action.payload,
        checkoutData: {},
      };
    default:
      return state;
  }
}

const initialState = {
  items: [],
  checkoutData: {},
  orderConfirmation: null,
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = useCallback((product, selectedSize) => {
    dispatch({ type: "ADD_ITEM", payload: { ...product, selectedSize } });
  }, []);

  const removeItem = useCallback((id, selectedSize) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, selectedSize } });
  }, []);

  const updateQuantity = useCallback((id, selectedSize, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, selectedSize, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const setCheckoutData = useCallback((data) => {
    dispatch({ type: "SET_CHECKOUT_DATA", payload: data });
  }, []);

  const completeOrder = useCallback((orderDetails) => {
    dispatch({ type: "COMPLETE_ORDER", payload: orderDetails });
  }, []);

  const cartTotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const cartCount = state.items.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        setCheckoutData,
        completeOrder,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
