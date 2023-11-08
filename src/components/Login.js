import React, { useState } from "react";
import Modal from 'react-modal';
import "./SignUp.css";

Modal.setAppElement('#root');

const Login = ({ closeModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      email === "" ||
      password === "" ||
      !isValidEmail(email) ||
      !isValidPassword(password)
    ) {
      setIsValid(false);
      setEmailIsValid(!isValidEmail(email));
      setPasswordIsValid(!isValidPassword(password));
    } else {
      alert("Success!");
      closeModal();
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password) => {
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{10,}$/;
    return passwordPattern.test(password);
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
          },
          content: {
            width: "30%",
            height: "40%",
            position: "relative",
            zIndex: 1001,
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="input-container">
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
          <div className="input-container">
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
          <button
            type="submit"
            style={{color: 'black'}}
          >
            Log in
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Login;
