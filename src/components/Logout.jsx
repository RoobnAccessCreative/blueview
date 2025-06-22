"use client";

import navStyles from "./css/Navbar.module.css";
import AxeCookie from "./AxeCookie";

export default function Logout() {
  return (
    <form action={AxeCookie}>
      <button type="submit">
        <h3 className={`${navStyles["nav-item"]} cursor-pointer`}>Log Out</h3>
      </button>
    </form>
  );
}
