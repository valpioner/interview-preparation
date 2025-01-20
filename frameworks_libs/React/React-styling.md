# React Styling

## Vanilla CSS approach

```tsx
// Importing public styles (with Builder like Vite)
import "./index.css";
import "./Component.css";

<label className={`label ${!valid ? 'invalid' : ''}`}>
<input className={!valid ? 'invalid' : undefined}>Text</p>
```

### Advantages👍

- CSS code is decoupled from JSX code
- dynamic (conditional) styling

### Disadvantages👎

- CSS code is public and not scoped to the component

## Inline styles approach

```jsx
<p style={{
  color: 'red',
  textAlign: 'left'
  backgroundColor: darkTheme ? '#000' : '#fff'
}}>Text</p>
```

### Advantages👍

- affect only the element where you add it
- dynamic (conditional) styling

### Disadvantages👎

- you need to style every element individually
- code duplication
- no separation between CSS & JSX code

## CSS Modules approach

Using this approach will create unique classes when such classes were used like this.

1. Name your css file with a `.module` in it:

   - `name.module.css`

2. Import it as a module:

   - `import classes from './Header.module.css'`

3. Use it like this:

   ```jsx
   <p className={classes.paragraph}>Text</p>
   ```

### Advantages👍

- CSS code is decoupled from JSX code
- dynamic (conditional) styling
- css classes are unique and scoped to the component file that imports them

### Disadvantages👎

- have to keep each module in each CSS file, it might result in many relatively small CSS files

## Styled Components approach (CSS-in-JS)

This approach allows to create a styled components in JSX using `Tagged template` JavaScript feature.

Package will create such a component, pass all styles and props to it.

1. `npm i styled-components`

2. `import {styled} from 'styled-components'`

3. Create styled component

   ```jsx
   const CustomDiv = styled.div`
     color: #000;
     color: ${(props) => (props.$invalid ? "#000" : "#fff")};
     color: ${({ $invalid }) => ($invalid ? "#000" : "#fff")};

     &:hover {
       color: red;
     }

     & h1 {
       color: #000;
     }

     @media (min-width: 768px) {
       color: #fff;

       & h1 {
         color: green;
       }
     }
   `;
   ```

4. Use it in your JSX

   ```jsx
   return (
     // prefix with `$` is a common convention to not to clash with built-in props
     <CustomDiv $invalid={!valid}>Text</CustomDiv>
   );
   ```

Common and Shared Styled Components may be moved into a separate files that represent new component for reusability

```jsx
// Input.jsx

const Label = styled.div`...`;
const Input = styled.div`...`;

export default function CustomInput({label, invalid ...props}) {
  return (
    <p>
      <Label $invalid={invalid}>{label}</Label>
      <Input $invalid={invalid} {...props} />
    </p>
  );
}
```

### Advantages👍

- dynamic (conditional) styling
- css classes are unique and scoped
- configurable style functions

### Disadvantages👍

- No clear separation of React & CSS code
- Many relatively small 'wrapper' components

## Styling with Tailwind

Main idea is to allow tiny prebuilt utility classes

1. Install

   ```shell
   # example for Vite
   npm i -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. Configure your template paths

   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: ["./src/**/*.{html,js}"],
     theme: {
       extend: {
         fontFamily: {
           // `font-title` as a custom class
           title: ['"Pacifico"', "cursive"],
         },
       },
     },
     plugins: [],
   };
   ```

3. Add the Tailwind directives to your CSS

   ```css
   <!-- index.css -->

   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   ...
   ```

4. Install Tailwind CSS IntelliSense VSCode extension

5. Use utility classes

   ```jsx
   let headerClasses = "...";

   if (invalid) {
     headerClasses += '...';
     labelClasses += '...';
   } else {
     headerClasses += '...';
     labelClasses += '...';
   }

   <h1 className="flex flex-col items-center mt-8 mb-8"></h1>
   <h1 className="md:mb-16"></h1>
   <h1 className="hover:bg-amber-500"></h1>
   <h1 className={headerClasses}></h1>
   ```

### Advantages👍

- no CSS knowledge required
- rapid development
- no style clashes since you don't define any CSS rules
- highly configurable & extensible
- for those who like this approach of combining utility classes

### Disadvantages👍

- long className values, hard to read
- any style changes require editing JSX
- many relatively small 'wrapper' components
- might require reading docs
