import React from "react";
import Navbar from "../SharedComponents/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../SharedComponents/Footer/Footer";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
