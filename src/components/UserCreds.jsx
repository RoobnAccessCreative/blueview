export default function UserCreds({ mode, handler }) {
  return (
    <>
      <form action={handler} className="rounded-4xl p-4 bg-[midnightblue]/50">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          required
          placeholder="Enter Username"
          name="username"
          id="username"
        />

        {mode === "signup" ? (
          <>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              placeholder="Enter Email"
              name="email"
              id="email"
            />
          </>
        ) : null}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          required
          placeholder="Enter Password"
          name="password"
          id="password"
        />

        <button type="submit" className="cursor-pointer">
          {mode === "login" ? "Log In" : "Sign Up"}
        </button>
      </form>
    </>
  );
}
