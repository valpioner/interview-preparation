# React `memo`

React `memo` is a function that can be wrapped around COMPONENT function to prevent unnecessary COMPONENT function re-execution. It is similar to `PureComponent` in class components.

Component wrapped with `memo` will re-render only if its props have changed.

```tsx
import { memo } from "react";

// using memo here will prevent re-rendering of Tab component if its props haven't changed (sort of ng onChanges Push Strategy)
const Tab = memo(function Tab({ ...props }) {
  return <button {...props}> Button </button>;
});

export default Tab;
```

## Don't overuse `memo`

Use it as high as possible in the component tree, so it will prevent unnecessary re-renders of all children components.

Checking props with `memo()` can lead to performance issues by adding a lot of unnecessary checks.

Don't use it on components where props will change frequently, because it will lead to more performance issues than benefits.

## `useMemo` hook

`useMemo` is a hook that can be used to memoize a result of a function execution, so that it won't re-execute if deps were not changed. It is similar to `memo` but it is used to memoize a function result, NOT a component function.

```tsx
const initialValue = useMemo(
  () => {
    return "Initial Value";
  },
  // empty array means that it won't re-execute if deps were not changed
  []
);
```
