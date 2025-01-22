# React Router

[Code example](https://github.com/academind/react-complete-guide-course-resources/tree/main/code/21%20Routing/32-finished/frontend)

Related Hooks:

- useNavigation
- useNavigate
- useRouteError
- useLocation
- useFetcher
- useRouteLoaderData
- useLoaderData
- useActionData
- useSubmit
- useSearchParams

Related Components, functions:

- RouterProvider
- createBrowserRouter()
- Outlet
- Link
- NavLink
- Navigate
- Form
- useFetcher().Form
- redirect()

## Define and configure the routes

```jsx
import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EditEventPage from "./pages/EditEvent";
import ErrorPage from "./pages/Error";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetail";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventsRootLayout from "./pages/EventsRoot";
import HomePage from "./pages/Home";
import NewEventPage from "./pages/NewEvent";
import RootLayout from "./pages/Root";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";

// Lazy load some Component
const BlogPage = lazy(() => import("./pages/Blog"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: "newsletter",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <BlogPage />
          </Suspense>
        ),
        // lazy load loader function
        loader: (meta) =>
          import("./pages/Post").then((module) => module.loader(meta)),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;

  // old way of defining routes:
  // return (
  //   <div className="App">
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/blog" element={<Blog />} />
  //     </Routes>
  //   </div>
  // );
}

export default App;
```

## Define Layout components to wrap around multiple routes

Layout components are used to wrap around multiple routes and provide a consistent layout for all the routes that are nested within them. They can contain common elements such as headers, footers, and navigation menus that are shared across multiple pages.

Outlet component is used to render child routes within a parent route. It acts as a placeholder in the parent component where the child components will be displayed. This is particularly useful for nested routing, where you have a parent route that needs to render different child components based on the URL.

```jsx
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        {/* Render the nested routes here */}
        <Outlet />
      </main>
    </>
  );
}
```

## Define Error Component

```jsx
import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

import PageContent from "../components/PageContent";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
```

## Navigate from links (using `Link` && `NavLink` components)

`Link`

- basic component used to navigate to different routes.
- does not provide any styling or indication of the active route.

`NavLink`

- enhanced version of Link that provides additional styling capabilities.
- can automatically apply an active class to the link when the route matches the current URL, therefore useful for navigation menus where you want to highlight the active link.
- the `end` prop is used to specify that the NavLink should only be active when the location matches the link's path exactly.

```jsx
import { Link, NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <Link to="/home">Home</Link>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
        end
      >
        About
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        About
      </NavLink>
    </nav>
  );
}
```

## Navigate programmatically

### Navigate programmatically from code (using `useNavigate`)

```jsx
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
navigate("/home", { state: { id: 1, name: "ABS" } });
```

### Navigate programmatically from JSX (using `Navigate` component)

The `Navigate` component is a wrapper around the `useNavigate` hook, and the current location changes when you render it.

```jsx
import { Navigate } from "react-router-dom";
<Navigate to="/home" state={{ todos: [] }} replace={true} />;
```

## Get navigation state (using `useNavigation`)

```jsx
import { useNavigation } from "react-router-dom";
const navigation = useNavigation();
const isSubmitting = navigation.state === "submitting";
<button disabled={isSubmitting}>
  {isSubmitting ? "Submitting..." : "Save"}
</button>;
```

## Get router state (using `useLocation`)

```jsx
import { useLocation } from "react-router-dom";
const location = useLocation();
<div>{location.state.name}</div>;
```

## Fetch data without further redirection (using `useFetcher`)

```jsx
import { useFetcher } from "react-router-dom";

const fetcher = useFetcher();
const { data, state } = fetcher; // state === 'idle', data.message

// fetch data without further redirection
<fetcher.Form method="post" action="/newsletter">
  <input type="email" name="email" />
  <button type="submit">Subscribe</button>
</fetcher.Form>;
```

## Loader

Loader function can be used to fetch data before rendering the component.

```jsx
async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return {
    // Route component will be rendered only after this is done
    event: await loadEvent(id),
    // This doesn't block route component rendering
    events: loadEvents(),
  };
  // old way of defining loader:
  // return defer({
  //   event: await loadEvent(id),
  //   events: loadEvents(),
  // });
}
```

### Get Loader data (using `useLoaderData` and `useRouteLoaderData`)

The `useLoaderData` and `useRouteLoaderData` hooks are both used in React Router to fetch data for a route, but they have different use cases and scopes.

`useLoaderData` is used to fetch data for the current route

- Scope: This hook is used to access the data loaded by the nearest route's loader function.
- Usage: It is typically used within a route component to get the data that was fetched when the route was matched.

`useRouteLoaderData` is used to fetch data for a specific route within the current route hierarchy.

- Scope: This hook allows you to access the data loaded by a specific route's loader function, identified by the route ID.
- Usage: It is useful when you need to access the data from a different route, not necessarily the nearest one.

If some async events are being awaited in the loader function, the component will not be rendered until they are resolved. All the rest non-awaited events won't block the rendering.

If loader return an object with async tasks, use `Await` component to wait for all of them to be resolved and `Suspense` to show a loading spinner or other fallback.

```jsx
// Define the loader function
export function myLoader() {
  // const response = await fetch("/api/data");
  // const data = await response.json();
  // return data;

  return {
    events: loadEvents(), // loadEvents is async function
  };
}
```

```jsx
import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";

export default function EventDetailPage() {
  // const { event } = useLoaderData();
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}
```

## Action

Action function used to handle data mutations, such as form submissions or other user interactions that change the state of your application. Actions are typically used in conjunction with routes to manage side effects and update the application state based on user input.

You associate an action with a route by passing it as a prop to the route object. When the route is matched and the action is triggered, the action function is executed.

The action function returns a response that can be used to update the UI or navigate to a different route.

```jsx
// define an action function
export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const eventData = { title: data.get("title") };

  const response = await fetch("http://localhost:8080/events", {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not save event." }), {
      status: 500,
    });
  }

  // Return a response, e.g., redirect to another page
  return { redirect: "/events" };
}
```

### Get Action data (using `useActionData`)

This hook is used to access the data that was returned by an action function.

The `Form` component is a special form component provided by react-router-dom that integrates with the router to handle form submissions. It allows you to submit forms using the router's navigation, which can be useful for handling form submissions in a single-page application (SPA) without causing a full page reload.

```jsx
import { Form, useActionData } from "react-router-dom";

export default function Component() {
  const { redirect, errors } = useActionData();

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <Form method={method}>
      {data?.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
    </Form>
  );
}
```

## Submit forms and trigger navigation actions (using `useSubmit`)

This hook is used to programmatically submit forms or trigger navigation actions.

```jsx
import { useSubmit } from "react-router-dom";

const MyComponent = () => {
  const submit = useSubmit();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    submit(formData, { method: "post", action: "/submit" });
    // submit(null, { method: 'delete' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  );
};
```

## Query parameters (using `useSearchParams`)

```jsx
const [searchParams, setSearchParams] = useSearchParams();
const isLogin = searchParams.get('mode') === 'login';
<Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
```
