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
// Imperative way of calling methods on the component

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

```jsx
// Declarative way of calling methods on the component

import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  function openDialog() {
    setIsOpen(true);
  }

  // declarative way is to pass a prop to the component to let it be handled there, no need to bind to its ref and call methods directly
  return <ResultModal isOpen={isOpen} />;
}
```

### Receive Ref

#### Receive Ref in React >= 19

Imperative way of calling methods on the component

```jsx
import { useImperativeHandle, useRef } from "react";

function ResultModal({ ref, ...props}) {
  const dialog = useRef();

  // exposes component's API in an IMPERATIVE WAY, the declarative way would be to use props (remove ref, useImperativeHandle and simply pass a prop to the component and handle it here)
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

Declarative way of calling methods on the component

```jsx
import { useRef, useEffect } from "react";

// here we don't get ref as a prop, but isOpen, and we handle the logic inside the component, but not giving the parent component the ability to call methods directly on the component.
// if open state is changed from this component, simply pass onClose prop to the component and handle it outside.
function ResultModal({ isOpen, children }) {
  const dialog = useRef();

  // WRONG - dialog Ref is not yet available at the first render cycle. Solution is to use `useEffect` hook
  // if (isOpen) {
  //   dialog.current.showModal();
  // } else {
  //   dialog.current.close();
  // }

  // CORRECT dialog Ref is available inside effect since it executes after the first render cycle
  useEffect(() => {
    if (isOpen) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [isOpen]);

  return <dialog ref={dialog}>{children}</dialog>;
});

export default ResultModal;
```

#### Receive Ref in React <= 18

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
