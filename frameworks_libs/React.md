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
// Should be Uppercased
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
