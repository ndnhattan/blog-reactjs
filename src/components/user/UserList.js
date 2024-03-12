import React, { useEffect, useState } from "react";
import DataTable from "../common/DataTable";
import requestApi from "../../helpers/api";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";

const UserList = () => {
  const dispatch = useDispatch();
  const [usersData, setUsersData] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const columns = [
    {
      name: "ID",
      element: (row) => row.id,
    },
    {
      name: "First name",
      element: (row) => row.first_name,
    },
    {
      name: "Last name",
      element: (row) => row.last_name,
    },
    {
      name: "Email",
      element: (row) => row.email,
    },
    {
      name: "Created at",
      element: (row) => row.created_at,
    },
    {
      name: "Updated at",
      element: (row) => row.updated_at,
    },
    {
      name: "Actions",
      element: (row) => (
        <>
          <button type="button" className="btn btn-warning btn-sm me-1">
            <i className="fa fa-pencil"></i> Edit
          </button>
          <button type="button" className="btn btn-danger btn-sm me-1">
            <i className="fa fa-trash"></i> Delete
          </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    let query = `?items_per_page=${itemsPerPage}&page=${currentPage}`;
    requestApi("/users" + query, "GET", [])
      .then((res) => {
        setUsersData(res.data);
        dispatch(actions.controlLoading(false));
      })
      .catch((err) => {
        dispatch(actions.controlLoading(false));
        console.log(err);
      });
  }, [currentPage, itemsPerPage]);

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Tables</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Tables</li>
          </ol>
          <DataTable
            data={usersData.data}
            name="List Users"
            columns={columns}
            numOfPage={usersData.lastPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      </main>
    </div>
  );
};

export default UserList;
