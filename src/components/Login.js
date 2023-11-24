import React, { useState } from "react";
import Modal from 'react-modal';

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
            width: "20%",
            height: "40%",
            position: "relative",
            zIndex: 1001,
          },
        }}
      >

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '10px', rowGap: '20px' }}>
          <label className="label" style={{ textAlign: 'left', marginRight: '10px', width: '100px' }}>Email: </label>
          <div className="input-container" style={{ gridColumn: '2', margin: '5px 0' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', marginRight: '10px' }}
            />
            {!emailIsValid && (
              <p className="red-text-alert">Invalid email address.</p>
            )}
          </div>
          <label className="label" style={{ textAlign: 'left', marginRight: '10px', width: '100px' }}>Password: </label>
          <div className="input-container" style={{ gridColumn: '2', margin: '5px 0' }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', marginRight: '10px' }}
            />
            {!passwordIsValid && (
              <p className="red-text-alert">Invalid password.</p>
            )}
          </div>
          <button
            type="submit"
            style={{
              color: 'black',
              justifySelf: 'end',
              marginTop: '20px',
              width: '150px',
              height: '50px',
              position: 'absolute',
              bottom: 10,
              right: 10,
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
