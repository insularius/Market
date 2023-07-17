import React from "react";
import styles from "./Layout.module.scss";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
const Layout = () => {
  return (
    <>
      <header>
        <Navbar />
        <NavLink to={"/"}></NavLink>
        <NavLink to={"/store"}></NavLink>
        <NavLink to={"/about"}></NavLink>
        <NavLink to={"/admin"}></NavLink>
        <NavLink to={"/signin"}></NavLink>
        <NavLink to={"/signup"}></NavLink>
        <NavLink to={"/signup/password"}></NavLink>
        <NavLink to={"/profile"}></NavLink>
        <NavLink to={"/dashboard"}></NavLink>
        <NavLink to={"*"}></NavLink>
      </header>
      <Outlet />
    </>
  );
};

export { Layout };
