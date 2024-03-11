import React from "react";
import { useSelector } from "react-redux";
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
  const statusLoading = useSelector((state) => state.globalLoading.status);

  return (
    <div>
      <ScaleLoader
        loading={statusLoading}
        cssOverride={override}
        color="#36d7b7"
      />
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default Layout;
