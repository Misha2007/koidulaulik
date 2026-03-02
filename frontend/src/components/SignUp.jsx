import React from "react";

function Signup() {
  return (
    <form className="space-y-4 p-8">
      <div>
        <label className="block text-[var(--color-darkbrown)] font-semibold mb-1">
          Username
        </label>
        <input
          type="text"
          placeholder="Enter your username"
          className="w-full px-4 py-2 rounded-lg border border-[var(--color-lightbrown)] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-[var(--color-darkbrown)] font-semibold mb-1">
          Email
        </label>
        <input
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
