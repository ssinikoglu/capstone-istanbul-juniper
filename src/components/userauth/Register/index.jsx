import { Alert, Button, Checkbox, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { validateEmail, createErrorClass } from "../registerHelper";
import ErrorMessage from "../ErrorMessage";

const MIN_PASSWORD_LENGTH = 6;

const Register = ({
  // check containers/LoginRegister/index.jsx to see details of functions
  onSubmit,
  handleLogin,
  handleFacebookAuth,
  handleGoogleAuth,
  // string
  error,
}) => {
  const [t] = useTranslation();
  const [registerInformation, setRegisterInformation] = useState({
    fullname: "",
    age: "",
    email: "",
    password: "",
    isAgreed: false,
  });
  const [errors, setErrors] = useState({});
  const [termsOpen, setTermsOpen] = useState(false);
  const handleChange = (key, value) => {
    const newValues = { ...registerInformation };
    newValues[key] = value;
    setRegisterInformation(newValues);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullname, email, age, password, isAgreed } = registerInformation;
    const newErrors = {};
    if (fullname.trim() === "") {
      newErrors.fullname = t("register.fullName");
    }
    if (email.trim() === "") {
      newErrors.email = t("register.validEmail");
    }
    if (age.trim() === "") {
      newErrors.age = t("register.age");
    }
    if (password.trim().length < MIN_PASSWORD_LENGTH) {
      newErrors.password = t("register.passwordCharacter");
    }
    if (password.trim() === "") {
      newErrors.password = t("register.enterPassword");
    }
    if (!validateEmail(email)) {
      newErrors.email = t("register.emailFormat");
    }
    if (!isAgreed) {
      newErrors.isAgreed = t("register.terms");
    }
    setErrors(errors);
    const errorNameArr = Object.keys(newErrors);
    if (errorNameArr.length > 0) {
      return;
    }
    onSubmit(registerInformation);
  };
  const handleOkTerms = () => {
    handleChange("isAgreed", true);
    setTermsOpen(false);
  };
  const handleCancelTerms = () => {
    setTermsOpen(false);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Modal
        title={t("register.termsTitle")}
        visible={termsOpen}
        onOk={handleOkTerms}
        onCancel={handleCancelTerms}
        footer={[
          <Button key="back" onClick={handleCancelTerms}>
            {t("register.close")}
          </Button>,
          <Button key="submit" type="primary" onClick={handleOkTerms}>
            {t("register.iAgree")}
          </Button>,
        ]}
      >
        <ul>
          <li>{t("register.terms1")}</li>
          <li>{t("register.terms2")} </li>
          <li>{t("register.terms3")} </li>
          <li>{t("register.terms4")} </li>
          <li>{t("register.terms5")} </li>
          <li>{t("register.terms6")} </li>
        </ul>
      </Modal>
      <div className="loginContainer">
        <div className="loginContainer__loginTitle">{t("register.creat")}</div>
        {error && (
          <Alert className="authAlert" type="error" showIcon message={error} />
        )}
        <div className="loginContainer__loginDialog">
          <div className="loginContainer__loginDialog__inputLabel">
            {t("register.name")}
          </div>
          <div className="loginContainer__loginDialog__input">
            <Input
              className={createErrorClass(errors.fullname)}
              value={registerInformation.fullname}
              onChange={(e) => {
                handleChange("fullname", e.target.value);
              }}
            />
            <ErrorMessage message={errors.fullname} />
          </div>
          <div className="loginContainer__loginDialog__inputLabel">
            {t("register.enterAge")}
          </div>
          <div className="loginContainer__loginDialog__input">
            <Input
              className={createErrorClass(errors.age)}
              type="number"
              value={registerInformation.age}
              onChange={(e) => {
                handleChange("age", e.target.value);
              }}
            />
            <ErrorMessage message={errors.age} />
          </div>
          <div className="loginContainer__loginDialog__inputLabel">
            {t("register.email")}
          </div>
          <div className="loginContainer__loginDialog__input">
            <Input
              className={createErrorClass(errors.email)}
              value={registerInformation.email}
              onChange={(e) => {
                handleChange("email", e.target.value);
              }}
            />
            <ErrorMessage message={errors.email} />
          </div>
          <div className="loginContainer__loginDialog__inputLabel">
            {t("register.password")}
          </div>
          <div className="loginContainer__loginDialog__input">
            <Input
              className={createErrorClass(errors.password)}
              type="password"
              value={registerInformation.password}
              onChange={(e) => {
                handleChange("password", e.target.value);
              }}
            />
            <ErrorMessage message={errors.password} />
          </div>
          <div className="loginContainer__loginDialog__input">
            <Checkbox
              checked={registerInformation.isAgreed}
              onChange={(e) => {
                handleChange("isAgreed", e.target.checked);
              }}
            >
              {t("register.iAgreeTo")}
              <Button
                type="link"
                onClick={(e) => {
                  e.preventDefault();
                  setTermsOpen(true);
                }}
              >
                {t("register.termsAndConditions")}
              </Button>
            </Checkbox>
            <ErrorMessage message={errors.isAgreed} />
          </div>
          <button
            type="submit"
            className="loginContainer__loginDialog__submitButton"
          >
            {t("register.creatAccount")}
          </button>
          <div className="loginContainer__loginDialog__registerLabel">
            {t("register.alreadyAMember")}
          </div>
          <button
            onClick={handleLogin}
            type="button"
            className="loginContainer__loginDialog__registerButton"
          >
            {t("register.login")}
          </button>
          <div className="loginContainer__loginDialog__loginOptionsTitle">
            {t("register.orYouCan")}
          </div>
          <button
            onClick={handleFacebookAuth}
            type="button"
            className="loginContainer__loginDialog__facebookLoginBtn"
          >
            {t("register.withFacebook")}
          </button>
          <button
            onClick={handleGoogleAuth}
            type="button"
            className="loginContainer__loginDialog__googleLoginBtn"
          >
            {t("register.withGoogle")}
          </button>
        </div>
      </div>
    </form>
  );
};
export default Register;