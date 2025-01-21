# `useEffect()` hook

Side Effects are actions that are performed by a component that don't directly affect the component's render cycle. These actions can be anything from fetching data, setting up subscriptions, or manually changing the DOM.

## Use Cases

### Use Case 1 - mitigate render cycle infinite loops

Problem: If you need to update UI, and you create a function that calculates the new state, you can't call it right away from the component function, because it will cause an infinite loop.

```tsx
// Problem showcasing, here setting the state will cause infinite loop

import { useState } from "react";

function App() {
  const [places, setPlaces] = useState([]);

  // this task will be called with every render cycle
  navigator.geolocation.getCurrentPosition((position) => {
    // WRONG - this will trigger another render cycle thus causing infinite render loop
    setPlaces(...);
  });

  return (
    <Places places={places} />
  );
}
```

Solution: Use `useEffect()` to perform side effects after the component is rendered, so it won't trigger another render cycle if deps are not changed.

```tsx
// Solution showcasing, here setting the state from `useEffect()` hook will not cause infinite loop
import { useEffect, useState } from "react";

function App() {
  const [places, setPlaces] = useState([]);

  // 1st arg is an effect function that will be called AFTER every render cycle, meaning not during, but after component is rendered
  // 2nd arg is an array of dependencies (prop or state values or func/context values that depend on or use state or props), effect will be executed ONLY if deps array changes. If array is empty `[]`, effect will be executed ONLY ONCE after the first render
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      // CORRECT - this will trigger another render cycle thus causing infinite render loop
      setPlaces(...);
    });
  }, []);

  return (
    <Places places={places} />
  );
}
```

### Use Case 2 - access Ref if it is not available at the first render cycle

Problem: If you need to access a Ref in a component, but it is not available at the first render cycle, you can't access it right away.
Solutions is to use `useEffect()` hook to access it after the first render cycle.

```tsx
import { useRef } from "react";

function ResultModal({ isOpen, children }) {
  const dialog = useRef();

  // WRONG - dialog Ref is not yet available at the first render cycle. Solution is to use `useEffect` hook
  // if (isOpen) {
  //   dialog.current.showModal();
  // } else {
  //   dialog.current.close();
  // }

  // CORRECT dialog Ref is available inside effect since it executes after the first render cycle
  useEffect(
    () => {
      if (isOpen) {
        dialog.current.showModal();
      } else {
        dialog.current.close();
      }
    },
    // function inside useEffect is recreated every render cycle, so it will trigger useEffect again. Use `useCallback` to prevent this.
    [isOpen]
  );

  return <dialog ref={dialog}>{children}</dialog>;
}
```

### Use Case 3 - cleanup side effects

Problem: If you need to perform a side effect that requires cleanup, you can't do it right away from the component function, because it will cause a memory leak.

```tsx
import { useEffect, useCallback } from "react";

function App() {

  // WRONG - if this method is a dependency of useEffect hook, and it changes state inside, it will cause infinite loop
  handleDelete() {
    // some logic
  }

  // CORRECT - wrap it in useCallback to prevent infinite loop. React stores it internally and it won't be recreated every time, therefore it won't trigger useEffect again
  const handleDelete = useCallback(
    function handleDelete() {},
    // deps array work the same as deps for useEffect hook
    []
  );

  return (
    <DeleteConfirmation onConfirm={handleDelete} />
  );
}

export default function DeleteConfirmation({ onConfirm }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onConfirm();
    }, 3000);

    // executes right before effect runs again (not the first time) and before component unmounts
    return () => {
      clearTimeout(timer);
    };
  },
  // POTENTIAL BUG - functions inside useEffect are recreated every render cycle, so it will trigger useEffect again. Use `useCallback` to prevent this.
  [onConfirm]);

  return (
    ...
  );
}
```

## Extra Notes

Depending on the logic `useEffect()` might lead to state changes frequently, which can lead to performance issues. To prevent this, you can move useEffect with the specific UI components into a separate component, so it won't affect the rest of the main component.

````tsx

## Not all side effects require `useEffect()`

Overusing `useEffect()` and using it unnecessarily is considered a BAD PRACTICE in places where:

- side effects don't trigger render cycle at all.
- side effects that trigger render cycle are located in another function that is not called from the component function right away (until user action for example).

If used in such, it can lead to performance issues, because it will be called after every render cycle. If you need to perform a side effect only once, you can use `useLayoutEffect()` instead.

Examples of side effects that don't require `useEffect()`:

```tsx
import { useState } from "react";

function App() {
  const [places, setPlaces] = useState([]);

  // this won't trigger another render cycle
  localStorage.setItem("places", JSON.stringify(places));

  function handleClick() {
    // this will trigger another render cycle, but it's called only upon user action since it is inside a handler function that is not called right away
    navigator.geolocation.getCurrentPosition((position) => {
      setPlaces(...);
    });
  }

  return (
    <>
      <Places places={places} />
      <button onClick={handleClick}>Get Places</button>
    </>
  );
}

````
