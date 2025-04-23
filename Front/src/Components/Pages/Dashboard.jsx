import React, { PureComponent } from "react";
import "../../CSS/Dashboard.css"
import eye from "../../Images/dhruvin/eye.svg";
import star from "../../Images/dhruvin/star_img.svg";
import download from "../../Images/dhruvin/download.svg";
import person from "../../Images/dhruvin/person_img.svg";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Rectangle,
  ResponsiveContainer,
  Sector,
  XAxis,
  YAxis,
} from "recharts";
import { Tooltip } from "react-bootstrap";

const Dashboard = (props) => {
  const barData = [
    { name: "Jan", premium: 200, normal: 100 },
    { name: "Feb", premium: 300, normal: 150 },
    { name: "Mar", premium: 350, normal: 200 },
    { name: "Apr", premium: 250, normal: 100 },
    { name: "May", premium: 400, normal: 250 },
  ];

  const pieData = [
    { name: "Historical", value: 50 , color:"#1E2A5E" },
    { name: "Crime", value: 25 , color:"#55679C" },
    { name: "Career", value: 18 , color:"#7C93C3" },
    { name: "Information", value: 10 , color:"#CCD6EB" },
  ];

  const COLORS = ["#1E2A5E", "#55679C", "#7C93C3", "#CCD6EB"];



  return (
    <div className="ds_dash_master">
      <div className="ds_dash_main">
        <div className="ds_dash_inner">
          <h4 className="text-light pt-4">Dashboard</h4>
          <div className="container-fluid p-0">
            <div className="row mt-3">
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                <div className="ds_dash_bg">
                  <p className="ds_head_txt mb-0">View</p>
                  <h4 className="text-light mt-2">+24K</h4>
                  <div className="text-end">
                    <img src={eye} alt="" />
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                <div className="ds_dash_bg">
                  <p className="ds_head_txt mb-0">Rated This App</p>
                  <h4 className="text-light mt-2">+50K</h4>
                  <div className="text-end">
                    <img src={star} alt="" />
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                <div className="ds_dash_bg">
                  <p className="ds_head_txt mb-0">Download</p>
                  <h4 className="text-light mt-2">+1M</h4>
                  <div className="text-end">
                    <img src={download} alt="" />
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12 mt-3">
                <div className="ds_dash_bg">
                  <p className="ds_head_txt mb-0">Visitors</p>
                  <h4 className="text-light mt-2">+2M</h4>
                  <div className="text-end">
                    <img src={person} alt="" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="row ">
                <div className="col-xl-6 mt-4">
                  <div className="ds_dash_chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        width={500}
                        height={300}
                        data={barData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#444"
                        />
                        <XAxis dataKey="name" stroke="#fff" />
                        <YAxis stroke="#fff" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1E293B",
                            color: "#fff",
                            border: "none",
                          }}
                        />
                        <Legend
                          wrapperStyle={{ color: "#fff" }}
                          iconType="circle"
                        />
                        <Bar
                          dataKey="premium"
                          name="Premium User"
                          fill="#3795BD"
                        />
                        <Bar
                          dataKey="normal"
                          name="Normal User"
                          fill="#0A46A7"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="col-xl-6 mt-4 mb-4">
                  <div className="ds_dash_chart2">
                    <h5 className="text-light mb-0">Top Category</h5>
                    {/* <div className='row ds_dash_manage'>
                                      <div className='col-sm-6 d-flex align-items-center justify-content-sm-end justify-content-center'>
                                          <div>
                                              {pieData.map((category, index) => (
                                                  <div 
                                                      key={index} 
                                                      style={{ 
                                                          display: 'flex', 
                                                          alignItems: 'center', 
                                                          marginBottom: '10px' 
                                                      }}
                                                  >
                                                      <div 
                                                          style={{
                                                              width: '15px', 
                                                              height: '15px', 
                                                              backgroundColor: COLORS[index], 
                                                              marginRight: '10px' 
                                                          }}
                                                      ></div>
                                                      <div>
                                                          <span className='text-light' style={{ marginRight: '10px' }}>
                                                              {category.name}
                                                          </span>
                                                          <span style={{ color: '#3795BD' }}>
                                                              +{category.value}%
                                                          </span>
                                                      </div>
                                                  </div>
                                              ))}
                                          </div>
                                      </div>
                                      <div className='col-sm-6'>
                                          <ResponsiveContainer width='100%' height={250}>
                                              <PieChart  >
                                                  <Pie
                                                      data={pieData}
                                                      cx='50%'
                                                      cy='50%'
                                                      innerRadius={60}
                                                      outerRadius={80}
                                                      paddingAngle={0}
                                                      dataKey='value'
                                                  >
                                                      {pieData.map((entry, index) => (
                                                          <Cell 
                                                              key={`cell-${index}`} 
                                                              fill={COLORS[index % COLORS.length]} 
                                                          />
                                                      ))}
                                                  </Pie>
                                              </PieChart>
                                          </ResponsiveContainer>
                                      </div>
                                      
                                  </div> */}

                    <div className="row ds_dash_manage">
                      <div className=" col-xl-5 col-lg-5  d-flex align-items-center justify-content-sm-end justify-content-center">
                        <div className="ds_dash_flex">
                          {pieData.map((category, index) => (
                            <div
                              key={index}
                              className="d-flex align-items-center mb-3"
                            >
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  backgroundColor: COLORS[index],
                                  marginRight: "15px",
                                  borderRadius: "4px",
                                }}
                              ></div>
                              <div>
                                <span className="text-light me-3">
                                  {category.name}
                                </span>
                                <span style={{ color: category?.color , fontWeight:"600" }}>
                                  +{category.value}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-xl-7 col-lg-7 ">
                        <ResponsiveContainer width="100%" height={400}>
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={80} // Increased inner radius
                              outerRadius={120} // Increased outer radius
                              paddingAngle={2} // Small padding between segments
                              dataKey="value"
                            >
                              {pieData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
