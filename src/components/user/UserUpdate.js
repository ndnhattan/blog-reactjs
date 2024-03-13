import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as actions from "../../redux/actions";
import requestApi from "../../helpers/api";
import { toast } from "react-toastify";

const UserUpdate = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    try {
      const getUserDetail = async () => {
        const res = await requestApi("/users/" + params.id, "GET");
        const fields = ["first_name", "last_name", "status"];
        fields.forEach((field) => {
          setValue(field, res.data[field]);
        });
      };
      getUserDetail();
      dispatch(actions.controlLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(actions.controlLoading(false));
    }
  }, []);

  const requestUpdateApi = async (data) => {
    dispatch(actions.controlLoading(true));
    try {
      const res = await requestApi("/users/" + params.id, "PUT", data);
      dispatch(actions.controlLoading(false));
      toast.success("User has been updatted successfully", {
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
          <h1 className="mt-4">Update user</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Tables</li>
          </ol>

          <div className="card mb-4">
            <div className="card-header">
              <i className="fas fa-table me-1"></i>
              Update
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

                  <div className="mb-3 ">
                    <label className="form-label">Status:</label>
                    <select {...register("status")} className="form-select">
                      <option value={1}>Active</option>
                      <option value={2}>Inactive</option>
                    </select>
                  </div>
                  <button
                    onClick={handleSubmit(requestUpdateApi)}
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
    </div>
  );
};

export default UserUpdate;
