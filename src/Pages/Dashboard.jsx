import React from 'react'
import '../CSS/Dashboard.css'
import eye from '../Images/dhruvin/eye.svg'
import star from '../Images/dhruvin/star_img.svg'
import download from '../Images/dhruvin/download.svg'
import person from '../Images/dhruvin/person_img.svg'
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Tooltip } from 'react-bootstrap'

const Dashboard = () => {

    const data = [
        {
          name: 'Jan',
          premium: 180,
          normal: 40,
        },
        {
          name: 'Feb',
          premium: 295,
          normal: 150,
        },
        {
          name: 'Mar',
          premium: 340,
          normal: 205,
        },
        {
          name: 'Apr',
          premium: 240,
          normal: 95,
        },
        {
          name: 'May',
          premium: 390,
          normal: 250,
        }
      ];

  return (
    <div>
       <div className='ds_dash_main'>
         <div className='ds_dash_inner'>
            <h4 className='text-light pt-4'>Dashboard</h4>
            <div className='container-fluid p-0'>
                <div className="row mt-3">
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                        <div className='ds_dash_bg'>
                            <p className='ds_head_txt mb-0'>View</p>
                            <h4 className='text-light mt-2'>+24K</h4>
                            <div className='text-end'>
                                <img src={eye} alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                        <div className='ds_dash_bg'>
                            <p className='ds_head_txt mb-0'>Rated This App</p>
                            <h4 className='text-light mt-2'>+50K</h4>
                            <div className='text-end'>
                                <img src={star} alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                        <div className='ds_dash_bg'>
                            <p className='ds_head_txt mb-0'>Download</p>
                            <h4 className='text-light mt-2'>+1M</h4>
                            <div className='text-end'>
                                <img src={download} alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                        <div className='ds_dash_bg'>
                            <p className='ds_head_txt mb-0'>Visitors</p>
                            <h4 className='text-light mt-2'>+2M</h4>
                            <div className='text-end'>
                                <img src={person} alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-5'>
                    <div className="row">
                        <div className="col-xl-6">
                            <div className='ds_dash_chart'>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                  width={500}
                                  height={300}
                                  data={data}
                                  margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                  }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#444" />
                                  <XAxis dataKey="name" stroke="#fff" />
                                  <YAxis stroke="#fff" />
                                  <Tooltip contentStyle={{ backgroundColor: '#1E293B', color: '#fff', border: 'none' }} />
                                  <Legend wrapperStyle={{ color: '#fff' }} />
                                  <Bar dataKey="premium" name="Premium User" fill="#3795BD" />
                                  <Bar dataKey="normal" name="Normal User" fill="#0A46A7" />
                                </BarChart>
                              </ResponsiveContainer>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
       </div>
    </div>
  )
}

export default Dashboard
