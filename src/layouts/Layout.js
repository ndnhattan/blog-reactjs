import React from "react";
import { Outlet } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";

const override = {
  textAlign: "center",
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  top: "0",
  zIndex: "9999",
  backgroundColor: "rgb(0 0 0 / 30%)",
};

const Layout = () => {
  return (
    <div>
      <ScaleLoader loading={true} cssOverride={override} color="#36d7b7" />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Layout;
