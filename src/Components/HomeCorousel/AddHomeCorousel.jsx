import React from 'react';
import '../Review/Review.css';

const AddHomeCorousel = () => {
    return (
        <>
            <section className='V_outlet_back text-white pt-3 px-3 pt-lg-5 px-lg-5'>
                <h1 className='V_title px-3'>Add Home Corousel</h1>

                <div className="row pt-2 py-5">
                    <div className="col-12 col-sm-6 col-md-12 col-lg-6 mt-3 px-4">
                        <label htmlFor="" className='V_label'>Image</label>
                        <div className='V_add_input d-flex justify-content-between justify-content-center mt-2'>
                            <input type="text" className='bg-transparent  V_add_input1 border-0 w-100' />
                            <button className='V_choose_image_button px-3'>CHOOSE</button>
                        </div>
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

export default AddHomeCorousel