# React Portals

Use Portal to render JSX in another place instead of following regular DOM flow.

```tsx
function App() {
  return (
    // Component will be where rendered in `createPortal()` func
    {showComponent && <Component />}

    // or if you use smth like <dialog> - open it via `ref.API()` instead.
  );
}
```

```tsx
import { createPortal } from "react-dom";

function Component() {
  return createPortal(
    <aside>...</aside>,
    // <dialog>...</dialog>,
    document.getElementById("modal")
    // document.querySelector('body')
  );
}
```

```html
<body>
  <div id="modal"></div>
</body>
```
