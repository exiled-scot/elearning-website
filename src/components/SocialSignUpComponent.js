import React, { useState, useEffect } from "react";

const SocialSignUpComponent = () => {
  return (
    <>
      <div
        className="center-text line-container"
        style={{ gridColumn: "1 / span 2", textAlign: "center" }}
      >
        Or continue with
      </div>
      <div
        className="center-text"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 2fr 1fr)",
          gridColumnGap: "10px",
          alignItems: "center",
        }}
      >
        <div className="icon-container"
          style={{
            padding: "15px",
          }}
        >
          <img
            className="icon"
            src="/assets/facebook.svg"
            onClick={() => (window.location.href = "/signup/facebook")}
            alt="Facebook"
            style={{ width: "100%", transition: "transform 0.3s", cursor: "pointer", }}
          />
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="/assets/google.svg"
            onClick={() => (window.location.href = "/signup/google")}
            alt="Google"
            style={{ width: "100%", transition: "transform 0.3s", cursor: "pointer", }}
          />
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="/assets/x-logo.svg"
            onClick={() => (window.location.href = "/signup/x")}
            alt="X"
            style={{ width: "100%", transition: "transform 0.3s", cursor: "pointer", }}
          />
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="/assets/apple.svg"
            onClick={() => (window.location.href = "/signup/apple")}
            alt="Apple"
            style={{ width: "100%", transition: "transform 0.3s", cursor: "pointer", }}
          />
        </div>
      </div>
      <div
        style={{
          gridColumn: "1 / span 2",
          textAlign: "center",
          marginTop: "5px",
        }}
      >
        By continuing, you confirm that you are an adult. By creating an
        account, you agree to the <a href="/privacy">eLearn Privacy Policy</a>
      </div>
    </>
  );
};

export default SocialSignUpComponent;
