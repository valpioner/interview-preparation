# Getting Data using HTTP in React

```tsx
// http.js - helper methods for sending HTTP requests

export async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return data;
}

export async function postData(url, data) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return data;
}

export async function deleteData(url) {
  const response = await fetch(url, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }
}
```

```tsx
import { useEffect, useState } from "react";
import { fetchData } from "./http";

export default function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // WRONG - this will cause infinite loop because it will trigger re-render every time
  // fetch("https://api.example.com/data")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setData(data);
  //   });

  // CORRECT - use useEffect hook to fetch data only once
  useEffect(() => {
    // using Promise
    // setIsLoading(true);
    // fetch("https://api.example.com/data")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setData(data);
    //     setIsLoading(false);
    //   });

    // using async/await
    async function fetchData() {
      setIsLoading(true);

      try {
        const data = await fetchData("https://api.example.com/data");
        setData(data);
      } catch (error) {
        setError({ message: error.message || 'Something went wrong' });
      }

      setIsLoading(false);

    }
    fetchData();
  }, []);

  async function updateData(data) {
    // ... update local state first (for optimistic UI approach), alternatively send request first, wait for response and then update local state, but it will make the app slower and you will have to manage loading state

    // update data on server
    try{
      await postData("https://api.example.com/data", newData);
    } catch (error) {
      // rollback local state
      setData(data);
      // show error message
      setError({ message: error.message || 'Failed to update' });
    }
  }

  async function deleteData() {
    // delete data on server
    try{
      await deleteData("https://api.example.com/data");
      // clear local state (before or after request depending if optimistic UI approach is used)
      setData(null);
    } catch (error) {
      // show error message
      setError({ message: error.message || 'Failed to delete' });
    }
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    {data && (
      // if img is stored in public folder
      <img src={`http://localhost:3000/${data.img}`} alt={data && data.title} />

      <p>{data}</p>

      <Component data={data} isLoading={isLoading} />
    )}
  );
}
```

## React Tanstack Query (React Query)

Library that helps sending http requests and managing data in React applications. It provides hooks for fetching, caching, synchronizing and updating server state.

Tanstack Query doesn't send HTTP requests by itself, you have to write the code for sending requests. Library then manages the data, errors, caching & much more.

```console
npm i @tanstack/react-query
```

- setup provider
- setup useQuery (staleTime, cacheTime, refetchOnWindowFocus, refetchOnMount, refetchInterval)
  - queryKey
  - gcTime

### 1. Setup Provider (Create provider client and wrap the app with it.)

```tsx
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http.js";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
```

```tsx
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchEvents({ signal, searchTerm, max }) {
  let url = "http://localhost:3000/events";

  if (searchTerm && max) {
    url += "?search=" + searchTerm + "&max=" + max;
  } else if (searchTerm) {
    url += "?search=" + searchTerm;
  } else if (max) {
    url += "?max=" + max;
  }

  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function createNewEvent(eventData) {
  const response = await fetch(`http://localhost:3000/events`, {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while creating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function fetchSelectableImages({ signal }) {
  const response = await fetch(`http://localhost:3000/events/images`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the images");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();

  return images;
}

export async function fetchEvent({ id, signal }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    signal,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}

export async function deleteEvent({ id }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error("An error occurred while deleting the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

export async function updateEvent({ id, event }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "PUT",
    body: JSON.stringify({ event }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = new Error("An error occurred while updating the event");
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}
```

### 2. Use React Query in Components

```tsx
import { useQuery, useMutation, useIsFetching } from "@tanstack/react-query";
import {
  fetchEvents,
  createNewEvent,
  createNewEvent,
} from "../../util/http.js";

export default function Header({ children }) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", params.id],
    // queryKey: ["events", { max: 3 }],
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
    staleTime: 5000,
    gcTime: 1000,
    enabled: searchTerm !== undefined,
  });

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("/events");
    },
    onMutate: async (data) => {
      const newEvent = data.event;

      await queryClient.cancelQueries({ queryKey: ["events", params.id] });
      const previousEvent = queryClient.getQueryData(["events", params.id]);

      queryClient.setQueryData(["events", params.id], newEvent);

      return { previousEvent };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["events", params.id], context.previousEvent);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events", params.id]);
    },
  });

  function handleSubmit(formData) {
    // mutate({ event: formData });
    submit(formData, { method: "PUT" });
  }

  const fetching = useIsFetching();

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || "Failed to fetch events."}
      />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <EventForm onSubmit={handleSubmit}></EventForm>
      <div>{fetching > 0 && <progress />}</div>
      <div>{content}</div>
    </>
  );
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  await queryClient.invalidateQueries(["events"]);
  return redirect("../");
}
```
