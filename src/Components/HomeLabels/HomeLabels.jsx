import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "../Review/Review.css";

const HomeLabels = () => {
    const navigate = useNavigate()

    const totalPages = 10;
    const [currentPage, setCurrentPage] = useState(1);
  
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
          className={`V_pagination text-center ${currentPage === 1 ? "disabled" : ""}`}
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
              className={`text-center ${currentPage === i ? "V_pagination1" : "V_pagination"}`}
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
          className={`V_pagination text-center ${currentPage === totalPages ? "disabled" : ""}`}
          onClick={handleNext}
        >
          Next
        </div>
      );
  
      return pages;
    };
    return (
      <>
        <section className='V_outlet_back text-white pt-3 px-3 pt-lg-5 px-lg-5'>
          <div className="d-flex justify-content-between">
            <div>
              <h1 className='V_title'>Home Labels</h1>
              <p><span className='V_his_first'>Dashboard</span> / <span className='V_his_second'> Home Label</span></p>
            </div>
            <div className='align-self-center'>
              <button className='V_add_button bg-white text-black py-2 px-sm-4  ' onClick={() => navigate('/layout/addhomelabels')}>
                <FaPlus />     Add
              </button>
            </div>
          </div>
  
          <div className="V_outlet_sub_back">
            <div className=" d-flex justify-content-between flex-column overflow-auto">
              <table className=" text-white">
                <thead className='V_border_bottom'>
                  <tr >
                    <th className='V_thead'>No</th>
                    <th className='V_thead'>Name</th>
                    <th className='V_thead'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='V_thead'>01</td>
                    <td className='V_thead'>Label  Name</td>
                    <td className='V_thead'>
                      <div className="d-flex justify-content-center">
                        <div>
                          <img src={require('../../Images/Parth/edit_button.png')} alt="" className='V_action_image' onClick={() => navigate("/layout/edithomelabels")} />
                        </div>
                        <div>
                          <img src={require('../../Images/Parth/delete_button.png')} alt="" className='V_action_image' />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className='V_thead'>02</td>
                    <td className='V_thead'>Label  Name</td>
                    <td className='V_thead'>
                      <div className="d-flex justify-content-center">
                        <div>
                          <img src={require('../../Images/Parth/edit_button.png')} alt="" className='V_action_image' />
                        </div>
                        <div>
                          <img src={require('../../Images/Parth/delete_button.png')} alt="" className='V_action_image' />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
  
            </div>
          </div>
  
          <div className="pt-3 d-flex justify-content-center justify-content-md-end">
            {/* <div className='V_pagination text-center'>Prev</div>
                       <div className='V_pagination1 text-center'>1</div>
                       <div className='V_pagination text-center'>2</div>
                       <div className='V_pagination text-center'>3</div>
                       <div className='V_pagination text-center'>...</div>
                       <div className='V_pagination text-center'>10</div>
                       <div className='V_pagination text-center'>Next</div> */}
            {renderPagination()}
          </div>
        </section>
      </>
    )
  }

export default HomeLabels