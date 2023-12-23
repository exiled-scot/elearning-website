import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import PocketBase from "pocketbase";
import "../App.css";
import SocialSignUpComponent from "./SocialSignUpComponent";

Modal.setAppElement("#root");

const pb = new PocketBase("http://127.0.0.1:5002");

const SignUp = ({ closeModal, onSuccess }) => {
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [NameIsValid, setNameIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [passwordConfirmIsValid, setPasswordConfirmIsValid] = useState(true);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setPasswordMismatch(password !== passwordConfirm);
  }, [password, passwordConfirm]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !emailIsValid ||
      !NameIsValid ||
      !passwordIsValid ||
      !passwordConfirmIsValid
    ) {
      return;
    }

    if (passwordMismatch) {
      setError("Passwords do not match.");
      return;
    }

    setPasswordMismatch(false);
    try {
      const data = {
        email,
        name,
        emailVisibility: true,
        password,
        passwordConfirm,
      };

      await pb.collection("users").create(data);
      onSuccess();
      closeModal();
    } catch (err) {
      setError("There was an error");
    }
  };

  return (
    <div>
      <Modal
        isOpen={true}
        onRequestClose={closeModal}
        contentLabel="Sign Up Modal"
        style={{
          overlay: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          },
          content: {
            width: "40%",
            minHeight: "45%", // Set a minimum height
            maxHeight: "80%", // Set a maximum height to allow for content growth
            position: "relative",
            zIndex: 1001,
            borderRadius: "20px", // Set the corner radius value here
            display: "flex",
            flexDirection: "column", // Ensure internal structure allows the footer to stay at the bottom
            justifyContent: "space-between", // Distribute space evenly
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
            style={{ textAlign: "left", marginRight: "10px" }}
          >
            Email:
          </label>
          <div
            className={`input-container ${isActive ? "is-active" : ""}`}
            style={{ gridColumn: "2", margin: "5px 0" }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {!emailIsValid && (
              <p className="red-text-alert">Invalid email address.</p>
            )}
          </div>
          <label
            className="label"
            style={{ textAlign: "left", marginRight: "10px" }}
          >
            Name:
          </label>
          <div
            className={`input-container ${isActive ? "is-active" : ""}`}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {!NameIsValid && <p className="red-text-alert">Invalid name.</p>}
          </div>
          <label
            className="label"
            style={{ textAlign: "left", marginRight: "10px" }}
          >
            Password:
          </label>
          <div
            className={`input-container ${isActive ? "is-active" : ""}`}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!passwordIsValid && (
              <p className="red-text-alert">Invalid password.</p>
            )}
          </div>
          <label
            className="label"
            style={{ textAlign: "left", marginRight: "10px" }}
          >
            Confirm Password:
          </label>
          <div
            className={`input-container ${isActive ? "is-active" : ""}`}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            {!passwordConfirmIsValid && (
              <p className="red-text-alert">Passwords do not match.</p>
            )}
          </div>
          <div style={{ padding: "10px" }}>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>
          <div className="bottom-div">
            <div style={{ gridColumn: "1 / span 2", textAlign: "center" }}>
              <div style={{ padding: "20px" }}>
                <button type="submit" className="button-28">
                  Register
                </button>
              </div>
            </div>
            <SocialSignUpComponent />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SignUp;
