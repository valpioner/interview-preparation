# React State Management

```tsx
// State

// when changed - component func is re-executed !!!!!
// calling `setCount()` will schedule an update, so it won't be instant
const [count, setCount] = useState<number>(0);
const [arr, setArr] = useState<number>([...]);

// WRONG - don't use this approach when new state depends on old state
setCount(!count);

// CORRECT - pass function instead, it will always get correct state value
setCount((count) => !count); // best practice

// WRONG
setArr((obj) => arr[0] = 'new value')

// CORRECT
setArr((obj) => {
  // clone 1d array
  const newArray = [...arr];
  // clone 2d array
  const newArray = [...arr.map(innerArray => [...innerArray])];

  newArray[0] = 'new value';
  return newArray;
})
```

## Lifting state up

In case when one of children affects a sibling - state should be managed by the common parent.

```tsx
// common parent
function Accordion({ title, children, isActive }) {
  // manage shared state in parent
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Panel
        isActive={activeIndex === 0}
        onShow={() => setActiveIndex(0)}>
        ...
      </Panel>
      <Panel
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}>
        ...
      </Panel>
    </>
  );
}

// siblings
function Panel({ children, isActive, onShow }) {
  return (
    {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          Show
        </button>
      )}
  );
}
```
