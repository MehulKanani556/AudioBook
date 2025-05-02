import React, { useState, useEffect } from "react";
import "../../CSS/Review.css";
import { addAudioBookSchema } from "../Formik";
import { useFormik } from "formik";
import {
  addAudioBookData,
  getAllAudioBookData,
} from "../../Toolkit/Slices/AudioBookSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GenreData } from "../../Toolkit/Slices/GenreSlice";
const AddAudioBook = () => {
  const [toggle, setToggle] = useState(false);
  const [redioVal, setRedioVal] = useState("English");
  const [subAdd, setSubAdd] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const genreSelect = useSelector((state) => state.genre?.genreData);
  console.log(genreSelect);

  useEffect(() => {
    dispatch(GenreData());
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "No file chosen");
    addAudioBookFormik.setFieldValue("sampleFile", file);
  };

  const addAudioBookVal = {
    genreId: "",
    name: "",
    description: "",
    tags: "",
    language: "English",
    sampleFile: null,
  };

  const addAudioBookFormik = useFormik({
    initialValues: addAudioBookVal,
    validationSchema: addAudioBookSchema,
    onSubmit: (values) => {
      dispatch(addAudioBookData(values)).then(() => {
        dispatch(getAllAudioBookData());
      });
      navigate("/admin/audiobooks");
    },
  });

  useEffect(() => {
    addAudioBookFormik.setFieldValue("language", redioVal);
  }, [redioVal]);

  return (
    <>
      <div className="ds_dash_master h-100">
        <div className="ds_dash_main">
          <div className="ds_dash_inner">
            <div>
              <h2 className="text-light pt-4 mb-0">Add Audio Book</h2>
            </div>

            <form onSubmit={addAudioBookFormik.handleSubmit}>
              <div>
                <div className="row py-5 ">
                  <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                    <label className="V_label">Genre ID</label>
                    <select
                      className="V_input_text_for_all mt-1 mt-md-2 "
                      name="genreId"
                      value={addAudioBookFormik.values.genreId}
                      onChange={addAudioBookFormik.handleChange}
                      onBlur={addAudioBookFormik.handleBlur}
                    >
                      <option value='' disabled>Select Gerne ID</option>
                      {genreSelect.map((ele) => {
                        return <option value={ele._id}>{ele.name}</option>;
                      })}
                    </select>
                    <p
                      className="text-danger mb-0 text-start ps-1 pt-1"
                      style={{ fontSize: "14px" }}
                    >
                      {addAudioBookFormik.errors.genreId}
                    </p>
                  </div>
                  <div className="col-12 col-sm-6  pt-2 pt-md-3">
                    <label className="V_label">Name</label>
                    <input
                      type="text"
                      className="V_input_text_for_all mt-1 mt-md-2"
                      name="name"
                      value={addAudioBookFormik.values.name}
                      onChange={addAudioBookFormik.handleChange}
                      onBlur={addAudioBookFormik.handleBlur}
                    />
                    <p
                      className="text-danger mb-0 text-start ps-1 pt-1"
                      style={{ fontSize: "14px" }}
                    >
                      {addAudioBookFormik.errors.name}
                    </p>
                  </div>
                  <div className="col-12 col-sm-6  pt-2 pt-md-3">
                    <label className="V_label">Description</label>
                    <input
                      type="text"
                      className="V_input_text_for_all mt-1 mt-md-2"
                      name="description"
                      value={addAudioBookFormik.values.description}
                      onChange={addAudioBookFormik.handleChange}
                      onBlur={addAudioBookFormik.handleBlur}
                    />
                    <p
                      className="text-danger mb-0 text-start ps-1 pt-1"
                      style={{ fontSize: "14px" }}
                    >
                      {addAudioBookFormik.errors.description}
                    </p>
                  </div>
                  <div className="col-12 col-sm-6 pt-2 pt-md-3">
                    <div>
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label ds_role_text"
                      >
                        Thumbnail File
                      </label>

                      <div className="custom-input-group ">
                        <input
                          type="text"
                          className="custom-text"
                          placeholder=""
                          value={fileName}
                          readOnly
                        />
                        <label htmlFor="fileInput" className="custom-button">
                          CHOOSE
                        </label>
                        <input
                          type="file"
                          id="fileInput"
                          className="custom-file-input "
                          onChange={handleFileChange}
                          //   name="sampleFile"
                          //   value={addAudioBookFormik.values.sampleFile}
                          //     onChange={addAudioBookFormik.handleChange}
                          //   onBlur={addAudioBookFormik.handleBlur}
                        />
                      </div>
                      <p
                        className="text-danger mb-0 text-start ps-1 pt-1"
                        style={{ fontSize: "14px" }}
                      >
                        {addAudioBookFormik.errors.sampleFile}
                      </p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6  pt-2 pt-md-3">
                    <label className="V_label">Tags</label>
                    <input
                      type="text"
                      className="V_input_text_for_all mt-1 mt-md-2"
                      name="tags"
                      value={addAudioBookFormik.values.tags}
                      onChange={addAudioBookFormik.handleChange}
                      onBlur={addAudioBookFormik.handleBlur}
                    />
                    <p
                      className="text-danger mb-0 text-start ps-1 pt-1"
                      style={{ fontSize: "14px" }}
                    >
                      {addAudioBookFormik.errors.tags}
                    </p>
                  </div>
                  <div className="col-12 col-sm-6 pt-2 pt-md-3">
                    <div>
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label ds_role_text"
                      >
                        Language
                      </label>
                      <div className="select-wrapper position-relative">
                        <div
                          className="ds_sub_select1"
                          onClick={() => setToggle(!toggle)}
                        >
                          {redioVal}
                        </div>
                        {toggle && (
                          <div className="ds_sub_select_box">
                            <div
                              className="form-check mb-3"
                              onClick={() => {
                                setRedioVal("English");
                                setToggle(false);
                                addAudioBookFormik.setFieldValue('language', 'English');
                              }}
                            >
                              <input
                                className="form-check-input ds_sub_check"
                                type="radio"
                                name="language"
                                id="languageEnglish"
                                value="English"
                                checked={addAudioBookFormik.values.language === "English"}
                                onChange={() => {}}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="languageEnglish"
                              >
                                English
                              </label>
                            </div>
                            <div
                              className="form-check"
                              onClick={() => {
                                setRedioVal("French");
                                setToggle(false);
                                addAudioBookFormik.setFieldValue('language', 'French');
                              }}
                            >
                              <input
                                className="form-check-input ds_sub_check"
                                type="radio"
                                name="language"
                                id="languageFrench"
                                value="French"
                                checked={addAudioBookFormik.values.language === "French"}
                                onChange={() => {}}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="languageFrench"
                              >
                                French
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 mb-3 pb-5 ">
                  <div className="text-center">
                    <button type="submit" className="ds_role_save">
                      Save
                    </button>
                    <button
                      className="ds_sub_cancel"
                      onClick={() => {
                        setSubAdd(false);
                        setFileName("No File Choosen");
                      }}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAudioBook;
