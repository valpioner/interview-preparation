# React Testing

Links:

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest](https://jestjs.io/docs/getting-started)
- [React hooks testing](https://react-hooks-testing-library.com/)

## Types of Testing

- **Unit Testing**: Testing individual units of code (functions, components) in isolation.
- **Integration Testing**: Testing multiple units of code together.
- **End-to-End Testing**: Testing the complete scenarios / user flows of the application.

## Tools and setup

- **Jest**: test runner and assertion library.
- **React Testing Library**: testing utility for React components that will help to simulate rendering of React app / components.

## How to write a test (AAA pattern)

1. **Arrange**: Set up the test environment, data, conditions.
2. **Act**: Perform the action that you want to test.
3. **Assert**: Compare the actual result with the expected result.

```jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

// define test suite
describe("Greeting component", () => {
  // define test
  test('renders "Hello World" as a text', () => {
    // 1. Arrange
    // 2. Act
    // 3. Assert
  });
});
```

## Testing examples

### Testing a component that renders a text

```jsx
test('renders "Changed!" if the button was clicked', async () => {
  // Arrange
  render(<Greeting />);

  // Act
  const buttonElement = screen.getByRole("button");
  await userEvent.click(buttonElement);

  // Assert
  const outputElement = screen.getByText("Changed!");
  expect(outputElement).toBeInTheDocument();
});
```

### Testing async code

```jsx
test("renders posts if request succeeds", async () => {
  // Create a mock (to simulate the fetch request)
  window.fetch = jest.fn();
  window.fetch.mockResolvedValueOnce({
    json: async () => [{ id: "p1", title: "First post" }],
  });

  render(<Async />);

  const listItemElements = await screen.findAllByRole("listitem");
  expect(listItemElements).not.toHaveLength(0);
});
```
