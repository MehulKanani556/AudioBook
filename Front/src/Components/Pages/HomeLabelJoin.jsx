import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pen from "../../Images/dhruvin/pancil.svg";
import trash from "../../Images/dhruvin/trash.svg";
import eye from "../../Images/dhruvin/eye_icon.svg";
import { Button, Modal } from "react-bootstrap";
import "../../CSS/Review.css";
import Close from "../../Images/Parth/close_button.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addHomeLabelJoin,
  allHomeLabelJoin,
  deleteHomeLabelJoin,
  editHomeLabelJoin,
} from "../../Toolkit/Slices/HomeLabelJoinSlice";
import { addHomeLabelJoinSchema } from "../Formik";
import { useFormik } from "formik";
import { HomeLabelData } from "../../Toolkit/Slices/HomeLabelsSlice";
import { getAllAudioBookData } from "../../Toolkit/Slices/AudioBookSlice";

const HomeLabelJoin = () => {
  const [addHomeLabelJoinModal, setAddHomeLabelJoinModal] = useState(false);
  const [editHomeLabelJoinModal, setEditHomeLabelJoinModal] = useState(false);
  const [removeHomeLabelJoin, setRemoveHomeLabelJoin] = useState(false);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const [updateHLJ, setUpdateHLJ] = useState(null);
  const [deleteHLJ, setDeleteHLJ] = useState(null);

  const dispatch = useDispatch();

  const deleteHLJData = (deleteId) => {
    dispatch(deleteHomeLabelJoin(deleteId)).then(() => {
      dispatch(allHomeLabelJoin());
    });
    setRemoveHomeLabelJoin(false);
  };

  const updateHomeLabelJoin = (ele) => {
    addHomeLabelJoinFormik.setValues({
      homeLabelId: ele?.homeLabelId,
      audioBookId: ele?.audioBookId,
    });
    setUpdateHLJ(ele._id);
  };

  useEffect(() => {
    dispatch(allHomeLabelJoin());
    dispatch(HomeLabelData());
    dispatch(getAllAudioBookData());
  }, []);
  const homeLabelJoin = useSelector(
    (state) => state.homeLabelJoin?.homeLabelJoin
  );
  const selectHomeLabel = useSelector(
    (state) => state.homeLabel?.homeLabelData
  );
  const selectAudioBook = useSelector((state) => state.audioBook?.audioBook);

  const homeLabelJoinVal = {
    homeLabelId: "",
    audioBookId: "",
  };
  const addHomeLabelJoinFormik = useFormik({
    initialValues: homeLabelJoinVal,
    validationSchema: addHomeLabelJoinSchema,
    onSubmit: (values, { resetForm }) => {
      if (updateHLJ === null) {
        dispatch(addHomeLabelJoin(values)).then(() => {
          dispatch(allHomeLabelJoin());
        });
        resetForm();
        setAddHomeLabelJoinModal(false);
      } else {
        const updatedData = {
          ...values,
          _id: updateHLJ,
        };
        dispatch(editHomeLabelJoin(updatedData)).then(() => {
          dispatch(allHomeLabelJoin());
        });
        resetForm();
        setEditHomeLabelJoinModal(false);
      }
    },
  });

  const totalPages = Math.ceil(homeLabelJoin.length / itemsPerPage);
  const currentData = homeLabelJoin.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPagination = () => {
    let pages = [];

    pages.push(
      <div
        key="prev"
        className={`V_pagination text-center ${
          currentPage === 1 ? "disabled" : ""
        }`}
        onClick={handlePrev}
      >
        Prev
      </div>
    );

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        pages.push(
          <div
            key={i}
            onClick={() => handlePageChange(i)}
            className={`text-center ${
              currentPage === i ? "V_pagination1" : "V_pagination"
            }`}
          >
            {i}
          </div>
        );
      } else if (
        (i === currentPage - 2 && currentPage > 3) ||
        (i === currentPage + 2 && currentPage < totalPages - 2)
      ) {
        pages.push(
          <div key={`dots-${i}`} className="V_pagination text-center">
            ...
          </div>
        );
      }
    }

    pages.push(
      <div
        key="next"
        className={`V_pagination text-center ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={handleNext}
      >
        Next
      </div>
    );

    return pages;
  };

  return (
    <div className="ds_dash_master">
      <div className="ds_dash_main">
        <div className="ds_dash_inner">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="text-light pt-4 mb-0">Home Label Join</h4>
              <p>
                <Link
                  to="/admin/dashboard"
                  className="ds_head_txt ds_role_link text-decoration-none"
                >
                  Dashboard /
                </Link>{" "}
                <span className="text-light">Home Label Join</span>
              </p>
            </div>
            <div>
              <button
                className="V_review_btn1"
                onClick={() => setAddHomeLabelJoinModal(true)}
              >
                <i className="fa-solid fa-plus me-2"></i> Add
              </button>
            </div>
          </div>

          <div className="V_review_bg mt-2">
            <div className="ds_user_master_scroll overflow-auto">
              <table className="w-100 text-light V_review_table text-nowrap">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Home Label ID</th>
                    <th>Audio Book ID</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((ele, index) => {
                    const actualIndex =
                      (currentPage - 1) * itemsPerPage + index + 1;
                    return (
                      <tr key={index}>
                        <td>{actualIndex}</td>
                        <td>{ele?.homeLabelData[0]?.labelName || "-"}</td>
                        <td>{ele?.audioBookData[0]?.name || "-"}</td>
                        <td>
                          <span
                            className="ds_role_icon ds_cursor me-2"
                            onClick={() => {
                              setEditHomeLabelJoinModal(true);
                              updateHomeLabelJoin(ele);
                            }}
                          >
                            <img src={pen} alt="" />
                          </span>
                          <span
                            className="ds_role_icon ds_cursor"
                            onClick={() => {
                              setRemoveHomeLabelJoin(true);
                              setDeleteHLJ(ele._id);
                            }}
                          >
                            <img src={trash} alt="" />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="py-3 d-flex justify-content-center justify-content-md-end px-2 px-md-5">
          {renderPagination()}
        </div>
      </div>

      {/* ==========     Add Home Label Join   ========== */}
      <div className="">
        <Modal
          show={addHomeLabelJoinModal}
          onHide={() => setAddHomeLabelJoinModal(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          className="text-white V_modal_width"
          centered
        >
          <Modal.Header className="V_modal_header">
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="px-lg-5 w-100"
            >
              <div className="d-flex justify-content-between ">
                <div>Add Home Label Join</div>
                <div
                  className="ms-auto ds_cursor"
                  onClick={() => setAddHomeLabelJoinModal(false)}
                >
                  <img src={Close} alt="" />
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <form onSubmit={addHomeLabelJoinFormik.handleSubmit}>
            <Modal.Body>
              <div className="row py-md-3  px-lg-5 ">
                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                  <label className="V_label">Home Label Join</label>
                  <select
                    type="text"
                    className="V_input_text_for_all mt-1 mt-md-2"
                    name="homeLabelId"
                    value={addHomeLabelJoinFormik.values.homeLabelId}
                    onChange={addHomeLabelJoinFormik.handleChange}
                    onBlur={addHomeLabelJoinFormik.handleBlur}
                  >
                    <option value='' disabled>Select Home Label</option>
                    {selectHomeLabel.map((ele) => {
                      return <option value={ele._id}>{ele.labelName}</option>;
                    })}
                  </select>
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {addHomeLabelJoinFormik.errors.homeLabelId}
                  </p>
                </div>
                <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                  <label className="V_label">Audio Book ID</label>
                  <select
                    type="text"
                    className="V_input_text_for_all mt-1 mt-md-2"
                    name="audioBookId"
                    value={addHomeLabelJoinFormik.values.audioBookId}
                    onChange={addHomeLabelJoinFormik.handleChange}
                    onBlur={addHomeLabelJoinFormik.handleBlur}
                  >
                    <option value='' disabled>Select Audio Book</option>
                    {selectAudioBook.map((ele) => {
                      return <option value={ele._id}>{ele.name}</option>;
                    })}
                  </select>
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {addHomeLabelJoinFormik.errors.audioBookId}
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="V_modal_header mx-auto pb-4">
              <div className="d-flex justify-content-center">
                <button type="submit" className="ds_role_save">
                  Save
                </button>
                <button
                  className="ds_sub_cancel"
                  onClick={() => setAddHomeLabelJoinModal(false)}
                >
                  Clear
                </button>
              </div>
            </Modal.Footer>
          </form>
        </Modal>
      </div>

      {/* ==========    Edit Home Label Join Modal    ========== */}
      <div className="">
        <Modal
          show={editHomeLabelJoinModal}
          onHide={() => setEditHomeLabelJoinModal(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          className="text-white V_modal_width ds_cursor"
          centered
        >
          <Modal.Header className="V_modal_header">
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="px-lg-5 w-100"
            >
              <div className="d-flex justify-content-between ">
                <div>Edit Home Label Join</div>
                <div
                  className="ms-auto"
                  onClick={() => setEditHomeLabelJoinModal(false)}
                >
                  <img src={Close} alt="" />
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <form onSubmit={addHomeLabelJoinFormik.handleSubmit}>
            <Modal.Body>
              <div className="row py-md-3  px-lg-5 ">
                <div className="col-12 col-sm-6  pt-2 pt-md-3">
                  <label className="V_label">Home Label Join</label>
                  <select
                    type="text"
                    className="V_input_text_for_all mt-1 mt-md-2"
                    name="homeLabelId"
                    value={addHomeLabelJoinFormik.values.homeLabelId}
                    onChange={addHomeLabelJoinFormik.handleChange}
                    onBlur={addHomeLabelJoinFormik.handleBlur}
                  >
                    {selectHomeLabel.map((ele) => {
                      return <option value={ele._id}>{ele.labelName}</option>;
                    })}
                  </select>
                  {/* <p
                  className="text-danger mb-0 text-start ps-1 pt-1"
                  style={{ fontSize: "14px" }}
                >
                  {addHomeLabelJoinFormik.errors.homeLabelId}
                </p> */}
                </div>
                <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                  <label className="V_label">Audio Book ID</label>
                  <select
                    type="text"
                    className="V_input_text_for_all mt-1 mt-md-2"
                    name="audioBookId"
                    value={addHomeLabelJoinFormik.values.audioBookId}
                    onChange={addHomeLabelJoinFormik.handleChange}
                    onBlur={addHomeLabelJoinFormik.handleBlur}
                  >
                    {selectAudioBook.map((ele) => {
                      return <option value={ele._id}>{ele.name}</option>;
                    })}
                  </select>
                  {/* <p
                  className="text-danger mb-0 text-start ps-1 pt-1"
                  style={{ fontSize: "14px" }}
                >
                  {addHomeLabelJoinFormik.errors.audioBookId}
                </p> */}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="V_modal_header mx-auto pb-4">
              <div className="d-flex justify-content-center">
                <button type="submit" className="ds_role_save">
                  Save
                </button>
                <button
                  className="ds_sub_cancel"
                  onClick={() => setEditHomeLabelJoinModal(false)}
                >
                  Clear
                </button>
              </div>
            </Modal.Footer>
          </form>
        </Modal>
      </div>

      {/* -================= Delete Home Label Join Modal ==================*/}

      <Modal
        show={removeHomeLabelJoin}
        onHide={() => setRemoveHomeLabelJoin(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter "
        className="text-light ds_role_delete_modal"
        centered
      >
        <Modal.Body>
          <div className="text-center">
            <h4 className="mt-4">Delete</h4>
            <p className="ds_role_text">
              Are you sure you want to delete Home Label join?
            </p>
            <div className="mt-5 mb-5">
              <button
                className="ds_delete_cancel"
                onClick={() => setRemoveHomeLabelJoin(false)}
              >
                Cancel
              </button>
              <button
                className="ds_delete_yes"
                onClick={() => deleteHLJData(deleteHLJ)}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HomeLabelJoin;
