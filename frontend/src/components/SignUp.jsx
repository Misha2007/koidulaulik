import React, { useRef, useState } from "react";

function Signup(props) {
  const emailInputRef = useRef();
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();

  const [error, setError] = useState(null);

  const errorHandler = () => {
    setError(null);
  };

  const saveUserDataHandler = (enteredUserData) => {
    const userData = {
      ...enteredUserData,
    };
    props.onAddUser(userData);
  };

  const sumbitHandler = (event) => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    event.preventDefault();

    if (
      enteredUsername.trim().length == 0 ||
      enteredEmail.trim().length == 0 ||
      enteredPassword.trim().length == 0
    ) {
      setError({
        title: "Invalid input",
        message:
          "Please enter a valid name or email or password (non-empty values)",
      });
      return;
    }

    const userData = {
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
    };

    saveUserDataHandler(userData);
    emailInputRef.current.value = "";
    usernameInputRef.current.value = "";
    passwordInputRef.current.value = "";
  };

  return (
    <form className="space-y-4 p-8" onSubmit={sumbitHandler}>
      <div>
        <label className="block text-[var(--color-darkbrown)] font-semibold mb-1">
          Username
        </label>
        <input
          type="text"
          placeholder="Enter your username"
          className="w-full px-4 py-2 rounded-lg border border-[var(--color-lightbrown)] focus:outline-none"
          ref={usernameInputRef}
        />
      </div>

      <div>
        <label className="block text-[var(--color-darkbrown)] font-semibold mb-1">
          Email
        </label>
        <input
          ref={emailInputRef}
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 rounded-lg border border-[var(--color-lightbrown)] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-[var(--color-darkbrown)] font-semibold mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 rounded-lg border border-[var(--color-lightbrown)] focus:outline-none"
          ref={passwordInputRef}
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-4 rounded-lg bg-[var(--color-darkbrown)] text-white font-bold hover:bg-[var(--color-lightbrown)] transition-colors"
      >
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
