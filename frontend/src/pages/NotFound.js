import React from "react";

const NotFound = () => {
  return (
    <div>
      <img
        src="/images/404.jpg"
        alt="Not Found"
        style={{ marginTop: "100px", marginBottom: "1rem", borderRadius: "15px" }}
      />
      <h3 style={{color: "black"}}>Error 404: Page not found!</h3>
    </div>
  );
};

export default NotFound;
