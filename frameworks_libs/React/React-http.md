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
