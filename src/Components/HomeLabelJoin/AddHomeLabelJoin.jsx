import React from 'react'
import '../Review/Review.css';

const AddHomeLabelJoin = () => {
    return (
        <>
            <section className='V_outlet_back text-white pt-3 px-3 pt-lg-5 px-lg-5'>
                <h1 className='V_title px-3'>Add Home Label Join</h1>

                <div className="row pt-2 py-5">
                    <div className="col-12 col-sm-6 col-md-12 col-lg-6 mt-3 px-4">
                        <label htmlFor="" className='V_label'>Home Label Join</label>
                        <input type="text" className='V_add_input border-0 mt-2' />
                    </div>
                    <div className="col-12 col-sm-6 col-md-12 col-lg-6 mt-3 px-4">
                        <label htmlFor="" className='V_label'>Audio Book ID</label>
                        <input type="text" className='V_add_input border-0 mt-2' />
                    </div>
                </div>

                <div className='p-5'>
                    <div className="d-flex justify-content-center gap-3 gap-md-4">
                        <div>
                            <button className='V_white_button'>save</button>
                        </div>
                        <div>
                            <button className='V_black_button'>Clear</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AddHomeLabelJoin