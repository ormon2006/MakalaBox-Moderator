import React, { useContext, useState } from "react";
import validator from "validator";
import "./IsLoggedIn.scss";
import box from "../../images/box.png";
import styled from "styled-components";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import openPassword from "../../images/openPassword.png";
import closePassword from "../../images/closePassword.svg";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const StyledSection = styled.section`
  padding: 10px 50px 50px 50px;
  background-color: #f5f5f5;
`;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const IsLoggedIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFilled, setIsFilled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const handleEmailFocus = () => {
    setEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setEmailFocused(false);
    if (email.trim() === "") {
      setEmailError("Введите адрес электронной почты");
    } else {
      validateEmail();
    }
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
    if (email.trim() === "") {
      setPasswordError("");
    } else {
      validatePassword();
    }
  };

  const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsFilled(e.target.value !== "" && password !== "");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsFilled(e.target.value !== "" && email !== "");
    validatePassword();
  };

  const validatePassword = () => {
    if (password.trim() === "") {
      setPasswordError("Введите пароль");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    if (email.trim() === "") {
      setEmailError("Введите адрес электронной почты");
      valid = false;
    }
    if (password.trim() === "") {
      setPasswordError("Введите пароль");
      valid = false;
    }
    if (email.trim() !== "" && password.trim() !== "" && !validator.isEmail(email)) {
      setEmailError("Вы не правильно ввели адрес электронной почты");
      valid = false;
    }
    if (valid) {
      setIsLoading(true);
      try {
        await store.login(email, password);
        navigate('/moderator-page', { state: { loginSuccess: true } });
      } catch (error) {
        setErrorMessage("Неправильный логин или пароль");
        setSnackbarMessage("Неправильный логин или пароль");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSnackbarMessage("Вы не правильно ввели данные");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const validateEmail = () => {
    if (!validator.isEmail(email)) {
      setEmailError("Вы не правильно ввели адрес электронной почты");
    } else {
      setEmailError("");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <main>
      <StyledSection>
        <section className="IsLoggedIn__section">
          <div className="container">
            <div className="IsLoggedIn__content">
              <img className="IsLoggedIn__logo" src={box} alt="" />
              <h3 className="IsLoggedIn__title">Вход в профиль</h3>
              <form onSubmit={handleSubmit}>
                <div
                  className={`IsLoggedIn__input-container ${
                    emailFocused || email ? "active" : ""
                  }`}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onFocus={handleEmailFocus}
                    onBlur={handleEmailBlur}
                  />
                  <label>Введите email</label>
                  {emailError && <p className="error-message">{emailError}</p>}
                </div>
                <div
                  className={`IsLoggedIn__input-container ${
                    passwordFocused || password ? "active" : ""
                  }`}
                >
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    onFocus={handlePasswordFocus}
                    onBlur={handlePasswordBlur}
                  />
                  <label>Введите пароль</label>
                  <button
                    type="button"
                    className="show-password-button"
                    onClick={toggleShowPassword}
                  >
                    <img
                      src={showPassword ? openPassword : closePassword}
                      alt={showPassword ? "Скрыть" : "Показать"}
                    />
                  </button>
                  {passwordError && (
                    <p className="error-message">{passwordError}</p>
                  )}
                </div>
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
                <div className="IsLoggedIn__btn">
                  <button
                    type="submit"
                    className={`IsLoggedIn__come ${isFilled ? "filled" : ""}`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Загрузка..." : "Войти"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </StyledSection>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </main>
  );
};

const LoggedInForm = observer(IsLoggedIn);
export default LoggedInForm;
