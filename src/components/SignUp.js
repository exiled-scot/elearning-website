import React, { useState } from "react";
import Modal from 'react-modal';
import "./SignUp.css";

Modal.setAppElement('#root');

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
  const [isActive, setIsActive] = useState(false); // Added state for is-active

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
    setIsActive(true); // Activate is-active on button click
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
            width: "30%",
            height: "50%",
            position: "relative",
            zIndex: 1001,
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className={`input-container ${isActive ? "is-active" : ""}`}>
            <label className="label" style={{textAlign: 'right', marginRight: '10px'}}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!emailIsValid && (
              <p className="red-text-alert">Invalid email address.</p>
            )}
          </div>
          <div className="input-container" style={{display: 'flex', alignItems: 'center'}}>
            <label className="label" style={{textAlign: 'right', marginRight: '10px'}}>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {!firstNameIsValid && (
              <p className="red-text-alert">Invalid first name.</p>
            )}
          </div>
          <div className="input-container" style={{display: 'flex', alignItems: 'center'}}>
            <label className="label" style={{textAlign: 'right', marginRight: '10px'}}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!passwordIsValid && (
              <p className="red-text-alert">Invalid password.</p>
            )}
          </div>
          <div className="input-container" style={{display: 'flex', alignItems: 'center'}}>
            <label className="label" style={{textAlign: 'right', marginRight: '10px'}}>Retype Password</label>
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
            style={{color: 'black'}}
            className={isActive ? "is-active" : ""} // Apply is-active class
            onClick={handleButtonClick} // Handle button click
          >
            Register
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SignUp;
