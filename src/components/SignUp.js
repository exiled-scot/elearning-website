import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import PocketBase from "pocketbase";
import "../App.css";

Modal.setAppElement("#root");

const pb = new PocketBase("http://127.0.0.1:5002");

const SignUp = ({ closeModal, onSuccess }) => {
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [usernameIsValid, setUsernameIsValid] = useState(true);
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
      !usernameIsValid ||
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
        username,
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

  // Rest of the component

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
            height: "40%",
            position: "relative",
            zIndex: 1001,
            borderRadius: "20px",
          },
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            padding: "40px",
            margin: "40px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            columnGap: "10px",
            rowGap: "20px",
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
            Username:
          </label>
          <div
            className={`input-container ${isActive ? "is-active" : ""}`}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {!usernameIsValid && (
              <p className="red-text-alert">Invalid username.</p>
            )}
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
          {error && <p className="red-text-alert">{error}</p>}
          <button
            type="submit"
            className="button-28"
            style={{
              justifySelf: "center",
              marginTop: "20px",
              width: "150px",
              height: "50px",
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Register
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SignUp;
