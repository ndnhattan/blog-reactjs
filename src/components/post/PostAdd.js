import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import requestApi from "../../helpers/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CustomUploadAdapter from "../../helpers/CustomUploadAdapter";

const PostAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [thumbnail, setThumbnail] = useState("");
  const [categories, setCategories] = useState([]);

  const requestAddApi = async (data) => {
    dispatch(actions.controlLoading(true));

    let formData = new FormData();
    for (let key in data) {
      if (key === "thumbnail") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    }
    try {
      const res = await requestApi(
        "/posts",
        "POST",
        formData,
        "json",
        "multipart/form-data"
      );
      dispatch(actions.controlLoading(false));
      toast.success("Post has been created successfully", {
        position: "top-center",
        autoClose: 1000,
      });
      setTimeout(() => {
        navigate("/posts");
      }, 2000);
    } catch (error) {
      console.log(error);
      dispatch(actions.controlLoading(false));
    }
  };

  const handleChangeThumbnail = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    dispatch(actions.controlLoading(false));
    requestApi("/categories", "GET")
      .then((res) => {
        dispatch(actions.controlLoading(false));
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
        dispatch(actions.controlLoading(false));
      });
  }, []);

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return new CustomUploadAdapter(loader);
    };
  }

  return (
    <div id="layoutSidenav_content">
      <main>
        <div className="container-fluid px-4">
          <h1 className="mt-4">New post</h1>
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
                      Title:{" "}
                    </label>
                    <input
                      {...register("title", {
                        required: "Title is required",
                      })}
                      type="text"
                      className="form-control"
                      id="firstName"
                    />
                    {errors.title && (
                      <p style={{ color: "red" }}>{errors.title.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Summary:
                    </label>
                    <input
                      {...register("summary", {
                        required: "Summary is required",
                      })}
                      type="text"
                      className="form-control"
                      id="lastName"
                    />
                    {errors.summary && (
                      <p style={{ color: "red" }}>{errors.summary.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Description:
                    </label>

                    <CKEditor
                      editor={ClassicEditor}
                      onReady={(editor) => {
                        register("description", {
                          required: "Description is required",
                        });
                      }}
                      onChange={(event, editor) => {
                        setValue("description", editor.getData());
                      }}
                      config={{ extraPlugins: [uploadPlugin] }}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Thumbnail:</label>
                    <br />
                    {thumbnail && (
                      <img
                        alt=""
                        className="mb-2"
                        src={thumbnail}
                        style={{ width: "300px" }}
                      />
                    )}
                    <div className="input-file ">
                      <label
                        htmlFor="file"
                        className="btn-file btn-sm btn btn-primary"
                      >
                        Browse file
                      </label>
                      <input
                        {...register("thumbnail", {
                          required: "Thumbnail is required",
                          onChange: handleChangeThumbnail,
                        })}
                        type="file"
                        id="file"
                        accept="image/*"
                      />
                    </div>
                    {errors.thumbnail && (
                      <p style={{ color: "red" }}>{errors.thumbnail.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Category
                    </label>
                    <select {...register("category")} className="form-select">
                      <option value="">--Select Category--</option>
                      {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p style={{ color: "red" }}>{errors.category.message}</p>
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

export default PostAdd;
