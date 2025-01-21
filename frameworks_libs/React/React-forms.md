# Handling Forms in React

## Form building approaches

### Using `useState`

```jsx
// login.jsx

import { useState } from "react";

export default function Login() {
  const [enteredValue, setEnteredValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(username, password);
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    setEnteredValue((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        value={enteredValue.username}
        onChange={handleInputChange}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        value={enteredValue.email}
        onChange={handleInputChange}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        value={enteredValue.password}
        onChange={handleInputChange}
      />

      <button>Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Using `useRef`

```jsx
// login.jsx

import { useState } from "react";

export default function Login() {
  const email = useRef();
  const password = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" ref={email} />

      <label htmlFor="password">Password</label>
      <input type="password" name="password" ref={password} />

      <button>Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Using native `FormData()` Browser API;

```jsx
// ComponentWithForm.jsx

import { useState } from "react";

export default function ComponentWithForm() {
  function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    // ?
    // .forEach((value, key) => {
    //   console.log(key, value);
    // });

    // it won't get the values of the group of inputs with the same `name` like `language`, so we need to get it manually
    const data = Object.fromEntries(fd.entries());
    // ?
    // .forEach((key, value) => {
    //   console.log(key, value);
    // });

    data.language = fd.getAll("language");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" />

      <label htmlFor="password">Password</label>
      <input type="password" name="password" />

      <fieldset>
        <legend>Choose your favorite programming language</legend>
        <input type="radio" name="language" value="javascript" />
        <label htmlFor="javascript">JavaScript</label>
        <input type="radio" name="language" value="python" />
        <label htmlFor="python">Python</label>
        <input type="radio" name="language" value="java" />
        <label htmlFor="java">Java</label>
      </fieldset>

      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Resetting the form

1. Using `useState`

```jsx
setEnteredValues({
  username: "",
  email: "",
  password: "",
});
```

2. Using `useRef`

```jsx
// this solution should be used with caution, because it's not a good practice to manipulate the DOM directly thus not recommended
email.current.value = "";
```

3. Using native form `reset()`

```jsx
// also a bit imperative code, but better than manipulating the DOM directly
event.target.reset();
```

4. Using native `type="reset"`

```jsx
<button type="reset">Reset</button>
```

## Validating the form

1. Validating Input on every key stroke

```jsx
import { useState } from "react";

export default function ComponentWithForm() {
  const [enteredValues, setEnteredValue] = useState({
    email: "",
  });

  // PROBLEM - we are showing the error message too early after very first key stroke not giving the user a chance to type the email, use onBlur instead
  const emailIsInvalid =
    enteredValues.email !== "" && !enteredValues.email.includes("@");

  return (
    <form>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        value={enteredValue.email}
        onChange={(e) => {
          setEnteredValues((prevValue) => {
            return {
              ...prevValue,
              email: e.target.value,
            };
          });
        }}
      />
      {emailIsInvalid && (
        <div className="error">
          <p>Email must contain '@' character</p>
        </div>
      )}
    </form>
  );
}
```

2. Validating Input on blur (lost focus)

```jsx
import { useState } from "react";

export default function ComponentWithForm() {
  const [enteredValues, setEnteredValue] = useState({
    email: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
  });

  const emailIsInvalid = didEdit.email && !enteredValues.email.includes("@");

  function handleInputBlur(identifier) {
    setDidEdit((prevValue) => ({
      ...prevValue,
      [identifier]: true,
    }));
  }

  function handleInputChange(identifier, e) {
    setEnteredValues((prevValue) => ({
      ...prevValue,
      [identifier]: e.target.value,
    }));

    setDidEdit((prevValue) => ({
      ...prevValue,
      [identifier]: false,
    }));
  }

  return (
    <form>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        value={enteredValue.email}
        onBlur={() => handleInputBlur("email")}
        onChange={(e) => handleInputChange("email", e)}
      />
      {emailIsInvalid && (
        <div className="error">
          <p>Email must contain '@' character</p>
        </div>
      )}
    </form>
  );
}
```

3. Validating Input on form submit

```jsx
import { useState, useRef } from "react";

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  const email = useRef();
  const password = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    const emailIsValid = enteredEmail.includes("@");

    if (!emailIsValid) {
      setEmailIsInvalid(true);
      return;
    }

    setEmailIsInvalid(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" ref={email} />
      {emailIsInvalid && (
        <div className="error">
          <p>Email must contain '@' character</p>
        </div>
      )}

      <label htmlFor="password">Password</label>
      <input type="password" name="password" ref={password} />

      <button>Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
}
```

4. Validating Input via built-in validation Props (`required` etc.)

```jsx
import { useState, useRef } from "react";

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" required />
      {emailIsInvalid && (
        <div className="error">
          <p>Email must contain '@' character</p>
        </div>
      )}

      <label htmlFor="password">Password</label>
      <input type="password" name="password" minLength={6} />

      <button>Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
}
```

5. By mixing the above methods

## Reusable Input component

1. Building a reusable input component

```jsx
export default function Input({ label, id, error, ...props }) {
  return (
    <div className="form-control">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      {error && <p>{error}</p>}
    </div>
  );
}
```

2. Using the reusable input component

```jsx
export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        id="email"
        type="email"
        name="email"
        value={enteredValue.email}
        onBlur={() => handleInputBlur("email")}
        onChange={(e) => handleInputChange("email", e.target.value)}
        error={emailIsInvalid && 'Email must contain "@" character'}
        required
      />

      <Input
        label="Password"
        id="password"
        type="password"
        name="password"
        value={enteredValue.password}
        onBlur={() => handleInputBlur("email")}
        onChange={(e) => handleInputChange("email", e.target.value)}
        error={
          passwordIsInvalid && "Password must be at least 6 characters long"
        }
        minLength={6}
      />

      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
}
```

3. Optionally move validation logic into a utility function

```jsx
export function isEmail(value) {
  return value.includes("@");
}

