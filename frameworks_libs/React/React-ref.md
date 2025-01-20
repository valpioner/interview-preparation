# React Ref

## Using Ref to keep UI element Reference

```tsx
import { useRef, useState } from "react";

const name = useRef();
const [playerName, setPlayerName] = useState(null);

function handleClick() {
  // WRONG - component function won't re-execute
  name.current.value = "";

  // CORRECT - component will be re-evaluated, so this should be used for UI bindings
  setPlayerName(name.current.value);
}

return (
  <>
    {/* WRONG - value will be undefined in 1st render cycle when using ref's value directly */}
    <h2>Welcome {name.current?.value ?? "unknown"}</h2>

    {/* CORRECT - will be updated accordingly when bound to State */}
    <h2>Welcome {playerName ?? "unknown"}</h2>

    <input ref={name} />

    <button onClick={handleClick}>Set Name</button>
  </>
);
```

## Using Ref to keep value reference that should persist on component re-evaluation

```tsx
let timerAsOuterVariable; // WRONG

export default function Component() {
  let timerAsComponentVariable; // WRONG
  const timerRef = useRef(); // CORRECT

  function startTimer() {
    timerAsComponentVariable = setTimeout(() => {}, 1000); // WRONG
    timerAsOuterVariable = setTimeout(() => {}, 1000); // WRONG
    timerRef.current = setTimeout(() => {}, 1000); // CORRECT
  }

  function stopTimer() {
    // CORRECT - this ref will persist even when the component function will be re-evaluated
    clearTimeout(timerRef.current);

    // WRONG - value will be lost during the next component function re-evaluation
    clearTimeout(timerAsComponentVariable);

    // WRONG - value will be shared between all component instances
    clearTimeout(timerAsOuterVariable);
  }
}
```

## Forward Refs into Components

### Forward Ref

```jsx
function App() {
  const dialogRef = useRef();

  function openDialog() {
    // calling method of <dialog> el
    // POTENTIAL PROBLEM - ref can not be attached, or be attached to a different element! So we can't be sure that ref's method will be available.
    dialogRef.current.showModal();

    // to mitigate that POTENTIAL PROBLEM, use `useImperativeHandle` hook in inner component, and call appropriate method.
    dialogRef.current.open();
  }

  return <ResultModal ref={dialogRef} />;
}
```

### Receive Ref

#### Receive Ref in React >= 16.3

```jsx
import { useImperativeHandle, forwardRef, useRef } from "react";

const ResultModal = forwardRef((props, ref) => {
  const dialog = useRef();

  // exposes component's API
  useImperativeHandle(ref, () => ({
    open() {
      // should be updated accordingly to changes
      dialog.current.showModal();
    },
  }));

  // if we change `dialog` to let's say `div`, imperativeHandle API should be updated to make it work as expected.
  return <dialog ref={dialog}>...</dialog>;
});

export default ResultModal;
```

#### Receive Ref in React <= 16.2

```jsx
import { forwardRef } from "react";

const ResultModal = forwardRef((props, ref) => {
  // component implementation
});

export default ResultModal;
```

## Ref vs State

- **Refs:**

  - `ref.current.value = '...'` won't re-evaluate component function
  - Use to get direct DOM element access
  - Use to keep values that should not be lost during the component function re-evaluation
  - Use for reading values or accessing browser APIs
  - Don't use for UI value bindings, use State instead

- **State:**
  - `setState(...)` will re-evaluate component function
  - Use for UI bindings
  - Don't use for values that have no effect on UI, use Ref instead
