# React store with a custom hook

You can create a custom hook that will manage the state of the application.

[Implementation example](https://github.com/academind/react-complete-guide-course-resources/tree/main/code/27%20Replacing%20Redux%20with%20Hooks/06-bonus-multiple-slices)

- hooks-store/
  - store.js
  - products-store.js
  - counter-store.js

## 1. Create a custom store hook

```jsx
// src/hooks-store/store.js

import { useState, useEffect } from "react";

// outside of a custom store hook to make it shared between all stores for keeping one central state
let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }

    return () => {
      if (shouldListen) {
        listeners = listeners.filter((li) => li !== setState);
      }
    };
  }, [setState, shouldListen]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};
```

## 2. Create a store slices (store slice config function)

```jsx
// src/hooks-store/products-store.js

import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    TOGGLE_FAV: (curState, productId) => {
      const prodIndex = curState.products.findIndex((p) => p.id === productId);
      const newFavStatus = !curState.products[prodIndex].isFavorite;
      const updatedProducts = [...curState.products];
      updatedProducts[prodIndex] = {
        ...curState.products[prodIndex],
        isFavorite: newFavStatus,
      };
      return { products: updatedProducts };
    },
  };

  initStore(actions, {
    products: [
      {
        id: "p1",
        title: "Red Scarf",
        description: "A pretty red scarf.",
        isFavorite: false,
      },
      {
        id: "p2",
        title: "Blue T-Shirt",
        description: "A pretty blue t-shirt.",
        isFavorite: false,
      },
      {
        id: "p3",
        title: "Green Trousers",
        description: "A pair of lightly green trousers.",
        isFavorite: false,
      },
      {
        id: "p4",
        title: "Orange Hat",
        description: "Street style! An orange hat.",
        isFavorite: false,
      },
    ],
  });
};

export default configureStore;
```

```jsx
// src/hooks-store/products-store.js

import { initStore } from "./store";

const configureStore = () => {
  const actions = {
    ADD: (state, amount) => ({ counter: state.counter + amount }),
    SUB: (state, amount) => ({ counter: state.counter - amount }),
  };

  initStore(actions, { counter: 0 });
};

export default configureStore;
```

## 3. Configure (Init) store slices

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import configureProductsStore from "./hooks-store/products-store";
import configureCounterStore from "./hooks-store/counter-store";

configureProductsStore();
configureCounterStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

## 4. Use the store in a component to `subscribe` to state changes and `dispatch` actions

```jsx
import { useStore } from "../../hooks-store/store";

const ProductItem = React.memo((props) => {
  // use `useStore(false)` to prevent subscription and consequence re-rendering
  const dispatch = useStore(false)[1];

  // or use `useStore()` to subscribe to state changes and re-render the component on changes
  const [state, dispatch] = useStore();

  const toggleFavHandler = () => {
    dispatch("TOGGLE_FAV", props.id);
  };

  return <button onClick={toggleFavHandler} />;
});

export default ProductItem;
```
