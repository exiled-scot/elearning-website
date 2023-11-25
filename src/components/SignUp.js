import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const SignUp = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [firstNameIsValid, setFirstNameIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [retypePasswordIsValid, setRetypePasswordIsValid] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      email === "" ||
      firstName === "" ||
      password === "" ||
      retypePassword === "" ||
      password !== retypePassword ||
      !isValidEmail(email) ||
      !isValidFirstName(firstName) ||
      !isValidPassword(password)
    ) {
      setIsValid(false);
      setEmailIsValid(!isValidEmail(email));
      setFirstNameIsValid(!isValidFirstName(firstName));
      setPasswordIsValid(!isValidPassword(password));
      setRetypePasswordIsValid(password !== retypePassword);
    } else {
      alert("Success!");
      closeModal();
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidFirstName = (firstName) => {
    return /^[A-Za-z\s]+$/.test(firstName);
  };

  const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{10,}$/;
    return passwordPattern.test(password);
  };

  const handleButtonClick = () => {
    setIsActive(true);
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
            height: "40%", // Modified as per the request
            position: "relative",
            zIndex: 1001,
            borderRadius: "20px", // Set the corner radius value here
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
            rowGap: "20px"
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
            First Name:
          </label>
          <div
            className={`input-container ${isActive ? "is-active" : ""}`}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {!firstNameIsValid && (
              <p className="red-text-alert">Invalid first name.</p>
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
            />
            {!passwordIsValid && (
              <p className="red-text-alert">Invalid password.</p>
            )}
          </div>
          <label
            className="label"
            style={{ textAlign: "left", marginRight: "10px" }}
          >
            Retype Password:
          </label>
          <div
            className={`input-container ${isActive ? "is-active" : ""}`}
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
            />
            {!retypePasswordIsValid && (
              <p className="red-text-alert">Passwords do not match.</p>
            )}
          </div>
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
            Register:
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SignUp;
