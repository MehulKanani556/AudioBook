import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pen from "../../Images/Parth/edit_button.png";
import trash from "../../Images/Parth/delete_button.png";
import view from "../../Images/Parth/view_button.png";
import { Button, Modal } from "react-bootstrap";
import "../../CSS/Review.css";
import Close from "../../Images/Parth/close_button.png";
import { useDispatch, useSelector } from "react-redux";
import {
  addHomeCarouselData,
  deleteHomeCarousel,
  editHomeCarouselData,
  getAllHomeCarouselData,
} from "../../Toolkit/Slices/HomeCarouselSlice";
import { addHomeCarouselSchema } from "../Formik";
import { useFormik } from "formik";

const HomeCorousel = () => {
  const [addHomeLabelCorouselModal, setAddHomeLabelCorouselModal] =
    useState(false);
  const [editHomeLabelCorousel, setEditHomeLabelCorousel] = useState(false);
  const [removeHomeCorousel, setRemoveHomeCorousel] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");

  const [updateHC, setUpdateHC] = useState(null);
  const [deleteHC, setDeleteHC] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllHomeCarouselData());
  }, []);
  const homeCarousel = useSelector((state) => state.homeCarousel?.homeCarousel);

  const homeCarouselVal = {
    image: "",
  };

  const addHomeCarouselFormik = useFormik({
    initialValues: homeCarouselVal,
    validationSchema: addHomeCarouselSchema,
    onSubmit: (values, { resetForm }) => {
      if (updateHC === null) {
        dispatch(addHomeCarouselData(values)).then(() => {
          dispatch(getAllHomeCarouselData());
          resetForm();
          setFileName("No file chosen");
        });
        setAddHomeLabelCorouselModal(false);
      } else {
        const updatedData = {
          ...values,
          _id: updateHC,
        };
        dispatch(editHomeCarouselData(updatedData)).then(() => {
          dispatch(getAllHomeCarouselData());
          resetForm();
          setFileName("No file chosen");
        });
        setEditHomeLabelCorousel(false);
      }
    },
  });

  const deleteHomeCarouselField = (deleteId) => {
    dispatch(deleteHomeCarousel(deleteId)).then(() => {
      dispatch(getAllHomeCarouselData());
    });
    setRemoveHomeCorousel(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "No file chosen");
    addHomeCarouselFormik.setFieldValue("image", file);
  };

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(homeCarousel.length / itemsPerPage);

  const currentItems = homeCarousel.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const updateHomeCarousel = (ele) => {
    addHomeCarouselFormik.setValues({
      homeCorouselImage: ele?.homeCorouselImage,
    });
    setFileName(ele?.homeCorouselImage);
    setUpdateHC(ele._id);
  };

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
    if (totalPages <= 1) return null;

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
              <h4 className="text-light pt-4 mb-0">Home Corousel</h4>
              <p>
                <Link
                  to="/layout/dashboard"
                  className="ds_head_txt text-decoration-none"
                >
                  Dashboard /
                </Link>{" "}
                <span className="text-light">Home Corousel</span>
              </p>
            </div>
            <div>
              <button
                className="V_review_btn1"
                onClick={() => setAddHomeLabelCorouselModal(true)}
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
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((ele, index) => {
                    const actualIndex =
                      (currentPage - 1) * itemsPerPage + index;
                    return (
                      <tr key={actualIndex}>
                        <td>{actualIndex + 1}</td>
                        <td>
                          <img
                            src={`http://localhost:4000/${ele?.homeCorouselImage}`}
                            alt=""
                            className="V_home_corousel_image"
                          />
                        </td>
                        <td className="">
                          <span
                            className="ds_role_icon ds_cursor me-2"
                            onClick={() => {
                              setEditHomeLabelCorousel(true);
                              updateHomeCarousel(ele);
                            }}
                          >
                            <img src={pen} alt="" />
                          </span>
                          <span
                            className="ds_role_icon ds_cursor"
                            onClick={() => {
                              setRemoveHomeCorousel(true);
                              setDeleteHC(ele._id);
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

        <div className="py-3 d-flex justify-content-center justify-content-md-end px-5">
          {renderPagination()}
        </div>
      </div>

      {/* ==========     Add Home Labels    ========== */}
      <div className="">
        <Modal
          show={addHomeLabelCorouselModal}
          onHide={() => setAddHomeLabelCorouselModal(false)}
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
                <div>Add Home Corousel</div>
                <div
                  className="ms-auto"
                  onClick={() => setAddHomeLabelCorouselModal(false)}
                >
                  <img src={Close} alt="" />
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <form onSubmit={addHomeCarouselFormik.handleSubmit}>
            <Modal.Body>
              <div className="row py-md-3  px-lg-5 ">
                <div className="col-12   pt-2 pt-md-3">
                  <label className="V_label">Image</label>
                  <div className="custom-input-group">
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
                    {addHomeCarouselFormik.errors.image}
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
                  onClick={() => {
                    setAddHomeLabelCorouselModal(false);
                    setFileName("No File Choosen");
                  }}
                >
                  Clear
                </button>
              </div>
            </Modal.Footer>
          </form>
        </Modal>
      </div>

      {/* ==========    Edit Home Labels     ========== */}

      <Modal
        show={editHomeLabelCorousel}
        onHide={() => setEditHomeLabelCorousel(false)}
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
              <div>Edit Home Corousel</div>
              <div
                className="ms-auto"
                onClick={() => setEditHomeLabelCorousel(false)}
              >
                <img src={Close} alt="" />
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={addHomeCarouselFormik.handleSubmit}>
          <Modal.Body>
            <div className="row py-md-3  px-lg-5 ">
              <div className="col-12   pt-2 pt-md-3">
                <label className="V_label">Image</label>
                <div className="custom-input-group">
                  <input
                    type="text"
                    className="custom-text"
                    placeholder=""
                    value={fileName.replace(/\\/g, "/")?.split("/")?.pop()}
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
                  <p
                    className="text-danger mb-0 text-start ps-1 pt-1"
                    style={{ fontSize: "14px" }}
                  >
                    {addHomeCarouselFormik.touched.image &&
                      addHomeCarouselFormik.errors.image}
                  </p>
                </div>
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
                onClick={() => {
                  setEditHomeLabelCorousel(false);
                  setFileName("No File Chosen");
                  addHomeCarouselFormik.resetForm();
                }}
              >
                Clear
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>

      {/* -================= Delete Home Label Join Modal ==================*/}
      <Modal
        show={removeHomeCorousel}
        onHide={() => setRemoveHomeCorousel(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter "
        className="text-light ds_role_delete_modal"
        centered
      >
        <Modal.Body>
          <div className="text-center">
            <h4 className="mt-4">Delete</h4>
            <p className="ds_role_text">
              Are you sure you want to delete Home Corousel?
            </p>
            <div className="mt-5 mb-5">
              <button
                className="ds_delete_cancel"
                onClick={() => setRemoveHomeCorousel(false)}
              >
                Cancel
              </button>
              <button
                className="ds_delete_yes"
                onClick={() => deleteHomeCarouselField(deleteHC)}
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

export default HomeCorousel;
