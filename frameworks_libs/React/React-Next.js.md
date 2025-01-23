# Next JS

```console
npx create-next-app@latest [name]
```

Next JS is a React framework that allows you to build server-rendered applications. It is a great choice for building static websites, blogs, and e-commerce sites. Next JS provides a powerful data fetching system that allows you to fetch data at build time, request time, or a combination of both.

Next JS project routes are based on the file system. You can create a new page by creating a new file in the `pages` directory. For example, if you create a file named `about.js` in the `pages` directory, you can access it at `http://localhost:3000/about`.

Next JS renders pages on the server by default, which means that the HTML is generated on the server and sent to the client. This makes Next JS pages load faster and perform better in search engine rankings.

Next JS support two types of routers:

- App router (newer approach)
- Pages router (older approach)

## Reserved filenames

- `page.js` defines the content of a page
- `layout.js` defines the shell around one or more pages. Should be at lease one root layout file. You can have nested `layout.js` files.

- `icon.png` is the favicon
- `not-found.js` fallback page for "Not Found" errors (thrown by sibling or nested pages or layouts)
- `error.js` fallback page for other errors (thrown by sibling pages or nested pages or layouts)
- `loading.js` fallback page which is shown whilst sibling or nested pages (or layouts) are fetching data
- `route.js` allows you to create an API route (i.e., a page which does NOT return JSX code but instead data, e.g., in the JSON format)

## Import from root directory

```jsx
import logoImg from "@/assets/logo.png";
```

```json

```

## App router

## Dynamic routes

- app/
  - community
    - page.js
  - meals/
    - `[mealSlug]`
      - page.js
    - share/
      - page.js
    - page.js
  - about/
    - page.js
  - blog/
    - `[slug]`
    - page.js
- assets/
- public/

## Server vs Client Components

Next JS has two types of components:

- React Server Components (RSC) - Components that are ONLY rendered on the server and sent to the client as HTML. Advantages: faster initial load time, better SEO, and improved performance on slow devices (less client-side JS). You can't use `useState, useEffect, event handlers like onCLick` in server components.

Server component can include client components.

```jsx
// server component

<h2>I'm a server component</h2>

// CORRECT
<SomeClientComponent />
```

Server component can be used to fetch data on a server and use node code like `fs`.

Server component can execute server form actions (fn that is async and has 'use server') that will be executed on a server.

- Client Components (CC) - Components that are `pre-rendered on the server` and sent to the client as HTML, but are also `hydrated on the client` and can be `re-rendered on the client`. Advantages: faster client-side navigation, better interactivity, and improved performance on fast devices (more client-side JS).

Client component can include Server Component ONLY as a {children}.

Client component dan't define server actions, but can use them if included from a separate server action file.

Client component can use `use()` hook to get context.
Client component can use `use()` hook to await special promises (those created via libraries that integrate with React's Suspense feature, meaning you can create promise in server component and pass to client component).

```jsx
// client component

<h2>I'm a client component</h2>

// WRONG - if possible, will be converted to the client component and if no errors - rendered on the client
<SomeServerComponent />

// CORRECT
{children}
```

By default, all components in Next JS are server components. To make a component a client component, you can use the `'use client';` directive.

## Next JS elements

### `Link`

Use the `Link` component from Next JS to create client-side navigation between pages. The `Link` component is used to navigate between pages without a full page reload.

```jsx
import { Link } from "next/link";

// link to a static route `/about`
<Link href="/about">About</Link>;

// link to a dynamic route `/meals/[slug]`
<Link href={`/meals/${slug}`}>About</Link>;
```

### `Image`

Use the `Image` component from Next JS to optimize images on your site like lazy loading, automatic resizing, and serving images in modern formats.

```jsx
import { Image } from "next/image";
import logoImg from "@/assets/logo.png";
<Image src={logoImg} alt="Image" priority />;
```

## Next JS hooks and features

### `usePathname`

Use the `usePathname` hook from Next JS to get the current pathname of the page.

```jsx
"use client";
import { usePathname } from "next/router";

function Page() {
  // Works only in Client Components
  const pathname = usePathname(); // string
  return <div>{pathname}</div>;
}
```

### `useFormStatus`

Use the `useFormStatus` hook from Next JS to get the status of a form (e.g., `loading`, `success`, `error`). Works only in Client Components.

```jsx
"use client";
import { useFormStatus } from "react-dom";

function Form() {
  const { pending } = useFormStatus();
}
```

### `useFormState`

Use the `useFormState` hook from Next JS to get the state of a form (e.g., `values`, `errors`, `touched`). Works only in Client Components.

```jsx
const [state, formAction] = useFormState(meal, {message: null});
<form action={formAction}>
{state.message && <p>{state.message}</p>}
```

### `params.slug`

Use the `params.slug` object to get the dynamic route parameters in Next JS.

### Server Actions (using `'use server';`)

#### 1. In a server components

```jsx
// some-server-component.js

// works only in Server Components

// if used via `useFormState` hook, additional param will be added
// async function serverActionFn(prevState, formData) {
async function serverActionFn(formData) {
  'use server';

  const meal = {
    title: formData.get('title'),
  }

  if (valid) {
    return {
      message: 'Invalid input'
    }
  }

  await saveMeal(meal);
  revalidatePath('/meals', 'page');
  redirect ('/meals');
}

<form onSubmit={serverActionFn}>
```

#### 2. In a separate file

```jsx
// actions.js

"use server";

export async function serverActionFn(formData) {
  const meal = {
    title: formData.get("title"),
  };

  await saveMeal(meal);
  revalidatePath("/meals", "page");
  redirect("/meals");
}
```

## Caching and revalidation

Next JS provides a built-in caching system (very aggressive caching) that allows you to cache pages at the edge (CDN) and in the browser. You can use the `revalidate` option in `getStaticProps` to set the number of seconds after which a page should be revalidated.

Revalidation will throw away the cache.

```jsx
// only this page will be revalidated
revalidatePath("/meals", "page");

// all pages of this layout will be revalidated
revalidatePath("/", "layout");
```

## Metadata

`metadata` is reserved for the `head` tag of the page. You can set the title, description, and other metadata for the page.

```jsx
export const metadata = {
  title: "About",
  description: "This is the about page",
};
```

```jsx
export async function generateMetadata({ params }) {
  const meal = getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}
```
