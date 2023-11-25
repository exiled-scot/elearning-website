import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

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
            width: "40%", // Modified as per the request
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
            rowGap: "20px",
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
            Log in
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Login;
