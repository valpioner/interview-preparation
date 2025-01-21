# `useReducer()` hook

`useReducer()` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

Example of a context file using `useReducer()`:

```jsx
// src/store/shopping-cart-context.jsx

import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
});

// should be outside of the component to avoid re-creating it on every render
function shoppingCartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return { items: [...state, items: updateItems] };
    default:
      return state;
  }
}

export default CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    { items: [] }
  );

  function handleAddItemToCart(id) {
    shoppingCartDispatch({ type: "ADD_ITEM", payload: id });
  }

  return
    <CartContext.Provider value={{
      items: shoppingCartState.items,
      addItemToCart: handleAddItemToCart,
    }}>
      {children}
    </CartContext.Provider>;

};
```
