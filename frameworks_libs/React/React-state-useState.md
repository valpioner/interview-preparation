# `useState` hook

```tsx
// when changed - component func is re-executed !!!!!
// calling `setCount()` will schedule an update, so it won't be instant
const [count, setCount] = useState<number>(0);
const [arr, setArr] = useState<number[]>([]);

// WRONG - don't use this approach when new state depends on old state
setCount(!count);

// CORRECT - pass function instead, it will always get correct state value
setCount((count) => !count); // best practice

// WRONG
setArr((arr) => {
  arr[0] = "new value";
  return arr;
});

// CORRECT
setArr((arr) => {
  // clone 1d array
  const newArray = [...arr];
  // clone 2d array
  const newArray2D = [...arr.map((innerArray) => [...innerArray])];
  // PS: use deep cloning for complex objects

  newArray[0] = "new value";
  return newArray;
});
```

## Two-way binding

```tsx
import { useState } from "react";

function Component() {
  const [name, setName] = useState("Initial Name");
  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}
```

## Lifting state up

In case when one of children affects a sibling - state should be managed by the common parent.

```tsx
import { useState } from "react";

// common parent
function Accordion({ title, children, isActive }) {
  // manage shared state in parent
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Panel isActive={activeIndex === 0} onShow={() => setActiveIndex(0)}>
        ...
      </Panel>
      <Panel isActive={activeIndex === 1} onShow={() => setActiveIndex(1)}>
        ...
      </Panel>
    </>
  );
}

// siblings
function Panel({ children, isActive, onShow }) {
  return (
    <>{isActive ? <p>{children}</p> : <button onClick={onShow}>Show</button>}</>
  );
}
```

## Ref vs State:

- Refs:

  - `ref.current.value = '...'` won't re-evaluate the component function
  - Use to get direct DOM element access
  - Use to keep values that should not be lost during the component function re-evaluation
  - Use for reading values or accessing browser APIs
  - Don't use for UI value bindings, use State instead

- State:
  - `setState(...)` will re-evaluate the component function
  - Use for UI bindings
  - Don't use for values that have no effect on UI, use Ref instead

## Sharing state between components

For sharing a data between components, there are several approaches:

- prop drilling (bad practice). Passing shared data (props) through multiple component layers
- component composition (partial solution). It is when a parent component passes data to a child component via content, and a child component acts as a wrapper around it.
- context API (best practice). It is when a parent component provides data to all its children, no matter how deep they are in the component tree.
