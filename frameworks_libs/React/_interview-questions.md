# React Interview Questions

## Tasks

### Task 1

Please fetch products from this api <https://dummyjson.com/products?limit=10&skip=0>
It's a simple GET api, no options required loop through data and render product title you can find types in type.ts file

- Senior position only:

  Implement pagination to navigate through the product list
  Use the query parameters `limit` and `skip` to handle pagination add controls to paginate through the list add validation to those controls

<details>

  <summary>Answer</summary>

  ```tsx
  import { useEffect, useState } from 'react';
  import { ApiResponse } from '../types';

  export function Task1() {
    const [data, setData] = useState<ApiResponse | null>(null);
    const [page, setPage] = useState<number>(0);
    const [pageLength, setPageLength] = useState<number>(10);

    const products = data?.products ?? [];

    const isPreviousDisabled = !data || page <= 0;
    const isNextDisabled = !data || products.length < pageLength;

    useEffect(() => {
      const limit = pageLength;
      const skip = (page + 1) * pageLength;

      fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then((res) => res.json())
      .then((res: ApiResponse) => {
        setData(res);
      });
    }, [page, pageLength]);

    function handleNextClick() {
      if (products.length < pageLength) return;
      setPage((page) => page + 1);
    }

    function handlePreviousClick() {
      if (page <= 0) return;
      setPage((page) => page - 1);
    }

    function handlePageLengthChange(value: string) {
      // possible TODOs: debounce and validation
      const parsedValue = +value;
      setPageLength(parsedValue >= 1 ? parsedValue : 1);
    }

    return (
      <div
        style={{
          marginBottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div>
          <b>TASK 1:</b>
        </div>
        <label htmlFor="pageLengthInput">Page Length:</label>
        <input
          id="pageLengthInput"
          type="number"
          value={pageLength}
          onChange={(e) => handlePageLengthChange(e.target.value)}
        />
        <div>Page: {page + 1}</div>
        <ul>
          {products.map((product) => (
            <li key={product.id} style={{ listStyleType: 'none' }}>{product.title}</li>
          ))}
        </ul>
        <button onClick={handleNextClick} disabled={isNextDisabled}>
          Next Page
        </button>
        <button onClick={handlePreviousClick} disabled={isPreviousDisabled}>
          Previous Page
        </button>
      </div>
    );
  }
  ```

</details>

### Task 2

Please create a stopwatch number should update every second you don't need to format number
Add start, stop and reset buttons.

- on start click - start timer
- on stop click - stop timer and do not reset number
- on reset click - stop timer and reset number

<details>

  <summary>Answer</summary>

  ```tsx
  // This task can be done via both, `useRef` and `useEffect`. Commented code is related to `useEffect` only.

  import { useState, useRef } from 'react';

  export function Task2() {
    const [time, setTime] = useState<number>(0);
    const timerRef = useRef<number | null>(null);

    
    useEffect(() => {
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }, []);

    // const [start, setStart] = useState<boolean>(false);

    // useEffect(() => {
    //   if (!start) return;
    //   const interval = setInterval(() => {
    //     setTime((time) => time + 1);
    //   }, 1000);

    //   return () => {
    //     clearInterval(interval);
    //   };
    // }, [start]);

    function startTimer() {
      if (timerRef.current) return;

      timerRef.current = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);

      // if (start) return;
      // setStart(true);
    }

    function stopTimer() {
      if (!timerRef.current) return;

      clearInterval(timerRef.current);
      timerRef.current = null;

      // if (!start) return;
      // setStart(false);
    }

    function resetTimer() {
      stopTimer();
      setTime(0);
    }

    return (
      <div
        style={{
          marginBottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div>
          <b>TASK 2:</b>
        </div>
        Time: {time}
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    );
  }

  ```

</details>
