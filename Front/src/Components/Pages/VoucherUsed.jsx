import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pen from "../../Images/dhruvin/pancil.svg";
import trash from "../../Images/dhruvin/trash.svg";
import eye from "../../Images/dhruvin/eye_icon.svg";
import { Button, Modal } from "react-bootstrap";
import "../../CSS/Review.css";
import Close from "../../Images/Parth/close_button.png";
import { getAllVoucherUsedData } from "../../Toolkit/Slices/VoucherUsedSlice";
import { useDispatch, useSelector } from "react-redux";

const VoucherUsed = () => {
  const [addVoucherUsedModal, setAddVoucherUsedModal] = useState(false);
  const [editVoucherUsedModal, setEditVoucherUsedModal] = useState(false);
  const [removeVoucherUsed, setRemoveVoucherUsed] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVoucherUsedData());
  }, []);
  const voucherUsed = useSelector((state) => state.voucherUsed?.voucherUsed);
  console.log(voucherUsed);

  const itemsPerPage = 10; 
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(voucherUsed.length / itemsPerPage);
  const currentItems = voucherUsed.slice(
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
              <h4 className="text-light pt-4 mb-0">Voucher Used</h4>
              <p>
                <Link
                  to="/layout/dashboard"
                  className="ds_head_txt ds_role_link text-decoration-none"
                >
                  Dashboard /
                </Link>{" "}
                <span className="text-light">Voucher Used</span>
              </p>
            </div>
            {/* <div>
              <button
                className="V_review_btn1"
                onClick={() => setAddVoucherUsedModal(true)}
              >
                <i className="fa-solid fa-plus me-2"></i> Add
              </button>
            </div> */}
          </div>

          <div className="V_review_bg mt-2">
            <div className="ds_user_master_scroll overflow-auto">
              <table className="w-100 text-light V_review_table  text-nowrap ">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Voucher ID</th>
                    <th>User ID</th>
                    <th>Used Date</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((ele, index) => {
                    console.log(currentItems);
                    
                    return (
                      <tr key={index}>
                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                        <td>{ele.voucharData?.[0]?.name || "-"}</td>
                        <td>{ele.userData?.[0]?.firstName || "-"}</td>
                        {/* <td>{ele.voucharData?.[0]?.name || '-'}</td> */}
                        {/* <td>{ele.userData?.[0]?.firstName || '-'}</td> */}
                        <td>{ele.usedDate}</td>
                          {/* <td className="">
                            <span
                              className="ds_role_icon ds_cursor me-2"
                              onClick={() => setEditVoucherUsedModal(true)}
                            >
                              <img src={pen} alt="" />
                            </span>
                            <span
                              className="ds_role_icon ds_cursor"
                              onClick={() => setRemoveVoucherUsed(true)}
                            >
                              <img src={trash} alt="" />
                            </span>
                          </td> */}
                      </tr>
                    );
                  })}

                  {/* <tr>
                    <td>02</td>
                    <td>9632</td>
                    <td>Johnwick08</td>
                    <td>20/09/02020</td>
                    <td className="">
                      <span
                        className="ds_role_icon ds_cursor me-2"
                        onClick={() => setEditVoucherUsedModal(true)}
                      >
                        <img src={pen} alt="" />
                      </span>
                      <span
                        className="ds_role_icon ds_cursor"
                        onClick={() => setRemoveVoucherUsed(true)}
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

      {/* ==========     Add Voucher Used   ========== */}
      <div className="">
        <Modal
          show={addVoucherUsedModal}
          onHide={() => setAddVoucherUsedModal(false)}
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
                <div>Add Voucher Used</div>
                <div
                  className="ms-auto"
                  onClick={() => setAddVoucherUsedModal(false)}
                >
                  <img src={Close} alt="" />
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row py-md-3  px-lg-5 ">
              <div className="col-12 col-sm-6  pt-2 pt-md-3">
                <label className="V_label">Voucher ID</label>
                <input
                  type="text"
                  className="V_input_text_for_all mt-1 mt-md-2"
                />
              </div>
              <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                <label className="V_label">User ID</label>
                <input
                  type="text"
                  className="V_input_text_for_all mt-1 mt-md-2"
                />
              </div>
              <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                <label className="V_label">Used Date</label>
                <input
                  type="text"
                  className="V_input_text_for_all mt-1 mt-md-2"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="V_modal_header mx-auto pb-4">
            <div className="d-flex justify-content-center">
              <button className="ds_role_save">Save</button>
              <button
                className="ds_sub_cancel"
                onClick={() => setAddVoucherUsedModal(false)}
              >
                Clear
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>

      {/* ==========    Edit Voucher Used Modal    ========== */}
      <div className="">
        <Modal
          show={editVoucherUsedModal}
          onHide={() => setEditVoucherUsedModal(false)}
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
                <div>Edit Voucher Used</div>
                <div
                  className="ms-auto"
                  onClick={() => setEditVoucherUsedModal(false)}
                >
                  <img src={Close} alt="" />
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row py-md-3  px-lg-5 ">
              <div className="col-12 col-sm-6  pt-2 pt-md-3">
                <label className="V_label">Voucher ID</label>
                <input
                  type="text"
                  className="V_input_text_for_all mt-1 mt-md-2"
                />
              </div>
              <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                <label className="V_label">User ID</label>
                <input
                  type="text"
                  className="V_input_text_for_all mt-1 mt-md-2"
                />
              </div>
              <div className="col-12 col-sm-6  pt-2 pt-md-3 ">
                <label className="V_label">Used Date</label>
                <input
                  type="text"
                  className="V_input_text_for_all mt-1 mt-md-2"
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="V_modal_header mx-auto pb-4">
            <div className="d-flex justify-content-center">
              <button className="ds_role_save">Save</button>
              <button
                className="ds_sub_cancel"
                onClick={() => setEditVoucherUsedModal(false)}
              >
                Clear
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>

      {/* -================= Delete Voucher Used Modal ==================*/}
      <Modal
        show={removeVoucherUsed}
        onHide={() => setRemoveVoucherUsed(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter "
        className="text-light ds_role_delete_modal"
        centered
      >
        <Modal.Body>
          <div className="text-center">
            <h4 className="mt-4">Delete</h4>
            <p className="ds_role_text">
              Are you sure you want to delete Voucher Used?
            </p>
            <div className="mt-5 mb-5">
              <button
                className="ds_delete_cancel"
                onClick={() => setRemoveVoucherUsed(false)}
              >
                Cancel
              </button>
              <button className="ds_delete_yes">Yes</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default VoucherUsed;
