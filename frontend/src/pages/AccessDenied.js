import React from "react";

const AccessDenied = () => {
  return (
    <div>
      <img
        src="/images/angry-husky.jpg"
        alt="Access denied"
        style={{
          marginTop: "100px",
          marginBottom: "1rem",
          borderRadius: "15px",
        }}
      />
      <h3 style={{ color: "black" }}>Error: access denied!</h3>
    </div>
  );
};

export default AccessDenied;
