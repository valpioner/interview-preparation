.


{ // other

  // Any alternatives to Redux?
    /*mobX
    apollo client + graphQL
    RxJS*/


  /* Refs (use for imperative situations)
    Can refer on class-based components and DOM elements, in funcional components use forwardRef

    this.myRef = React.createRef();
    const node = this.myRef.current;
    return <div ref={this.myRef} />;

    const textInput = useRef(null);
    <input type="text" ref={textInput} />

    Use cases:
    - manage focus, text selecion, media playback
    - trigerring animations
    - integrating with 3rd party DOM elements
  */



  // redux-saga vs redux-thunk
    /*both middlewares,
    - thunk creates action createFactory,
    - saga insread post an action (generator * func), can cancel action*/


  // what is action creator


  // How to optimize React app?
    /*- what exactly to optimize?
    - find speed bottleneck, check with Profiler
    - check re-render of components, maybe extra unneccessary setState, React.memo, React.PureComponent
    - use React.lazy to lazy load some routes
    - refactor class to functional components
    - use 'key' in lists
    - remove HOC's from render()
    - remove side effects from render phase
    - skip effects on update */


  // React.memo, React.PureComponent


  // Virtual DOM
    /* real DOM update is a slow operation. React provides concept of a Virtual DOM,
    it is a lightweight representation of the Real DOM in the memory (in balansed tree structure).
    WHen the state of an object changes, Virtual DOM changes only that obj in real DOM instead of updating all the objects */


  // Why use () => instead of .bind in a constructor


  // JSX is a syntax extension to JavaScript. It allows to write HTML-like code in js File.
}

{ /* Virtual DOM
    Virtual DOM is an internal representation of the rendered UI, it includes the React elements you return from your
    components. This representation lets React avoid creating DOM nodes and accessing existing ones beyond necessity,
    as that can be slower than operations on JavaScript objects.

    When a component’s props or state change, React decides whether an actual DOM update is necessary by comparing the
    newly returned element with the previously rendered one. When they are not equal, React will update the DOM.

    use shouldComponentUpdate to avoid component re-rendering, or inherit from React.PureComponent.
  */
}

{ /* HOC (Hight Order Component)

    HOC is a function that takes a component and returns a new component. A HOC is a pure function with zero side-effects.
    HOCs add features to a component. It act as a container for other components, it helps in keeping components simple
    and reusable, they are used when a common logic has to be used by multiple components.

    ! Don’t Use HOCs Inside the render Method
    ! Static Methods Must Be Copied Over
    ! Refs Aren’t Passed Through
  */

  const NavbarWithRouter = withRouter(Navbar);
  const CommentWithRelay = Relay.createContainer(Comment, config);
  const ConnectedComment = connect(commentSelector, commentActions)(CommentList);

  function withSubscription(WrappedComponent, selectData) {
    // ...and returns another component...
    return class extends React.Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          data: selectData(DataSource, props)
        };
      }

      componentDidMount() {
        // ... that takes care of the subscription...
        DataSource.addChangeListener(this.handleChange);
      }

      componentWillUnmount() {
        DataSource.removeChangeListener(this.handleChange);
      }

      handleChange() {
        this.setState({
          data: selectData(DataSource, this.props)
        });
      }

      render() {
        // ... and renders the wrapped component with the fresh data!
        // Notice that we pass through any additional props
        return <WrappedComponent data={this.state.data} {...this.props} />;
      }
    };
  }

}

{ // State

  // set initial state (in constructor)
  this.state = {products: []}

  // don't modify state directly, instead use:
  // this.setState (in class-based components), it merges changes into current state
  this.setState({comment: 'Hello'});
  this.setState((state, props) => ({ counter: state.counter + props.increment }));

  // useState (in functional component), it replaces completely new state
}

{ // Lifecycle methods

  // mounting phase: (no side effects)
    constructor                 // this.state = {}
    // componentWillMount - deprecated
    // componentWillReceiveProps - deprecated, new: static getDerivedStateFromProps()
    // componentWillUpdate - deprecated, new getSnapshotBeforeUpdate()
    static getDerivedStateFromProps() // no access to 'this', return obj to update state based on props, use for a transition animation.
    render()
    componentDidMount()

  // updating phase:
    static getDerivedStateFromProps()
    shouldComponentUpdate()
    render()
    getSnapshotBeforeUpdate()
    componentDidUpdate()

  // unmounting phase:
    componentWillUnmount()      // clear memory
}

{ // Hooks (16.8+)
  // Hooks are functions that let you “hook into” React state and lifecycle features from function components.

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

{ // Code splitting, Lazy loading, Suspense
  const LazyComp = React.lazy(() => import('./lazyComp'));
  <Suspense fallback={<div>Loading...</div>}><LazyComp /></Suspense>

  // use dynamic import
  import("./math").then(math => { console.log(math.add(16, 26)); });
}

{ // Error Boundaries
  static getDerivedStateFromError() // use to update error state -> so it will render fallback ui after an error
  componentDidCatch() // use to log errors

  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      logErrorToMyService(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children; 
    }
  }

  <ErrorBoundary>
    <MyWidget />
  </ErrorBoundary>
}