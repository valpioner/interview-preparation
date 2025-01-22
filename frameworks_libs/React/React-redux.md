# Redux library for state management

Redux is a state management system for cross-component or app-wide state. Redux solves the same problem as a Context - manage cross-component state.

## Redux vs Context

- Redux is a library that can be used with non React apps, while Context is a React API.
- Redux is more powerful and flexible than Context for a complex app-wide state especially for large enterprise level applications that manage a lot of data in a state.

```jsx
// Using context may end up with a deeply nested providers (boilerplate code)
// Alternatively one context may be used to manage all data, but it may handle just too much (god class)

return (
  <AuthContextProvider>
    <ThemeContextProvider>
      <UIInteractionContextProvider>
        <MultiStepContextProvider>
          <Component />
        </MultiStepContextProvider>
      </UIInteractionContextProvider>
    </ThemeContextProvider>
  </AuthContextProvider>
);
```

- Redux is more performant. Use context for low frequency unlikely updates (like locale, theme, auth etc) and Redux for high frequency updates (like user data, etc).

## Core Redux Concepts

Flow:

1. Component subscribes to the STORE changes
2. Component DISPATCHes an ACTION
3. REDUCER gets the ACTION and updates the STORE
4. STORE notifies subscribed component
5. Component gets notified and re-renders based on new STORE data

Notes:

- Only one central STORE (State)
- Component never directly manipulate store.
- REDUCER functions are used to update the store. Those are PURE functions that take the current state and an action and return a NEW state. Reducers should not mutate state object, but return new object. Initial Reducer execution should return the initial state.
- ACTIONS are objects the describe the operation the reducer should perform. Payload may be attached to actions
- Since reducers are pure functions, they should not have side effects and no async stuff (like API calls, etc). Side effects can be managed in `useEffect` or `custom action creators (Thunk)`. Side effects should be handled by middleware (like redux-thunk, redux-saga, etc). Thunk is a function that delays an action dispatch.

## Redux Toolkit

Redux Toolkit is a library that simplifies Redux code and makes it more readable and maintainable.

Redux Toolkit:

- createSlice() - a function that generates a slice reducer with action creators. You CAN mutate state in createSlice, under the hood it will detect changes and still create immutable state, but here we mutate only an abstraction.

## Redux Dev Tools

Redux DevTools is a powerful tool (browser extension) that allows you to inspect every action and state change in your Redux store. It is included with a Redux Toolkit.

## Redux Basic Example

```jsx
const redux = require("redux");

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return { counter: state.counter + 1 };
  }
  if (action.type === "decrement") {
    return { counter: state.counter - 1 };
  }
  return state;
};

const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

store.subscribe(counterSubscriber);
store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });
```

## Redux React Example

### 1. Create a store with reducers

Using a `@reduxjs/toolkit`

```jsx
// src/store/index.js

import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import authReducer from "./auth";

const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
});

export default store;
```

```jsx
// src/store/auth.js

import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
```

```jsx
// src/store/counter.js

import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
```

Using a `redux` library

```jsx
import { createStore } from "redux";

const initialState = { counter: 0, showCounter: true };

const counterReducer = (state = initialState, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "increase") {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "decrement") {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === "toggle") {
    return {
      showCounter: !state.showCounter,
      counter: state.counter,
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;
```

### 2. Provide a store

```jsx
// index.js

import { Provider } from "react-redux";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

### 3. Connect component to a store and dispatch actions

```jsx
// Functional component

import { useSelector } from "react-redux";
import { authActions } from "./store/auth";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const clickHandler = (payload) => {
    // using `@reduxjs/toolkit` action creator
    dispatch(authActions.login(payload));

    // regular action dispatch
    dispatch({ type: "increase", amount: 10 });
  };

  return (
    <Fragment>
      {!isAuth && <Auth />}
      {isAuth && <UserProfile />}
      <button onClick={() => clickHandler("payload")}>Login</button>
    </Fragment>
  );
}

export default App;
```

```jsx
// Class-based component

class Counter extends Component {
  render() {
    return (
      <main>
        <div>{this.props.counter}</div>
        <button onClick={() => this.props.increment()}>Increment</button>
        <button onClick={() => this.props.decrement()}>Decrement</button>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: "increment" }),
    decrement: () => dispatch({ type: "decrement" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

### 4. Manage Side Effects

Where to manage side effects (async tasks etc.):

- inside component's `useEffect`, or
- inside custom thunk action creator

#### Managing side effects in component's `useEffect`

```jsx
import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  // here we handle side effects in a component using `useEffect`
  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
      const response = await fetch(
        "https://react-http-6b4a6.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    };

    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
```

#### Managing side effects in a `custom thunk action creator function`

```jsx
// src/store/cart-actions.js

import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-6b4a6.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-6b4a6.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
```
