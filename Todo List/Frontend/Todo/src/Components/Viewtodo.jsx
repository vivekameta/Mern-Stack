import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Viewtodo.css';

function ViewTodo() {
  const [viewadmin, setViewAdmin] = useState([]);

  useEffect(()=>{

    const fetchdata=async()=>{
     
          await axios.get("http://localhost:2025/admin/viewadmin",{withCredentials :true})
          .then((res)=>{
             console.log(res)
             setViewAdmin(res.data)
          })
          .catch((err)=>{
            console.log(err);
            
          })
         
    }
    fetchdata();

  },[])

  const deletedata=async(id)=>{
      await axios.delete(`http://localhost:2025/admin/deleteadmin?id=${id}`,{withCredentials : true})
      .then((res)=>{
        console.log(res);
        setViewAdmin(viewadmin.filter((admin)=>admin._id!==id));
      })
      .catch((err)=>{
        console.log(err);
        
      })
  }
  

  return (
    <div className="view-container1">
      <h2 className="view-title" style={{color : "#222122"}}>Task Management</h2>

      <table className="styled-table">
        <thead>
          <tr>
            <th scope="col">#No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone no.</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {viewadmin.length > 0 ? (
            viewadmin.map((el, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.phoneno}</td>
                <td>
                  <i className="ri-edit-box-line edit-icon"></i>
                </td>
                <td>
                  <i
                    className="ri-delete-bin-line delete-icon"
                    onClick={() => deletedata(el._id)}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

  );
}

export default ViewTodo;
