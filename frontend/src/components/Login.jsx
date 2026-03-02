import { useEffect, useState, useRef } from "react";
import Activity from "./Activity";
import { useParams } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";

const { VITE_API_URL } = import.meta.env;

function Login() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const saveUserDataHandler = (enteredUserData) => {
    const userData = {
      ...enteredUserData,
    };
    props.onLoginUser(userData);
  };

  const sumbitHandler = (event) => {
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value
    event.preventDefault();

    if (enteredEmail.trim().length == 0 || enteredPassword.trim().length == 0) {
      setError({
        title: "Invalid input",
        message:
          "Please enter a valid title or amount or date (non-empty values)",
      });
      return;
    }

    const expenseData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    saveUserDataHandler(expenseData);
  };
  
  return (
    <form className="space-y-4 p-8">
      <div>
        <label className="block text-[var(--color-darkbrown)] font-semibold mb-1">
          Email
        </label>
        <input
          ref={emailInputRef}
          type="email"
          placeholder="Enter your username"
          className="w-full px-4 py-2 rounded-lg border border-[var(--color-lightbrown)] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-[var(--color-darkbrown)] font-semibold mb-1">
          Password
        </label>
        <input
          ref={passwordInputRef}
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 rounded-lg border border-[var(--color-lightbrown)] focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-4 rounded-lg bg-[var(--color-darkbrown)] text-white font-bold hover:bg-[var(--color-lightbrown)] transition-colors"
      >
        Log In
      </button>
    </form>
  );
}

export default Login;
