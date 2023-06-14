import React from "react";
import styles from "./Layout.module.scss";
import { NavLink, Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <header>
        <NavLink to={"/"}></NavLink>
        <NavLink to={"/store"}></NavLink>
        <NavLink to={"/about"}></NavLink>
        <NavLink to={"*"}></NavLink>
      </header>
      <Outlet />
      <footer></footer>
    </>
  );
};

export { Layout };
