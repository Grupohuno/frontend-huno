import React from "react";
import Navbar from "./navbar";
import layoutStyles from "../styles/Layout.module.css";
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className={layoutStyles.container}>{children}</div>
    </>
  );
};

export default Layout;
