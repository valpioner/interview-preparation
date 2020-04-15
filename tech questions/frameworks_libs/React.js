.// how to make code splitting in React - via lazy loading to avoid 1 bundle




// Any alternatives to Redux?
/*mobX
apollo client + graphQL
RxJS*/


// What is Redux middleware?
//add middle payer


// redux-saga vs redux-thunk
/*both middlewares,
- thunk creates action createFactory,
- saga insread post an action (generator * func), can cancel action*/


// what is action creator



// HOC (Hight Order Component)
/*HOCs act as a container for other components, it helps in keeping components simple and reusable,
they are used when a common logic has to be used by multiple components*/



// How to optimize React app?
/*- what exactly to optimize?
- find speed bottleneck
- check re-render of components, maybe extra unneccessary setState, React.memo, React.PureComponent
- use React.lazy to lazy load some routes
- refactor class to functional components*/



// React.memo, React.PureComponent



// Virtual DOM
/* real DOM update is a slow operation. React provides concept of a Virtual DOM,
it is a lightweight representation of the Real DOM in the memory (in balansed tree structure).
WHen the state of an object changes, Virtual DOM changes only that obj in real DOM instead of updating all the objects */


// Why use () => instead of .bind in a constructor


// JSX
// JSX is a syntax extension to JavaScript. It allows to write HTML-like code in js File.


{ // Hooks
  // - useState
    const [cartState, setCartState] = useState({a: 1, b: [1,2,3]});
  // - useContext
    const context = useContext(AuthContext);
  // - useEffect
    useEffect(() => {}, []);
  // - useReducer
    const [cartState, dispatch] = useReducer(cartReducer, {cart: []});
    dispatch({type: ADD_PRODUCT, product: product})
}


{ // Redux (store)
  // - store
  {
    import { createStore, applyMiddleware, compose } from "redux";
    import thunk from "redux-thunk";
    import rootReducer from "./reducers";

    const middleware = [thunk];
    const store = createStore(
      rootReducer,
      initialState = {},
      compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
      ));

    export default store;
  }
  // - actions
  {
    export const productActionType = {
      GET_PRODUCT_STARTED: "GET_PRODUCT_STARTED",
      GET_PRODUCT_SUCCESS: "GET_ROLES_SUCCESS",
      GET_PRODUCT_ERROR: "GET_PRODUCT_ERROR",
    };
    export const getProductSuccess = product => ({
      type: productActionType.GET_PRODUCT_SUCCESS,
      product
    });
    export const fetchProducts = () => {
      return dispatch => {
        dispatch(getProductsStarted());
        axios
          .get(roleUrl)
          .then(roles => {
            dispatch(getProductSuccess(roles.data));
          })
          .catch(error => {
            dispatch(getProductError(error));
          });
      };
    };
  }
  // - reducers
  {
    import { cartActionsTypes } from "../actions/cartActionsTypes";

    const initialState = { products: [] };
    export default function(state = initialState, action) {
      switch (action.type) {
        case cartActionsTypes.ADD_PRODUCT:
          return {
            ...state, products: { ...updatedProducts }
          }
          default:
            return state;
      }
    }
  }
  // in component
  {
    export { connect } from 'react-redux'
    export { fetchProducts } from '../store/actions';

    // mapStateToProps
    const mapStateToProps = state => {
      return {
        products: state.products,
        cartItemCount: state.cart.reduce((count, curItem) => count +  curItem.quantity, 0)
      }
    }

    // mapDispatchToProps
    const mapDispatchToProps = dispatch => {
      return {
        addProductToCart: product => dispatch(addProductToCart(product))
      }
    }

    export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(ProductsPage);
  }
  // middlewares
  redux-thunk
  redux-saga
}


{ // Context API
  /* Context API is not good for high-frequent updates because of tree traversal heavy logic, but good for low frequent
  updates such as change locale, theme, user auth data */
  // shop-context.js
  const MyContext = React.createContext({
    products: [],
    cart: [],
    addProductsToCart: product => {},
    removeProductsFromCart: productId => {}
  });
  // in provider component
  import ShopContext from './context/shop-context';
  class App extends Component {
    state = { products: [], cart: [] }

    addProductsToCart = product => {/* do smth */}
    removeProductsFromCart = productId => {/* do smth */}

    render() {
      return (
        <ShopContext.Provider value={{
          products: this.state.products,
          cart: this.state.cart,
          addProductsToCart: this.addProductsToCart,
          removeProductsFromCart: this.removeProductsFromCart }}>
            {/* internals */}
        </ShopContext.Provider>
      );
    }
  }
  // in consumer component
    import ShopContext from './context/shop-context';
    // use case #1 - can be used in both class-based and functional approaches, can be used only in template
    <ShopContext.Consumer>
      {
        context => (
          <div>context.cart[0]</div>
        )
      }
    </ShopContext.Consumer>
    // use case #2 - in class-based component js
    static contextType = ShopContext; // this.context now awailable
    // use case #3 - in functional component js
    const shopContext = useContext(SuthContext);
}


{ // Lazy loading, Suspense
  const LazyComp = React.lazy(() => import('./lazyComp'));
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComp />
  </Suspense>
}