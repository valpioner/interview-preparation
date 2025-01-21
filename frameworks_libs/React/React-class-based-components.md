# Class-based components

Class-based components are the old way of defining components in React. They are still supported in React 16 and later versions, but the recommended way is to use functional components with hooks, because those are liner and more flexible.

Class-based components can't use hooks, so they have to use lifecycle methods to manage state and side effects.

## `Props` and `State` in Class Component basics

```jsx
class Product extends Component {
  // define state
  constructor(props) {
    // required
    super(props);
    // should be an object
    this.state = { name: '', price: 0 };
  }

  changePrice() {
    // change state, react will merge (not overwrite, like when using useState) it with the old state
    this.setState({ price: 100 });
    this.setState((cureState) => {
      return { price: cureState.price + 100 };
    });
  }

  // specific method that React calls when the component is created
  render() {
    return (
      <h1>{this.props.name}</h1>
      <h1>{this.state.price}</h1>

      <button onClick={this.changePrice.bind(this)}>
        Change Price
      </button>
    );
  }
}
```

## `useEffect` in Class Component (lifecycle methods)

### Mounting

1. `constructor()`: Called when the component is initialized.
2. `static getDerivedStateFromProps()` (rarely used): Used to update the state based on props.
3. `render()`: Renders the component.
4. `componentDidMount()`: Called after the component is re-evaluated & rendered.

### Updating

1. `static getDerivedStateFromProps()` (rarely used): Used to update the state based on props.
2. `shouldComponentUpdate(nextProps, nextState)`: Called before the component re-renders. Returns `true` or `false`.
3. `render()`: Renders the component.
4. `getSnapshotBeforeUpdate()` (rarely used): Called before the component is re-rendered.
5. `componentDidUpdate(prevProps, prevState)`: Called after the component is re-rendered.

### Unmounting

- `componentWillUnmount()`: Called before the component is removed from the DOM.

### Error Handling

- `static getDerivedStateFromError()`: Called when there is an error during rendering.
- `componentDidCatch(error, info)`: Called after an error has been thrown by a descendant component.

### Comparing lifecycle methods with hooks in functional components

// Called once a component is re-evaluated & rendered.
`componentDidMount()` -> `useEffect(..., [])`

// Called once a component updated, re-evaluated & re-rendered.
`componentDidUpdate()` -> `useEffect(..., [deps])`

// Called right before a component is unmounted and removed from the DOM. (Cleanup)
`componentWillUnmount()` -> `useEffect(() => () => {}, [])`

### Lifecycle methods example

```jsx
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', price: 0 };
  }

  changePrice() {
    // change state, react will merge (not overwrite, like when using useState) it with the old state
    this.setState({ price: 100 });
    this.setState((cureState) => {
      return { price: cureState.price + 100 };
    });
  }

  // aka `useEffect(..., [])`
  componentDidMount() {
    // fetch data from API
    fetch('https://api.example.com/products')
      .then((response) => response.json())
      .then((data) => {
        this.setState({ name: data.name });
      });
  }

  // aka `useEffect(..., [deps])`
  componentDidUpdate(prevProps, prevState) {
    // `if` block to prevent infinite loop
    if (this.state.price !== prevState.price) {
      this.setState({ price: this.state.price });
    }
  }

  // aka `useEffect(() => () => {}, [])`
  componentWillUnmount() {
    // cleanup
  }

  // specific method that React calls when the component is created
  render() {
    return (
      <h1>{this.props.name}</h1>
      <h1>{this.state.price}</h1>

      <button onClick={this.changePrice.bind(this)}>
        Change Price
      </button>
    );
  }
}
```

## `Context` in Class Component

You still provide it the same way as in a functional component, but you access it differently.

Context in class components is used by defining a static property `contextType` in the class component (meaning only 1 context can be accessed, if need multiple contexts, other options should be used like wrapping in extra component). It must be a reference to the `React.createContext()` object.

```jsx
class Product extends Component {
  static contextType = MyContext;

  render() {
    return <h1>{this.context}</h1>;
  }
}
```

## Error Boundaries

Error boundaries are a way to catch JavaScript errors anywhere in a component tree and log those errors, show a fallback UI, or recover from the error. They are a class component that implements either one or both of the lifecycle methods `static getDerivedStateFromError()` or `componentDidCatch()`.

1. Create an error boundary component.

```jsx
// ErrorBoundary.js

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // this makes a component an error boundary, no equivalent in functional components
  componentDidCatch(error, info) {
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    // it is required to return children here
    return this.props.children;
  }
}
```

2. Wrap the component that should be an error boundary.

```jsx
// App.js

class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Product />
      </ErrorBoundary>
    );
  }
}
```

3. Use it like this:

```jsx
// Product.js

class Product extends Component {
  render() {
    if (this.props.name === "error") {
      throw new Error("Product name is error");
    }

    return <h1>{this.props.name}</h1>;
    return <h1>{this.props.name}</h1>;
  }
}
```
