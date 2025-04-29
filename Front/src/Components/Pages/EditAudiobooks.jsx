import React, { useEffect, useState } from "react";
import "../../CSS/Review.css";
import { editAudioBookSchema } from "../Formik";
import { useFormik } from "formik";
import { GenreData } from "../../Toolkit/Slices/GenreSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  editAudioBookData,
  getAllAudioBookData,
  singleAudioBookData,
} from "../../Toolkit/Slices/AudioBookSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditAudiobooks = () => {
  const [toggle, setToggle] = useState(false);
  const [redioVal, setRedioVal] = useState("English");
  const [subAdd, setSubAdd] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "No file chosen");
    editAudioBookFormik.setFieldValue("sampleFile", file);
  };

  const editgenreSelect = useSelector((state) => state.genre?.genreData);

  useEffect(() => {
    dispatch(GenreData());
  }, []);

  const { id } = useParams();

  useEffect(() => {
    dispatch(singleAudioBookData(id));
  }, []);

  const singleAudioData = useSelector(
    (state) => state.audioBook.singleAudioBook
  );
  console.log(singleAudioData);

  const editAudioBookVal = {
    genreId: "",
    name: "",
    description: "",
    tags: "",
    language: redioVal,
    sampleFile: fileName,
  };

  const editAudioBookFormik = useFormik({
    initialValues: editAudioBookVal,
    validationSchema: editAudioBookSchema,
    onSubmit: (values) => {
      const updateAudioBookData = {
        ...values,
        language: redioVal,
        sampleFile: fileName,
        _id: id,
      };
      dispatch(editAudioBookData(updateAudioBookData)).then(() => {
        dispatch(getAllAudioBookData());
        navigate("/admin/audiobooks");
      });
    },
  });

  useEffect(() => {
    editAudioBookFormik.setValues({
      genreId: singleAudioData?.[0]?.genreId,
      name: singleAudioData?.[0]?.name,
      description: singleAudioData?.[0]?.description,
      tags: singleAudioData?.[0]?.tags,
      language: singleAudioData?.[0]?.language,
      sampleFile: singleAudioData?.[0]?.sampleFile,
    });
    setFileName(singleAudioData?.[0]?.sampleFile);
    setRedioVal(singleAudioData?.[0]?.language);
  }, [singleAudioData]);

  return (
    <>
      <div className="ds_dash_master h-100">
        <div className="ds_dash_main">
          <div className="ds_dash_inner">
            <div>
              <h2 className="text-light pt-4 mb-0">Edit Audio Book</h2>
            </div>

            <form onSubmit={editAudioBookFormik.handleSubmit}>
              <div>
                <div className="row py-5 ">
                  <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                    <label className="V_label">Genre ID</label>
                    <select
                      className="V_input_text_for_all mt-1 mt-md-2 "
                      name="genreId"
                      value={editAudioBookFormik.values.genreId}
                      onChange={editAudioBookFormik.handleChange}
                      onBlur={editAudioBookFormik.handleBlur}
                    >
                      {editgenreSelect.map((ele) => {
                        return <option value={ele._id}>{ele.name}</option>;
                      })}
                    </select>
                    {/* <p
                      className="text-danger mb-0 text-start ps-1 pt-1"
                      style={{ fontSize: "14px" }}
                    >
                      {editAudioBookFormik.errors.genreId}
                    </p> */}
                  </div>
                  <div className="col-12 col-sm-6  pt-2 pt-md-3">
                    <label className="V_label">Name</label>
                    <input
                      type="text"
                      className="V_input_text_for_all mt-1 mt-md-2"
                      name="name"
                      value={editAudioBookFormik.values.name}
                      onChange={editAudioBookFormik.handleChange}
                      onBlur={editAudioBookFormik.handleBlur}
                    />
                    <p
                      className="text-danger mb-0 text-start ps-1 pt-1"
                      style={{ fontSize: "14px" }}
                    >
                      {editAudioBookFormik.errors.name}
                    </p>
                  </div>
                  <div className="col-12 col-sm-6  pt-2 pt-md-3">
                    <label className="V_label">Description</label>
                    <input
                      type="text"
                      className="V_input_text_for_all mt-1 mt-md-2"
                      name="description"
                      value={editAudioBookFormik.values.description}
                      onChange={editAudioBookFormik.handleChange}
                      onBlur={editAudioBookFormik.handleBlur}
                    />
                    <p
                      className="text-danger mb-0 text-start ps-1 pt-1"
                      style={{ fontSize: "14px" }}
                    >
                      {editAudioBookFormik.errors.description}
                    </p>
                  </div>
                  <div className="col-12 col-sm-6 pt-2 pt-md-3">
                    <div>
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label ds_role_text"
                      >
                        Sample File
                      </label>

                      <div className="custom-input-group ">
                        <input
                          type="text"
                          className="custom-text"
                          placeholder=""
                          value={fileName}
                          readonly
                        />
                        <label htmlFor="fileInput" className="custom-button">
                          CHOOSE
                        </label>
                        <input
                          type="file"
                          id="fileInput"
                          className="custom-file-input "
                          onChange={handleFileChange}
                        />
                      </div>
                      <p
                        className="text-danger mb-0 text-start ps-1 pt-1"
                        style={{ fontSize: "14px" }}
                      >
                        {editAudioBookFormik.errors.sampleFile}
                      </p>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6  pt-2 pt-md-3">
                    <label className="V_label">Tags</label>
                    <input
                      type="text"
                      className="V_input_text_for_all mt-1 mt-md-2"
                      name="tags"
                      value={editAudioBookFormik.values.tags}
                      onChange={editAudioBookFormik.handleChange}
                      onBlur={editAudioBookFormik.handleBlur}
                    />
                    <p
                      className="text-danger mb-0 text-start ps-1 pt-1"
                      style={{ fontSize: "14px" }}
                    >
                      {editAudioBookFormik.errors.tags}
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
                              }}
                            >
                              <input
                                className="form-check-input ds_sub_check"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios1"
                                value="English"
                                checked={
                                  redioVal === "English" && subAdd
                                    ? true
                                    : false
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="exampleRadios1"
                              >
                                English
                              </label>
                            </div>
                            <div
                              className="form-check"
                              onClick={() => {
                                setRedioVal("Franch");
                                setToggle(false);
                              }}
                            >
                              <input
                                className="form-check-input ds_sub_check"
                                type="radio"
                                name="exampleRadios"
                                id="exampleRadios2"
                                value="Franch"
                                checked={
                                  redioVal === "Franch" && subAdd ? true : false
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="exampleRadios2"
                              >
                                Franch
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

export default EditAudiobooks;