export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function isMinLength(value, minLength) {
  return value.trim().length >= minLength;
}

export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}
```

4. Using the utility functions in the form component

```jsx
const emailIsInvalid =
  didEdit.email &&
  !isEmail(enteredValues.email) &&
  isNotEmpty(enteredValues.email);

const passwordIsInvalid =
  didEdit.password && !isMinLength(enteredValues.password, 6);
```

5. Custom hooks for form validation

Create custom hooks for input validation

```jsx
// src/hooks/useInput.js

import { useState } from "react";

export function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  function handleInputChange(event) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(false);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: !valueIsValid && didEdit,
  };
}
```

Use the custom hook in the form component

```jsx
import { useInput } from "./hooks/useInput";

export default function Login() {
  const {
    value: email,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  function handleSubmit(e) {
    e.preventDefault();
    if (emailHasError) return;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        id="email"
        type="email"
        name="email"
        value={emailValue}
        onBlur={handleEmailBlur}
        onChange={handleEmailChange}
        error={emailHasError && 'Email must contain "@" character'}
        required
      />

      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
}
```

6. Using 3rd party libraries for form validation like `React Hook Form`, `Formik`, etc.

## Handling Forms via Form Actions (React 19+)

Form Actions features is available only in React 19+. It allows you to handle form submission logic in a separate function and pass it to the form component as a prop.

Key points:

- you can define synchronous or asynchronous functions that you could use as a values for the `action` attribute of the form element, or for the `formAction` attribute of the button element. React will make sure to call those functions when the form is submitted.
- form submissions also will reset the form which might be a problem, and that is why you might want to use `useActionState` hook to handle the form submission logic and errors, so that your formAction can return a value, and then you can use that formState to update UI to show some error msg, but also to pre/re-populate `defaultValue`s input with a values entered by the user for example.
- formActions can be synchronous or asynchronous, and you can use `useActionState` hook to handle both cases. For asynchronous formActions you can use `useOptimistic` hook to update the UI optimistically with a temporary value before the server responds, you can use `useFormStatus` as well which you can use to update UI while the form is being submitted.

### Synchronous Form Actions Function

```jsx
import { isEmail, isNotEmpty, hasMinLength } from "./utils/validation";
import { useActionState } from "react";

// moved out of component function, because no props and state involved.
function signupAction(prevFormState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const language = formData.getAll("language"); // array of values

  // validate the form data
  let errors = [];

  if (!isEmail(email)) {
    errors.push("Email must contain '@' character");
  }

  if (!isNotEmpty(password) || !hasMinLength(password, 6)) {
    errors.push("Password must not be empty");
  }

  if (language.length === 0) {
    errors.push("Please choose your favorite programming language");
  }

  if (errors.length > 0) {
    return {
      errors,
      enteredValues: {
        email,
        password,
        language,
      },
    };
  }

  return { errors: null };
}

export default function SignUp() {
  const [formState, formAction, pending] = useActionState(signupAction, {
    errors: null,
  });

  return (
    // React overwrites `action` logic to handle the form submission
    <form action={formAction}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        defaultValue={formState.enteredValues?.email}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        defaultValue={formState.enteredValues?.password}
      />

      <fieldset>
        <input
          type="radio"
          name="language"
          value="javascript"
          defaultChecked={formState.enteredValues?.language.includes(
            "javascript"
          )}
        />
        <input
          type="radio"
          name="language"
          value="python"
          defaultChecked={formState.enteredValues?.language.includes("python")}
        />
        <input
          type="radio"
          name="language"
          value="java"
          defaultChecked={formState.enteredValues?.language.includes("java")}
        />
      </fieldset>

      {formState.errors && (
        <ul className="error">
          {formState.errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}

      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Asynchronous Form Actions Function

```jsx
import { FormActionState, use } from "react";
import { OpinionContext } from "../store/OpinionContext";

export function NewOpinion() {
  const { addOpinion } = use(OpinionContext);

  async function shareOpinionAction(prevState, formData) {
    const title = formData.get("title");
    const body = formData.get("body");
    const userName = formData.get("userName");

    let errors = [];

    if (title.trim().length < 5) {
      errors.push("Title must not be empty");
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push("Opinion must be between 10 and 300 characters");
    }

    if (!userName.trim()) {
      errors.push("Please provide your name");
    }

    if (errors.length > 0) {
      return {
        errors,
        enteredValues: {
          title,
          body,
          userName,
        },
      };
    }

    // submit the form data to the server
    await addOpinion({ title, body, userName });
    return { errors: null };
  }

  const [formState, formAction, pending] = useActionState(shareOpinionAction, {
    errors: null,
  });

  return (
    <div className="new-opinion">
      <h2>New Opinion</h2>
      <form action={formAction}>
        <p className="control">
          <label htmlFor="userName">Your Name</label>
          <input
            type="text"
            name="userName"
            defaultValue={formState.enteredValues?.userName}
          />
        </p>

        <p className="control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={formState.enteredValues?.title}
          />
        </p>

        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            name="body"
            rows={5}
            defaultValue={formState.enteredValues?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="error">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <Submit />
      </form>
    </div>
  );
}
```

```jsx
// can't be used in a component that has an action function, therefore we create new component for it
import { useFormStatus } from "react-dom";

export default function Submit() {
  const [formState, formAction, pending] = useFormStatus(submitAction, {
    errors: null,
  });

  return (
    <p className="actions">
      <button type="reset">Reset</button>
      <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
      </button>
    </p>
  );
}
```

We can also trigger different formActions for different buttons

```jsx
import { use, useActionState, useOptimistic } from "react";

export function Opinion({opinion: { id, title. body, userName, votes }}) {
  const { upvoteOpinion, downvoteOpinion } = use(OpinionContext);

  const [optimisticCotes, setVotesOptimistically] =  useOptimistic(
    votes,
    (prevVotes, mode) => mode === 'up' ? prevVotes + 1 : prevVotes - 1
  );

  async function upvoteAction() {
    setVotesOptimistically('up');
    await upvoteOpinion(id);
  }

  async function downvoteAction() {
    setVotesOptimistically('down');
    await downvoteOpinion(id);
  }

  const [upvoteFormState, upvoteFormAction, upvotePending ] = useActionState(upvoteAction, null);
  const [downvoteFormState, downvoteFormAction, downvotePending ] = useActionState(downvoteAction, null);

  return (
    <form>
      <button formAction={upvoteFormAction} disabled={upvotePending || downvotePending}>
        Upvote
      </button>

      <button formAction={downvoteFormAction} disabled={upvotePending || downvotePending}>
        Downvote
      </button>

      <span>{optimisticVotes}</span>
    </form>
  );
}
```
