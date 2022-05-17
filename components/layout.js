import React from "react";
import layoutStyles from "../styles/Layout.module.css";
import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className={layoutStyles.container}>{children}</div>
    </>
  );
};

export default Layout;
