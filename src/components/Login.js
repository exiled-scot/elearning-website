import React, { useState } from "react";
import Modal from "react-modal";
import PocketBase from "pocketbase";
import {
  authenticate,
  isAuthenticated,
  getToken,
  getUserId,
} from "../utils/auth.js";
import SocialSignUpComponent from "./SocialSignUpComponent";

Modal.setAppElement("#root");

const Login = ({ closeModal, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authData = await authenticate(email, password);
      onSuccess(); // Call onSuccess after successful login
      closeModal();
      window.location.reload();
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div>
      <Modal
        isOpen={true}
        onRequestClose={closeModal}
        contentLabel="Login Modal"
        style={{
          overlay: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            overflowX: "auto",
          },
          content: {
            maxWidth: "600px",
            width: "600px", // Set a fixed width
            height: "600px", // Set a fixed height
            position: "relative",
            zIndex: 1001,
            borderRadius: "20px",
            // Prevent resizing
            resize: "none",
            overflow: "auto", // Add scroll if content overflows
          },
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "10px",
            margin: "30px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "10px",
            rowGap: "1.5rem",
          }}
        >
          <label
            className="label"
            style={{ textAlign: "left", marginRight: "10px", width: "100px" }}
          >
            Email:{" "}
          </label>
          <div
            className="input-container"
            style={{ gridColumn: "2", margin: "5px 0" }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", marginRight: "10px" }}
            />
            {!emailIsValid && (
              <p className="red-text-alert">Invalid email address.</p>
            )}
          </div>
          <label
            className="label"
            style={{ textAlign: "left", marginRight: "10px", width: "100px" }}
          >
            Password:{" "}
          </label>
          <div
            className="input-container"
            style={{ gridColumn: "2", margin: "5px 0" }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", marginRight: "10px" }}
            />
            {!passwordIsValid && (
              <p className="red-text-alert">Invalid password.</p>
            )}
          </div>
          <div className="bottom-div">
            <div style={{ gridColumn: "1 / span 2", textAlign: "center" }}>
              <div style={{ padding: "20px" }}>
                <div style={{ padding: "10px" }}>
                  {error && <div style={{ color: "red" }}>{error}</div>}
                </div>
                <button type="submit" className="button-28">
                  Log In
                </button>
              </div>
              <SocialSignUpComponent />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Login;
