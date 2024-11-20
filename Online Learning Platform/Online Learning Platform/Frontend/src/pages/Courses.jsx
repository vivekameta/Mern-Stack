import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Courses() {
  const [data, setData] = useState([]);
  const userRole = sessionStorage.getItem("userRole");
  const token = sessionStorage.getItem("token");
  console.log(data);
const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:1008/auth/home", {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      })
      .then((res) => {
        setData(res.data.courses);
      })
      .catch((err) => console.log(err));
  }, []);


  const handleEnroll = (course) => {
    navigate("/enroll", { state: { course } });
  };

const deleteid=async(id)=>{

  await axios.delete(`http://localhost:1008/teacher/deleteCourse?id=${id}`)
  .then((res)=>{
    console.log(res);
    setData(data.filter((admin)=>admin._id!==id));
  })
   .catch((err)=>{
    console.log(err)
   })
}



  return (
    <div>
      <Header />
      <div className="course_baner">
        
      </div>
      <center style={{backgroundColor : '#F5F5F5'}}>
        <h2 className="p-4">Enroll Courses here ....</h2>
      </center>
      <div className="row" style={{ marginTop : '-7.5px' }}>
        <div className="col-3 filter">
          
        </div>
        <div className="col-9 courses p-5" style={{backgroundColor : '#ECE6F6'}}>
          <h3>* All Courses are available</h3> <br />
          <div className="row">
          {data &&
            data.map((e, i) => {
              return <>
                <div className="course_box col-3 p-3 ms-4 me-5 mb-4" key={i}>
                  <img
                    src="https://wallpapercave.com/wp/wp2036000.jpg"
                    alt="Image not available"
                  />
                  <h5 className="mt-2">{e.name}</h5>
                  <h6>{e.subject}</h6>
                  <p><strong>Rating :- </strong>{e.rating}⭐</p>

                  {
                    userRole=="student" && (
                      <button
                      className="btn btn-outline-primary"
                      onClick={() => handleEnroll(e)}
                    >
                      Enroll Courses
                    </button>
                  
                    )

                  }
                  {
                      userRole=="teacher" && (
                        <>
                        <button className="btn btn-outline-primary" onClick={()=>editdata(e._id)}>Edit</button> &nbsp;
                        <button className="btn btn-outline-primary" onClick={()=>deleteid(e._id)}>delete</button>
                        </>
                       
                      )
  
                  }
                 
                  
                </div>
              </>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
