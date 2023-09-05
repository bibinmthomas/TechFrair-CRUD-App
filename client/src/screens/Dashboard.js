import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.login);

  useEffect(() => {
    if (userInfo == null) {
      navigate("/login");
    }
  }, [userInfo]);
  
  return <div>Dashboard</div>;
}

export default Dashboard;
