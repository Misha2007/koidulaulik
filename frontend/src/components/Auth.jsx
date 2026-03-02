import React, { useState } from "react";
import Login from "./Login";

const { VITE_API_URL } = import.meta.env;

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [error, setError] = useState();

  const addUserHandler = (user) => {
    const addUser = async (user) => {
      try {
        console.log(JSON.stringify(user));
        const response = await fetch(`${VITE_API_URL}user/new-user`, {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("Response Data:", data.accessToken);
        localStorage.setItem("authToken", data.accessToken);
        if (!response.ok) {
          const errorMessage = await response.text();
          setError({
            title: "Problems with backend",
            message: errorMessage || "Invalid email or password.",
          });
          return;
        }
        navigate("/account");
      } catch (error) {
        console.log(error);
        setError({
          title: "Server Unreachable",
          message: "Failed to add user, please try again later.",
        });
        return;
      }
    };
    addUser(user);
  };

  const loginUserHandler = (user) => {
    const getUser = async (user) => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}user/login`, {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        localStorage.setItem("authToken", data.accessToken);

        if (!response.ok) {
          const errorMessage = await response.text();
          console.log(errorMessage);

          setError({
            title: "An error occurred",
            message: errorMessage || "Invalid email or password.",
          });
          return;
        }
        navigate("/account");
      } catch (error) {
        console.log(error);
        setError({
          title: "Server Unreachable",
          message: "Failed to add user, please try again later.",
        });
      }
    };
    getUser(user);
  };

  useState(() => {
    setToken(localStorage.getItem("authToken"));
    return null;
  }, []);

  useEffect(() => {
    if (token) {
      navigate("/account");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm bg-[var(--color-newspaper)] rounded-xl shadow-lg">
        {/* Logo */}
        <div className="w-full flex items-center justify-center p-8 rounded-t-lg border-b border-darkbrown">
          <img src="./logoSmall.svg" alt="" />
        </div>

        {isLogin ? (
          <Login onLoginUser={loginUserHandler} />
        ) : (
          <form className="space-y-4">
            <div>
              <label className="block text-brown-800 font-semibold mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-2 rounded-lg border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>

            <div>
              <label className="block text-brown-800 font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>

            <div>
              <label className="block text-brown-800 font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-lg border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 rounded-lg bg-brown-800 text-white font-bold hover:bg-yellow-400 transition-colors"
            >
              Sign Up
            </button>
          </form>
        )}

        <div className="mb-8 text-center text-brown-800">
          {isLogin ? (
            <span className="text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-500 font-semibold hover:underline"
              >
                Sign Up
              </button>
            </span>
          ) : (
            <span className="text-sm">
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-blue-500 font-semibold hover:underline"
              >
                Log In
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
