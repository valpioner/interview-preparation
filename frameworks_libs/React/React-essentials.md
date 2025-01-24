# React Essentials

## Importing stuff

```tsx
import { LIST } from "./data";

import Component from "./Component";

// public styles
import "./Component.css";

// import from public folder
import svg from "/vite.svg";
// import from relative path
import svg from "../../assets/react.svg";
```

## Simple component

```tsx
// Should be Uppercase
export default function Component() {
  return <div>Content</div>;
}
```

## Passing props

```tsx
<Component {...props} />
<Component someProp={1} isSelected={selectedTab === "Tab 2"} />

function Component(props)
function Component({ id, ...props }) // forward props pattern
function Component({ prop1, prop2, onCustomEventCallback })
function Component({ element = 'div' }) // default props pattern

// passing ref pattern in React 19 and above
function Component({ ref, ...props })
// passing ref pattern in React 18 and below
const Component = forwardRef(function Component({ ...props }, ref) {});
```

## Forward props (Proxy/Rest props)

Use `...props` into a wrapper components, and use those in its jsx

```tsx
<Tab onClick={() => handleTabClick(index)} />;

export default function Tab({ ...props }) {
  return <button {...props}> Button </button>;
}
```

## Passing and reading content

```tsx
// passing content
<Component>Content</Component>;

// reading content
export default function Component({ children }) {
  return <div>{children}</div>;
}
```

## Passing extra jsx slot (ng-container select)

```tsx
export default function App() {
  const buttons = (
    <>
      <TabButton
        isSelected={selectedTab === "tab 1"}
        onClick={() => handleClick("tab 1")}
      />
      <TabButton
        isSelected={selectedTab === "tab 2"}
        onClick={() => handleClick("tab 2")}
      />
    </>
  );

  return <Tabs tabs={buttons}>{tabContent}</Tabs>;
}

export default function Tabs({ children, tabs }) {
  return (
    // only one container allowed
    <>
      <menu>{tabs}</menu>
      {children}
    </>
  );
}
```

## Pass desired element/component type

```tsx
<Tabs tabsContainer="menu" />
<Tabs tabsContainer={Component} />

export default function Tabs({tabsContainer}) {
  const TabsContainer = tabsContainer;
  return <TabsContainer> text </TabsContainer>;
}
// or
export default function Tabs({TabsContainer}) {
  return <TabsContainer> text </TabsContainer>;
}
```

## Render jsx and content

```tsx
// children prop contains passed content
function Component({ children }) {
  const content = '';

  if (condition) {
    content = (<div>test</div>);
  }

  return (
    {/* fragment (aka ng-container) - not rendered into DOM, use it to wrap few elements into one */}
    <>
      {/* render passed content */}
      {children}

      {/* render previously prepared jsx */}
      {content}

      {/* render conditional content */}
      {condition && <p>text</p>}
      {!condition ? <p>text</p> : null}
      {!condition ? (<p>text 1</p>) : (<p>text 2</p>)}


      {/* render list */}
      {[1,2,3].map((item, index) => (
        <HeaderItem key={item.id} {...item} />
        <HeaderItem key={index} {...item} />
      ))}

      {/* render 2d list matrix */}
      {[[1,2,3][1,2,3][1,2,3]].map((row, rowIndex) => (
        <li key={rowIndex}>
        <ol>
          {row.map((col, colIndex) => <li key={colIndex}>{col}</li>)}
        </ol>
      ))}

      {/* render icon */}
      <img src={image} />
    </>
  )
}
```

## Events, callbacks

```tsx
<Tab onTabClick={handleTabClick} />
<Tab onTabClick={() => handleTabClick("Tab 2")} />
<Tab onTabClick={(args) => handleTabClick(args)} />

export default function Tab({ onTabClick}) {
  return (
    <button onClick={onTabClick}> Button </button>
    <button onClick={() => onTabClick()}> Button </button>
  );
};

// or using forward props

<Tab onClick={() => handleTabClick(index)} />

export default function Tab({ ...props }) {
  return (
    <button { ...props }> Button </button>
  );
};

```

## Strict mode

Strict mode is a tool for highlighting potential problems in an application. Like Fragment, StrictMode does not render any extra DOM elements. It only activates additional checks and warnings for its descendants.

It makes components render twice in development to help you capture possible bugs, because components should work the same way doesn't matter how much time it was rendered.

