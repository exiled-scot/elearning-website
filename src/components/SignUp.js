import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import PocketBase from "pocketbase";
import "../App.css";

Modal.setAppElement("#root");

const pb = new PocketBase("http://127.0.0.1:5002");

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
          gridTemplateColumns: "repeat(4, 1fr)",
          gridColumnGap: "10px",
          alignItems: "center",
        }}
      >
        <div className="icon-container">
          <img
            className="icon"
            src="/assets/facebook.svg"
            onClick={() => (window.location.href = "/signup/facebook")}
            alt="Facebook"
            style={{ width: "100%", transition: "transform 0.3s" }}
          />
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="/assets/google.svg"
            onClick={() => (window.location.href = "/signup/google")}
            alt="Google"
            style={{ width: "100%", transition: "transform 0.3s" }}
          />
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="/assets/x-logo.svg"
            onClick={() => (window.location.href = "/signup/x")}
            alt="X"
            style={{ width: "100%", transition: "transform 0.3s" }}
          />
        </div>
        <div className="icon-container">
          <img
            className="icon"
            src="/assets/apple.svg"
            onClick={() => (window.location.href = "/signup/apple")}
            alt="Apple"
            style={{ width: "100%", transition: "transform 0.3s" }}
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
            height: "45%",
            position: "relative",
            zIndex: 1001,
            borderRadius: "20px",
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
          {error && <p className="red-text-alert">{error}</p>}
          <div style={{ gridColumn: "1 / span 2", textAlign: "center" }}>
            <button type="submit" className="button-28">
              Register
            </button>
          </div>
          <SocialSignUpComponent />
        </form>
      </Modal>
    </div>
  );
};

export default SignUp;
