import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Courses from "./Courses";

export default function Home() {
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("token"); 
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

  return (
    <>
      
      <Courses></Courses>

    </>
  );
}
