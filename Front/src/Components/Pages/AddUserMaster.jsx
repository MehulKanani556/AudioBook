import langs from "langs";
import React, { useState } from "react";
import { addUserMasterSchema } from "../Formik";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addUserMasterData } from "../../Toolkit/Slices/UserMasterSlice";

const AddUserMaster = () => {
  const [toggle, setToggle] = useState(false);
  const [redioVal, setRedioVal] = useState("Active");
  const [subCheck, setSubCheck] = useState(true);

  const [toggle2, setToggle2] = useState(false);
  const [redioVal2, setRedioVal2] = useState("Active");
  const [subCheck2, setSubCheck2] = useState(true);

  const dispatch = useDispatch();

  const language = langs.all();

  const addUserMasterVal = {
    email: "",
    phone: "",
    password: "",
    roleId: "",
    bio: "",
    age: "",
    occupation: "",
    studentVerificationStatus: redioVal,
    studentIdImage: "",
    coins: "",
    language: "",
    image: "",
    status: redioVal2,
  };

  const addUserMasterFormik = useFormik({
    initialValues: addUserMasterVal,
    enableReinitialize: true,
    validationSchema: addUserMasterSchema,
    onSubmit: (values) => {
      dispatch(addUserMasterData(values))
    },
  });

  return (
    <div className="ds_dash_master">
      <div className="ds_dash_main">
        <div className="ds_dash_inner">
          <div>
            <h4 className="text-light pt-4 mb-0">Add User Master</h4>
          </div>
          <form onSubmit={addUserMasterFormik.handleSubmit}>
            <div className="row pt-2">
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="email"
                    value={addUserMasterFormik.values.email}
                    onChange={addUserMasterFormik.handleChange}
                    onBlur={addUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {addUserMasterFormik.errors.email}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="phone"
                    value={addUserMasterFormik.values.phone}
                    onChange={addUserMasterFormik.handleChange}
                    onBlur={addUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {addUserMasterFormik.errors.phone}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="password"
                    value={addUserMasterFormik.values.password}
                    onChange={addUserMasterFormik.handleChange}
                    onBlur={addUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {addUserMasterFormik.errors.password}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Role ID
                  </label>
                  <input
                    type="text"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="roleId"
                    value={addUserMasterFormik.values.roleId}
                    onChange={addUserMasterFormik.handleChange}
                    onBlur={addUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {addUserMasterFormik.errors.roleId}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Bio
                  </label>
                  <input
                    type="text"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="bio"
                    value={addUserMasterFormik.values.bio}
                    onChange={addUserMasterFormik.handleChange}
                    onBlur={addUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {addUserMasterFormik.errors.bio}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Age
                  </label>
                  <input
                    type="text"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="age"
                    value={addUserMasterFormik.values.age}
                    onChange={addUserMasterFormik.handleChange}
                    onBlur={addUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {addUserMasterFormik.errors.age}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Occupation
                  </label>
                  <input
                    type="text"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="occupation"
                    value={addUserMasterFormik.values.occupation}
                    onChange={addUserMasterFormik.handleChange}
                    onBlur={addUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {addUserMasterFormik.errors.occupation}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    student_verification_status
                  </label>
                  <div className="select-wrapper position-relative">
                    <div
                      className="ds_sub_select"
                      onClick={() => setToggle(!toggle)}
                    >
                      {redioVal}
                    </div>
                    {toggle && (
                      <div className="ds_sub_select_box">
                        <div
                          className="form-check mb-3"
                          onClick={() => {
                            setRedioVal("Active");
                            setToggle(false);
                          }}
                        >
                          <input
                            className="form-check-input ds_sub_check"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="Active"
                            checked={
                              redioVal === "Active" && subCheck ? true : false
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios1"
                          >
                            Active
                          </label>
                        </div>
                        <div
                          className="form-check"
                          onClick={() => {
                            setRedioVal("Block");
                            setToggle(false);
                          }}
                        >
                          <input
                            className="form-check-input ds_sub_check"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios2"
                            value="Block"
                            checked={
                              redioVal === "Block" && subCheck ? true : false
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios2"
                          >
                            Block
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    student_ID_image
                  </label>
                  <input
                    type="text"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="studentIdImage"
                    value={addUserMasterFormik.values.studentIdImage}
                    onChange={addUserMasterFormik.handleChange}
                    onBlur={addUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {addUserMasterFormik.errors.studentIdImage}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Coins
                  </label>
                  <input
                    type="text"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="coins"
                    value={addUserMasterFormik.values.coins}
                    onChange={addUserMasterFormik.handleChange}
                    onBlur={addUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {addUserMasterFormik.errors.coins}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Language
                  </label>
                  <select
                    className="ds_role_input w-100"
                    name="language"
                    value={addUserMasterFormik.values.language}
                    onChange={addUserMasterFormik.handleChange}
                    onBlur={addUserMasterFormik.handleBlur}
                  >
                    <option value="" selected>
                      select
                    </option>
                    {language.map((element, index) => {
                      return <option key={index}>{element?.name}</option>;
                    })}
                  </select>
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {addUserMasterFormik.errors.language}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div className="position-relative">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Image
                  </label>
                  <input
                    type="text"
                    className="form-control ds_role_input"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <input
                    type="file"
                    className="ds_add_master_choose"
                    name="image"
                    value={addUserMasterFormik.values.image}
                    onChange={addUserMasterFormik.handleChange}
                    onBlur={addUserMasterFormik.handleBlur}
                  />
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {addUserMasterFormik.errors.image}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-4">
                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label ds_role_text"
                  >
                    Status
                  </label>
                  <div className="select-wrapper position-relative">
                    <div
                      className="ds_sub_select"
                      onClick={() => setToggle2(!toggle2)}
                    >
                      {redioVal2}
                    </div>
                    {toggle2 && (
                      <div className="ds_sub_select_box">
                        <div
                          className="form-check mb-3"
                          onClick={() => {
                            setRedioVal2("Active");
                            setToggle2(false);
                          }}
                        >
                          <input
                            className="form-check-input ds_sub_check"
                            type="radio"
                            name="exampleRadios1"
                            id="exampleRadios3"
                            value="Active"
                            checked={
                              redioVal2 === "Active" && subCheck2 ? true : false
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios3"
                          >
                            Active
                          </label>
                        </div>
                        <div
                          className="form-check"
                          onClick={() => {
                            setRedioVal2("Block");
                            setToggle2(false);
                          }}
                        >
                          <input
                            className="form-check-input ds_sub_check"
                            type="radio"
                            name="exampleRadios1"
                            id="exampleRadios4"
                            value="Block"
                            checked={
                              redioVal2 === "Block" && subCheck2 ? true : false
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios4"
                          >
                            Block
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-2 pt-lg-5 pt-4 mb-lg-0 pb-4">
              <button type="submit" className="ds_role_save">
                Save
              </button>
              <button className="ds_sub_cancel">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserMaster;