```tsx
// main.jsx

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## `key` prop

`key` prop is unique React prop. It used to identify elements in a list. It also helps React to understand which elements have changed, are added, or removed. It should be unique among siblings.

You should not use `index` as a key in the dynamic list, because:

- it can lead to bugs, instead, bind to the unique value like id.
- it will make React re-render the whole list every time, because it will think that the list has changed. Using unique id will make React re-render only the changed item.

Once it is changed, React will re-render the component, meaning you can add it not only to the lists but on your own component to make it unmount and mount again when key is changed.

## How react works (Behind the scenes)

### How React updates the DOM (amd how are component functions re-executed)

- When React reads the JSX of some Component and sees some <CustomComponent /> (not built-in ones like <div>), it executes the function of that component AND ALL IT"S CHILDREN!!! To make them not re-evaluate each time - use `memo` to prevent re-execution of children components if their props were not changed.

- React builds a component tree structure that represents the relationship between components.

- React re-renders only those components that have changed. It compares the previous state of the component with the new state and decides whether to re-render it or not.

- React Dev Tools can be used to see the component tree, what components were re-executed and why.

- React creates a virtual DOM tree, which is a copy of the real DOM tree.

- Child component re-executions don't trigger re-render of parent component. Only vice versa.

- React creates a component Tree virtual DOM tree, then a Virtual Snapshot of a Target HTML Code which is being compared to the old snapshot (still virtually - in memory), then applies only those changes to the real DOM. This is called Reconciliation and it saves performance comparing to read DOM manipulations.

- React tracks state by component TYPE & POSITION (of that component) in the tree, so it knows what to re-render. Position is managed by the `key` prop.
- React schedules state updates and re-renders components in the next tick of the event loop. It batches state updates and re-renders components to improve performance.

### How to prevent unnecessary re-execution of component functions

- use `memo()` to prevent component function re-execution if their props were not changed. Though it is not recommended to use it on every component, because it can lead to performance issues.

- use clever component composition of your components, so they won't re-execute every time. Maybe it is better to move some UI with specific state logic into a separate component, and eventually remove memo() where it is not needed.

## Compound Components Pattern

- Compound components is a pattern to create a set of components that are designed to work together. They are used to create complex components with a simple API.

Simple example:

`<select>` and `<option>` are compound components. `<option>` is a child of `<select>`, and they work together to create a dropdown list.

```html
<select>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```

React example:

<Accordion> and <Accordion.Item> are compound components. <Accordion.Item> is a child of <Accordion>, and they work together to create an accordion. To make sure that <Accordion.Item> is used but not <AccordionItem>, you can merge all related components into one file and remove the export of <AccordionItem>.

```tsx
<Accordion>
  <Accordion.Item id="1" className="accordion-item">
    <Accordion.Title className="accordion-item-title">Title 1</Accordion.Title>
    <Accordion.Content className="accordion-item-content">Content 1</Accordion.Content>
  </Accordion.Item>

  <Accordion.Item id="2" className="accordion-item">>
    <Accordion.Title className="accordion-item-title">Title 2</Accordion.Title>
    <Accordion.Content className="accordion-item-content">Content 2</Accordion.Content>
  </Accordion.Item>

  <Accordion.Item id="3" className="accordion-item">>
    <Accordion.Title className="accordion-item-title">Title 3</Accordion.Title>
    <Accordion.Content className="accordion-item-content">Content 3</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

```tsx
import { createContext, useState, useContext } from "react";

const AccordionContext = createContext();

export function useAccordion() {
  const ctx = useContext(AccordionContext);

  if (!ctx) {
    throw new Error("useAccordion must be used within AccordionProvider");
  }
}

export default function Accordion({ children }) {
  const [activeId, setActiveId] = useState();

  function toggleItem(id) {
    setActiveId((prevId) => (prevId === id ? null : id));
  }

  const contextValue = {
    activeId,
    toggleItem,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul>{children}</ul>
    </AccordionContext.Provider>
  );
}

// It is a common pattern to export the compound component as a property of the main component and use it like this:
Accordion.Item = AccordionItem;
Accordion.Title = AccordionItem;
Accordion.Content = AccordionItem;
```

```tsx
import { useAccordion } from "./Accordion";

import { createContext, useContext } from "react";

const AccordionItemContext = createContext();

export function useAccordionItem() {
  const ctx = useContext(AccordionItemContext);

  if (!ctx) {
    throw new Error(
      "AccordionItem-related components must be wrapped by <Accordion.Item>"
    );
  }
}

export default function AccordionItem({ id, title, children }) {
  const { activeId, toggleItem } = useAccordion();

  const isActive = activeId === id;

  return (
    <AccordionItemContext.Provider value={id}>
      <li>
        <button onClick={() => toggleItem(id)}>Toggle</button>
        {isActive && <div>{children}</div>}
      </li>
    </AccordionItemContext.Provider>
  );
}
```

Same way you create `<Accordion.Title>` and `<Accordion.Content>` components.

## Render Props Pattern

Render props is a pattern to pass a function as a children prop to a component. The function is called by the component to render its content. If we want to have a generic component that can render different content in a different way, we can use the render props pattern.

1. When using a component (in JSX) that has to render content in a different way, we have to pass a function (that returns sone renderable content) as a children.

```tsx
<SearchableList
  items={[
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ]}
  itemKeyFn={(item) => item.id}
>
  // instruction how to render each item as an object
  {(item) => <Place item={item} />}
</SearchableList>

<SearchableList items={['item 1', 'item 2'] itemKeyFn={(item) => item}>
  // instruction how to render each item as a string
  {(item) => item}
</SearchableList>
```

2. Inside a component use `{children(item)}` instead of `{children}` to render the content in a desired generic way.

```tsx
export default function SearchableList({ items, itemKeyFn, children }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <input type="search" onChange={(e) => setSearchTerm(e.target.value)} />
      <ul>
        {searchResults.map((item) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Debouncing technique

Debouncing is a technique to delay the execution of a function until a certain amount of time has passed since the last time it was called. It is used to prevent a function from being called too frequently.

```tsx
export default function SearchableList({ items, itemKeyFn, children }) {
  const lastChange = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");


  function handleChange(event) {
    return function (...args) {
      if (lastChange.current) {
        clearTimeout(lastChange.current);
      }

      lastChange.current = setTimeout(() => {
        lastChange.current = null;
        setSearchTerm(event.target.value);
      }, 300);
    };
  }

  return (...);
}
```

## React state management

React state can be managed via:

- `useState` hook
- `useReducer` hook
- `context` API (good for low frequency updates)
- `redux` library (good for high frequency updates)
- custom hooks store (aka custom Redux store implementation)
