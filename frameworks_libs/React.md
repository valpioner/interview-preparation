# React

## React Essentials

```tsx
// Importing stuff

import { LIST } from "./data";

import Component from "./Component";

import "./Component.css"; // public styles

import svg from "/vite.svg"; // import from public folder
import svg from "../../assets/react.svg"; // import from relative path
```

```tsx
// Simple component

// Uppercase
export default function Component() {
  return (
    // only one container allowed
    <>
      <div>Content</div>
      <OtherComponent />
    </>
  )
}
```

```tsx
// Passing props

<Component {...props} />
<Component someProp={1} isSelected={selectedTab === "Tab 2"} />

function Component(props)
function Component({ id, ...props }) // forward props pattern
function Component({ prop1, prop2, onCustomEventCallback })
function Component({ element = 'div' }) // default props pattern
```

```tsx
// Passing content

<Component>
  Access content via `children` prop
</Component>
```

```tsx
// Passing extra jsx slot (ng-container select)

export default function App() {
  const buttons = (
    <>
      <TabButton
        isSelected={selectedTab === 'tab 1'}
        onClick={() => handleClick('tab 1')} />
      <TabButton
        isSelected={selectedTab === 'tab 2'}
        onClick={() => handleClick('tab 2')} />
    </>
  );

  return (
    <Tabs tabs={buttons}>
      {tabContent}
    </Tabs>
  );
}

export default function Tabs({children, tabs}) {
  return (
    // only one container allowed
    <>
      <menu>{tabs}</menu>
      {children}
    </>
  )
}
```

```tsx
// Passing desired element or Component

<Tabs tabsContainer="menu" />
<Tabs tabsContainer={Component} />

export default function Tabs({tabsContainer}) {
  const TabsContainer = tabsContainer;
  return (<TabsContainer> text </TabsContainer>);
}
```

```tsx
// Render jsx and content

// children prop contains passed content
function Component({ children }) {
  const content = '';

  if (condition) {
    content = (<div>test</div>);
  }

  return (
    {/* fragment (aka ng-container) - not rendered into DOM */}
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
      {[...].map((item, index) => (
        <HeaderItem key={item.id} {...item} />
        <HeaderItem key={index} {...item} />
      ))}

      {/* render icon */}
      <img src={image} />
    </>
  )
}
```

```tsx
// Events, callbacks

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

```tsx
// Providing styles using `className`

  <button className={isSelected ? "active" : undefined}></button>
```

```tsx
// State

  // when changed - component func is re-executed !!!!!
  const [count, setCount] = useState<number>(0);
```

## React Patterns

### Forward/Proxy/Rest props

Use `...props` into a wrapper components, and use those in its jsx

```tsx
<Tab onClick={() => handleTabClick(index)} />

export default function Tab({ ...props }) {
  return (
    <button { ...props }> Button </button>
  );
};
```

### Pass desired element/component type

```tsx
// Passing desired element or Component

<Tabs tabsContainer="menu" />
<Tabs tabsContainer={Component} />

export default function Tabs({tabsContainer}) {
  const TabsContainer = tabsContainer;
  return (<TabsContainer> text </TabsContainer>);
}
// or
export default function Tabs({TabsContainer}) {
  return (<TabsContainer> text </TabsContainer>);
}
```
