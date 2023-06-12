import React from "react";
import { Link, NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>
        This page doesn't exist go <Link to={"/"}>Home</Link>
      </h1>
    </div>
  );
};

export default NotFoundPage;
