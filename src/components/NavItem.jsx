"use client";
import navStyles from "./css/Navbar.module.css";
import Link from "next/link";

import { usePathname } from "next/navigation";

export default function NavItem({ path, name }) {
  let isPath = usePathname();
  return (
    <>
      <Link href={path}>
        <h3
          className={`${navStyles["nav-item"]} ${
            isPath === path ? navStyles.active : ""
          }`}
        >
          {name}
        </h3>
      </Link>
    </>
  );
}
