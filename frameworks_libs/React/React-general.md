# Thinking in React way

## General notes

- Hooks are essential tools when working with React components.
  - If not used correctly they might lead to performance issues such as infinite render cycle loop. So be aware what hook does what.
- React components should be as simple as possible, and should not contain any logic that is not related to rendering.
- Inner components can be a simple wrappers, and simply render a content that is passed to it without handling much logic.
- You should think what might change what , and what should be re-rendered when something changes. You can move some logic to a separate component to prevent unnecessary re-renders or performance issues. Or maybe even think of best possible Component Composition.
- Child component re-executions don't trigger re-render of parent component. Only vice versa.

## Render cycle

Component functions are re-executed with every render cycle. It might lead to performance issues if not used correctly.

- useEffect, useCallback, useMemo hooks are used to prevent unnecessary re-execution of functions.
- Components should be as simple as possible, and should not contain any logic that is not related to rendering.

## State Management

State can be managed in a different ways, depending on the complexity of the application.

- `useState` is the simplest way to manage state in a component.
- `useReducer` is used for more complex state management and it works using Actions/Reducer similar to Redux/NgRx.
- `useRef` is used to store mutable values that don't trigger re-rendering of the component.
- `useContext` is used to share data between components without passing props through every level of the tree (props drilling). When the context changes, all components that consume that context will re-render.

## React to state changes

`useEffect` is used to perform side effects in a component. It is called after every render cycle, and it can be used to fetch data, update the DOM, or perform any other side effect.

- It can be used to perform side effects only once, by providing an empty array [] as a second argument. Alternatively use `useLayoutEffect` hook.
- If you pass a function as a dependency, it will be recreated every render cycle, and it will trigger useEffect again. To prevent this, wrap it in `useCallback` hook.

## Style React components

There are several ways to style React components:

- Inline styles: `style={{ color: 'red' }}`
- CSS classes: `className="my-class"`
- Styled-components: `styled.div` or `styled(MyComponent)`
- CSS modules: `import styles from './styles.module.css'`
- Tailwind CSS: `className="bg-blue-500"`

## React add can be optimized by:

- Splitting components into smaller components to prevent unnecessary re-renders.
- Using `memo` and `useMemo` hooks to prevent unnecessary re-renders.
- Using `useCallback` to prevent re-creation of functions every render cycle.
- Using `useEffect` only when necessary, and moving side effects to a separate component if needed.
- Using `key` prop to identify elements in a list and optimize rendering.
- Using `React.StrictMode` to highlight potential problems in an application.
- Using `useContext` to share data between components without passing props through every level of the tree.
- Using `useReducer` for more complex state management.
- Using `useRef` to store mutable values that don't trigger re-rendering of the component.
- Using `Million.js` package to make complex React components more performant by replacing React Virtual DOM mechanism with a more efficient one.
