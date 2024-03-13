import React, { useEffect, useState } from "react";
import DataTable from "../common/DataTable";
import requestApi from "../../helpers/api";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatDateTime } from "../../helpers/common";

const PostList = () => {
  const dispatch = useDispatch();
  const [postsData, setPostsData] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteItems, setDeleteItems] = useState(null);
  const [show, setShow] = useState(false);
  const [deleteType, setDeleteType] = useState("single");
  const [refresh, setRefresh] = useState(Date.now());

  const columns = [
    {
      name: "ID",
      element: (row) => row.id,
    },
    {
      name: "Title",
      element: (row) => row.title,
    },
    {
      name: "Thumbnail",
      element: (row) => (
        <img
          width={70}
          src={process.env.REACT_APP_API_URL + "/" + row.thumbnail}
          alt=""
        />
      ),
    },
    {
      name: "Status",
      element: (row) => (row.status === 1 ? "Active" : "Inactive"),
    },
    {
      name: "Created at",
      element: (row) => formatDateTime(row.created_at),
    },
    {
      name: "Updated at",
      element: (row) => formatDateTime(row.updated_at),
    },
    {
      name: "Actions",
      element: (row) => (
        <>
          <Link
            to={`/posts/edit/${row.id}`}
            type="button"
            className="btn btn-warning btn-sm me-1"
          >
            <i className="fa fa-pencil"></i> Edit
          </Link>
          <button
            type="button"
            className="btn btn-danger btn-sm me-1"
            onClick={() => handleDelete(row.id)}
          >
            <i className="fa fa-trash"></i> Delete
          </button>
        </>
      ),
    },
  ];

  const handleDelete = (id) => {
    setShow(true);
    setDeleteType("single");
    setDeleteItems(id);
  };

  const handleDeleteMultiple = () => {
    setShow(true);
    setDeleteType("multiple");
  };

  const requestDeleteApi = () => {
    if (deleteType === "single") {
      dispatch(actions.controlLoading(true));
      requestApi("/users/" + deleteItems, "DELETE", [])
        .then((res) => {
          setRefresh(Date.now());
          setShow(false);
          dispatch(actions.controlLoading(false));
        })
        .catch((err) => {
          dispatch(actions.controlLoading(false));
          setShow(false);
          console.log(err);
        });
    } else {
      dispatch(actions.controlLoading(true));
      requestApi("/users/multiple?ids=" + selectedRows.toString(), "DELETE", [])
        .then((res) => {
          setRefresh(Date.now());
          setShow(false);
          dispatch(actions.controlLoading(false));
          setSelectedRows([]);
        })
        .catch((err) => {
          dispatch(actions.controlLoading(false));
          setShow(false);
          console.log(err);
        });
    }
  };

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    let query = `?items_per_page=${itemsPerPage}&page=${currentPage}&search=${searchString}`;
    requestApi("/posts" + query, "GET", [])
      .then((res) => {
        setPostsData(res.data);
        dispatch(actions.controlLoading(false));
      })
      .catch((err) => {
        dispatch(actions.controlLoading(false));
        console.log(err);
      });
  }, [currentPage, itemsPerPage, searchString, refresh]);

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
          <div className="mb-3">
            <Link
              to="/users/add"
              className="btn btn-sm btn-success me-2 "
              type="button"
            >
              <i className="fa fa-plus"></i>
              Add new
            </Link>
            {selectedRows.length > 0 && (
              <button
                className="btn btn-sm btn-danger me-2 "
                type="button"
                onClick={handleDeleteMultiple}
              >
                <i className="fa fa-trash"></i>Delete
              </button>
            )}
          </div>
          <DataTable
            data={postsData.data}
            name="List Posts"
            columns={columns}
            numOfPage={postsData.lastPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            onKeySearch={setSearchString}
            onSelectedRows={setSelectedRows}
          />
        </div>
      </main>
      <Modal show={show} onHide={() => setShow(false)} size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete?</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Close</Button>
          <Button onClick={requestDeleteApi} className="btn btn-danger">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostList;
