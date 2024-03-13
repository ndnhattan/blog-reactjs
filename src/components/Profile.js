import React, { useEffect, useState } from "react";
import * as actions from "../redux/actions";
import { useDispatch } from "react-redux";
import requestApi from "../helpers/api";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState({});
  const [isSelectedFile, setIsSelectedFile] = useState(false);

  useEffect(() => {
    dispatch(actions.controlLoading(true));
    requestApi("/users/profile", "GET", [])
      .then((res) => {
        setProfileData({
          ...res.data,
          avatar: process.env.REACT_APP_API_URL + "/" + res.data.avatar,
        });
        dispatch(actions.controlLoading(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(actions.controlLoading(false));
      });
  }, []);

  const handleChangeAvatar = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({
          ...profileData,
          avatar: e.target.result,
          file,
        });
        setIsSelectedFile(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("avatar", profileData.file);
    dispatch(actions.controlLoading(true));
    requestApi(
      "/users/upload-avatar",
      "POST",
      formData,
      "json",
      "multipart/form-data"
    )
      .then((res) => {
        dispatch(actions.controlLoading(false));
        toast.success("Avatar has been updated successfully", {
          position: "top-center",
          autoClose: 1000,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch(actions.controlLoading(false));
      });
  };

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">Profile</h1>
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
              <a href="index.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Tables</li>
          </ol>

          <div className="card mb-4">
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-4">
                  <img
                    src={profileData.avatar}
                    className="img-thumbnail rounded mb-2"
                    alt=""
                  />
                  <div className="input-file float-start">
                    <label
                      htmlFor="file"
                      className="btn-file btn-sm btn btn-primary"
                    >
                      Browse file
                    </label>
                    <input
                      onChange={handleChangeAvatar}
                      type="file"
                      id="file"
                      accept="image/*"
                    />
                  </div>
                  {isSelectedFile && (
                    <button
                      onClick={handleUpdate}
                      className="btn btn-success btn-sm float-end"
                    >
                      Update
                    </button>
                  )}
                </div>
                {/* <form>
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
                </form> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
