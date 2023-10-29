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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform client-side validation
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
    } else {
      alert("Success!"); // Placeholder for further action (e.g., API call)
      closeModal(); // Close the SignUp form
    }
  };

  const isValidEmail = (email) => {
    // Simple email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidFirstName = (firstName) => {
    // Validate if firstName is not empty and does not contain special characters
    return /^[A-Za-z\s]+$/.test(firstName);
  };

  const isValidPassword = (password) => {
    // Validate if password is at least 10 characters long and doesn't contain special characters
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{10,}$/;
    return passwordPattern.test(password);
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
            width: "400px",
            height: "300px",
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1001,
          },
        }}
      >
        <h2>Sign Up</h2>
        {!isValid && <p className="error-message">Please fill in all fields correctly.</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Retype Password"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
      </Modal>
    </div>
  );
};

export default SignUp;
