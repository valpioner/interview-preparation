# React animation

## using regular `CSS`

Problems:

- can't animate React component close animations
- can't (or very hard to) do complex animations
- limited look and feel of the animations

### CSS Transitions

```css
// define some property that you want to animate later
.selector-simple.expanded {
  transform: rotate(180deg);
}

/* animate all transitions for `specific` property */
.selector-with-transition {
  transition: opacity 1s ease-in-out;
  transition: transform 0.3s ease-out;
}
```

### CSS Animation

```css
.selector-with-animation {
  animation: fadeIn 1s ease-in-out forwards;
}

/* animate using from/to */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

/* animate using % */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }

  44% {
    opacity: 0.5;
    transform: translateY(-5px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
```

## using [`Framer Motion`](https://motion.dev/) library

Framer Motion is a production-ready animation library for React.

Pros:

- high performance

Wrap your component with `AnimatePresence` to animate it before unmounting.

Reuse animation states with `variants` prop. Those will trigger children animations as well, you need to overwrite child animations if needed.

```jsx
import { motion, AnimatePresence } from "framer-motion";

function App() {
  return (
    <>
      <AnimatePresence>
        {showComponent && <MyModal>}
      </AnimatePresence>

      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        initial='hidden'
        animate='visible'
        animate={{ opacity: 1, rotate: 180 }}
        exit={{ opacity: 0, rotate: 180 }}
        transition={{ duration: 0.3, type: "tween", bounce: 0.5, stiffness: 100, mass: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        Hello World
        <motion.ul variants={{visible: {transition: {staggerChildren: 0.1}}}> // staggered animations
          <motion.li
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: { opacity: 1, scale: [0.8, 1.3, 1]}, // keyframes
            }}
            initial='hidden'
            animate='visible' >
            li
          </motion.li>
        </motion.ul>
      </motion.div>
    </>
  );
}
```

## staggered animations

Staggered animations are animations (for list items) that are triggered one after another with a delay.

```html
<motion.ul variants="{{visible:" {transition: {staggerChildren: 0.1}}}>
  ...
</motion.ul>
```

## imperative approach using `useAnimate` hook

```jsx
import { useAnimate, stagger } from "framer-motion";

export default function App() {
  const [scope, animate] = useAnimate();

  if (animate) {
    animate(
      "input, textarea",
      {
        opacity: 1,
        rotate: 180,
        transition: {
          duration: 0.3,
          type: "tween",
          bounce: 0.5,
          stiffness: 100,
          mass: 0.5,
        },
      },
      {
        type: "tween",
        duration: 0.3,
        delay: 0.1,
        delay: stagger(0.1),
      }
    );
  }

  return <form ref={scope}></form>;
}
```

## animate layout changes using `layout` prop

```jsx
<motion.li layout>...</motion.li>
```

## Scroll-based animations (using `useScroll` & `useTransform`)

```jsx
import { useScroll, useTransform } from "framer-motion";

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return <motion.div style={{ opacity }}>Hello World</motion.div>;
}
```
