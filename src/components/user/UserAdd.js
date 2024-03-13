import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import requestApi from "../../helpers/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const requestAddApi = async (data) => {
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi("/users", "POST", data);
      dispatch(actions.controlLoading(false));
      toast.success("User has been created successfully", {
        position: "top-center",
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/users");
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(actions.controlLoading(false));
    }
  };

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">New user</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Tables</li>
          </ol>

          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-table me-1"></i>
              Add
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <form>
                  <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">
                      First name:{" "}
                    </label>
                    <input
                      {...register("first_name", {
                        required: "First name is required",
                      })}
                      type="text"
                      className="form-control"
                      id="firstName"
                    />
                    {errors.first_name && (
                      <p style={{ color: "red" }}>
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Last name:
                    </label>
                    <input
                      {...register("last_name", {
                        required: "Last name is required",
                      })}
                      type="text"
                      className="form-control"
                      id="lastName"
                    />
                    {errors.last_name && (
                      <p style={{ color: "red" }}>{errors.last_name.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                    {errors.email && (
                      <p style={{ color: "red" }}>{errors.email.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      {...register("password", {
                        required: "Password is required",
                      })}
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                    {errors.password && (
                      <p style={{ color: "red" }}>{errors.password.message}</p>
                    )}
                  </div>
                  <div className="mb-3 ">
                    <label className="form-label">Status:</label>
                    <select {...register("status")} className="form-select">
                      <option value={1}>Active</option>
                      <option value={2}>Inactive</option>
                    </select>
                  </div>
                  <button
                    onClick={handleSubmit(requestAddApi)}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <Modal show={show} onHide={() => setShow(false)} size="sm">
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
  </Modal> */}
    </div>
  );
};

export default UserAdd;
