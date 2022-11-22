import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div>
      <img src="/images/sus-cat.jpg" alt="sus-cat" style={{ width: "640px", marginTop: "100px", marginBottom: "1rem", borderRadius: "15px" }}/>
      <h3 style={{color: "black"}}>You must be logged in to access this content!</h3>
      <h4>Redirecting in {count} seconds...</h4>
    </div>
  );
};

export default LoadingToRedirect;
