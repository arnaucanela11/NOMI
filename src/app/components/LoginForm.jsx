"use client";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "../login/login.css";
import { LoginPost } from "../api/handlers";
import { useState } from "react";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("the email format is not correct")
    .required("required"),
  password: yup
    .string()
    .required("required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "La contraseña debe tener al menos 8 caracteres y contener letras mayúsculas, minúsculas y números"
    ),
});

const initailaState = {
  email: "",
  password: "",
};

function LoginForm() {
  const [error, setError] = useState(false);
  const loginSubmit = async (values, onSubmitProps) => {
    try {
      const { token, ok } = await LoginPost(values);
      if (!ok) {
        setError(true);
      } else {
        localStorage.setItem("token", token);
        onSubmitProps.resetForm();
        window.location = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      validationSchema={loginSchema}
      initialValues={initailaState}
      onSubmit={(values, onSubmitProps) => loginSubmit(values, onSubmitProps)}
    >
      {({ values, handleSubmit, handleBlur, handleChange }) => (
        <form onSubmit={handleSubmit} className="signup__form">
          <label
            htmlFor="email"
            className="flex row-auto justify-center items-center gap-4"
          >
            <Field
              name="email"
              type="text"
              className="email__field"
              placeholder="Email"
            />
            <ErrorMessage
              name="email"
              render={(msg) => (
                <span style={{ color: "blue" }}>
                  {msg.charAt(0).toUpperCase() + msg.slice(1)}
                </span>
              )}
            />
          </label>
          <label
            htmlFor="password"
            className="flex row-auto justify-center items-center gap-4"
          >
            <Field
              name="password"
              type="text"
              className="password__field"
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              render={(msg) => (
                <span style={{ color: "blue" }}>
                  {msg.charAt(0).toUpperCase() + msg.slice(1)}
                </span>
              )}
            />
          </label>
          <button type="submit" className="signup__button__submit">
            Login
          </button>
        </form>
      )}
    </Formik>
  );
}

export default LoginForm;
