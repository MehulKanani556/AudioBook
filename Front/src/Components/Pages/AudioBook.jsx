import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import pen from "../../Images/dhruvin/pancil.svg";
import trash from "../../Images/dhruvin/trash.svg";
import eye from "../../Images/dhruvin/eye_icon.svg";
import { Button, Modal } from "react-bootstrap";
import "../../CSS/Review.css";
import Close from "../../Images/Parth/close_button.png";
import {
  deleteAudioBookData,
  getAllAudioBookData,
} from "../../Toolkit/Slices/AudioBookSlice";
import { useDispatch, useSelector } from "react-redux";

const AudioBook = () => {
  const navigate = useNavigate();

  const [viewAudioBook, setViewAudioBook] = useState(false);
  const [removeAudioBook, setRemoveAudioBook] = useState(false);

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const [deleteId, setDeleteId] = useState(null);
  const [viewBook, setViewBook] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAudioBookData());
  }, []);

  const audioBook = useSelector((state) => state.audioBook?.audioBook);
  //   console.log(audioBook);

  const deleteAudioBook = (deleteAudioBookId) => {
    dispatch(deleteAudioBookData(deleteAudioBookId)).then(() => {
      dispatch(getAllAudioBookData());
    });
    setRemoveAudioBook(false);
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

  const totalPages = Math.ceil(audioBook?.length / ITEMS_PER_PAGE);
  const paginatedData = audioBook?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
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
              <h4 className="text-light pt-4 mb-0">Audio Book</h4>
              <p>
                <Link
                  to="/admin/dashboard"
                  className="ds_head_txt ds_role_link text-decoration-none"
                >
                  Dashboard /
                </Link>{" "}
                <span className="text-light">Audio Book</span>
              </p>
            </div>
            <div>
              <button
                className="V_review_btn"
                onClick={() => navigate("/admin/addaudiobook")}
              >
                <i className="fa-solid fa-plus me-2"></i> Add
              </button>
            </div>
          </div>

          <div className="V_review_bg mt-2">
            <div className="ds_user_master_scroll overflow-auto">
              <table className="w-100 text-light V_review_table  text-nowrap text-capitalize">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Genre ID</th>
                    <th>Name</th>
                    <th>Thumbnail File</th>
                    <th>Description </th>
                    <th>Tags</th>
                    <th>Language</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData?.map((ele, index) => {
                    console.log(audioBook);

                    return (
                      <tr key={index}>
                        <td>
                          {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                        </td>
                        <td>{ele.genre?.[0]?.name || "-"}</td>
                        <td>{ele.name || "-"}</td>
                        <td>
                          <img
                            src={
                              "http://localhost:4000/" + ele?.sampleFile || "-"
                            }
                            className="ds_user_master_img"
                            alt=""
                          />
                        </td>
                        <td>{ele.description.slice(0, 10) || "-"}</td>
                        <td>{ele.tags || "-"}</td>
                        <td>{ele.language || "-"}</td>
                        <td className="">
                          <span
                            className="ds_sub_eye ds_cursor me-2"
                            onClick={() => {
                              setViewAudioBook(true);
                              setViewBook(ele);
                            }}
                          >
                            <img src={eye} alt="" />
                          </span>
                          <span
                            className="ds_role_icon ds_cursor me-2"
                            onClick={() => {
                              navigate("/admin/editaudiobook/" + ele._id);
                            }}
                          >
                            <img src={pen} alt="" />
                          </span>
                          <span
                            className="ds_role_icon ds_cursor"
                            onClick={() => {
                              setRemoveAudioBook(true);
                              setDeleteId(ele._id);
                            }}
                          >
                            <img src={trash} alt="" />
                          </span>
                        </td>
                      </tr>
                    );
                  })}

                  {/* <tr>
                    <td>01</td>
                    <td>9632</td>
                    <td>Johnwick</td>
                    <td>Lorem Inspuml</td>
                    <td>Lorem Ipsum</td>
                    <td>English</td>
                    <td className="">
                      <span
                        className="ds_sub_eye ds_cursor me-2"
                        onClick={() => setViewAudioBook(true)}
                      >
                        <img src={eye} alt="" />
                      </span>
                      <span
                        className="ds_role_icon ds_cursor me-2"
                        onClick={() => navigate("/layout/editaudiobook")}
                      >
                        <img src={pen} alt="" />
                      </span>
                      <span
                        className="ds_role_icon ds_cursor"
                        onClick={() => setRemoveAudioBook(true)}
                      >
                        <img src={trash} alt="" />
                      </span>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="py-3 d-flex justify-content-center justify-content-md-end px-5">
          {renderPagination()}
        </div>
      </div>

      {/* ==========    View Audio Book Modal    ========== */}
      <div className="">
        <Modal
          show={viewAudioBook}
          onHide={() => setViewAudioBook(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          className="text-white V_modal_width "
          centered
        >
          <Modal.Header className="V_modal_header">
            <Modal.Title
              id="contained-modal-title-vcenter"
              className="px-md-5 w-100"
            >
              <div className="d-flex justify-content-between ">
                <div>Audio Book Details</div>
                <div
                  className="ms-auto ds_cursor"
                  onClick={() => setViewAudioBook(false)}
                >
                  <img src={Close} alt="" />
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-lg-3 col-12">
                <img
                  src={"http://localhost:4000/" + viewBook?.sampleFile || "-"}
                  alt=""
                  className='w-100'
                />
              </div>
              <div className="col-lg-9 col-12 row py-md-3 py-3  px-md-5 text-capitalize">
                {/* <div className="col-6  pt-2 pt-sm-0">
                <p className="V_label2 mb-0">Thumbnail File</p>
              </div>
              <div className="col-6 pt-2 pt-sm-0">
                <p>
                  :{" "}
                  <img
                    style={{ width: "100px" }}
                    src={"http://localhost:4000/" + viewBook?.sampleFile || "-"}
                    alt=""
                  />
                  <span className="ms-2 V_label1">{viewBook?.sampleFile.replace(/\\/g, "/")?.split("/")?.pop() || '-'}</span>
                </p>
              </div> */}
                <div className="col-6  pt-2 pt-sm-0">
                  <p className="V_label2 mb-0">Genre ID</p>
                </div>
                <div className="col-6 pt-2 pt-sm-0">
                  <p>
                    :{" "}
                    <span className="ms-2 V_label1">
                      {viewBook?.genre?.[0]?.name || "-"}
                    </span>
                  </p>
                </div>
                <div className="col-6  pt-2 pt-sm-0">
                  <p className="V_label2 mb-0">Name</p>
                </div>
                <div className="col-6 pt-2 pt-sm-0">
                  <p>
                    :{" "}
                    <span className="ms-2 V_label1">
                      {viewBook?.name || "-"}
                    </span>
                  </p>
                </div>

                <div className="col-6  pt-2 pt-sm-0">
                  <p className="V_label2 mb-0">Description</p>
                </div>
                <div className="col-6 pt-2 pt-sm-0">
                  <p>
                    :{" "}
                    <span className="ms-2 V_label1">
                      {viewBook?.description || "-"}
                    </span>
                  </p>
                </div>
                <div className="col-6  pt-2 pt-sm-0">
                  <p className="V_label2 mb-0">Tags</p>
                </div>
                <div className="col-6 pt-2 pt-sm-0">
                  <p>
                    :{" "}
                    <span className="ms-2 V_label1">
                      {viewBook?.tags || "-"}
                    </span>
                  </p>
                </div>
                <div className="col-6  pt-2 pt-sm-0">
                  <p className="V_label2 mb-0">Language</p>
                </div>
                <div className="col-6 pt-2 pt-sm-0">
                  <p>
                    :{" "}
                    <span className="ms-2 V_label1">
                      {viewBook?.language || "-"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>

      {/* -================= Delete Audio Book Modal ==================*/}

      <Modal
        show={removeAudioBook}
        onHide={() => setRemoveAudioBook(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter "
        className="text-light ds_role_delete_modal"
        centered
      >
        <Modal.Body>
          <div className="text-center">
            <h4 className="mt-4">Delete</h4>
            <p className="ds_role_text">
              Are you sure you want to delete Audio Book?
            </p>
            <div className="mt-5 mb-5">
              <button
                className="ds_delete_cancel"
                onClick={() => setRemoveAudioBook(false)}
              >
                Cancel
              </button>
              <button
                className="ds_delete_yes"
                onClick={() => deleteAudioBook(deleteId)}
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

export default AudioBook;
