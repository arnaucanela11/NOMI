"use client";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "../signup/signup.css";
import { poppins } from "../layout";
import { SignupPost } from "../api/handlers";
import { useState } from "react";

const signupSchema = yup.object().shape({
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "The password is not equal")
    .required(),
});

const initailaState = {
  email: "",
  password: "",
  confirmPassword: "",
};

function SignupForm() {
  const [error, setError] = useState(false)
  const signupSubmit = async (values, onSubmitProps) => {
    // try {
    //   const {user ,token} = await Signup(values)
    //   localStorage.setItem('access_token', token)
    //   onSubmitProps.resetForm()
    //   window.location = '/'
    // } catch (error) {
    //   console.log(error)
    // }
    const { ok } = await SignupPost(values);
    if (ok) {
      localStorage.setItem("token", token);
      onSubmitProps.resetForm();
      window.location.href = "/";
    }
    else {
      setError(true)
    }
  };

  return (
    <Formik
      validationSchema={signupSchema}
      initialValues={initailaState}
      onSubmit={(values, onSubmitProps) => signupSubmit(values, onSubmitProps)}
    >
      {({ values, handleSubmit, handleBlur, handleChange }) => (
        <form onSubmit={handleSubmit} className="signup__form">
          <label
            htmlFor="email"
            className="flex flex-col justify-center items-center gap-4"
          >
            <span className={`${poppins.className} text-[#EDEDED]`}>Email</span>
            <Field
              name="email"
              type="text"
              className="email__field"
              placeholder="Your email"
            />
            <ErrorMessage
              name="email"
              render={(msg) => (
                <span style={{ color: "#8FE5E5" }}>
                  {msg.charAt(0).toUpperCase() + msg.slice(1)}
                </span>
              )}
            />
          </label>
          <label
            htmlFor="password"
            className="flex flex-col justify-center items-center gap-4"
          >
            <span className={`${poppins.className} text-[#EDEDED]`}>
              Password
            </span>
            <Field
              name="password"
              type="text"
              className="password__field"
              placeholder="Password"
            />
            <ErrorMessage
              name="password"
              render={(msg) => (
                <span style={{ color: "#8FE5E5" }}>
                  {msg.charAt(0).toUpperCase() + msg.slice(1)}
                </span>
              )}
            />
          </label>
          <label
            htmlFor="confirmPassword"
            className="flex flex-col justify-center items-center gap-4"
          >
            <span className={`${poppins.className} text-[#EDEDED]`}>
              Confirm Password
            </span>
            <Field
              name="confirmPassword"
              type="text"
              className="password__field"
              placeholder="Confirm Password"
            />
            <ErrorMessage
              name="confirmPassword"
              render={(msg) => (
                <span style={{ color: "#8FE5E5" }}>
                  {msg.charAt(0).toUpperCase() + msg.slice(1)}
                </span>
              )}
            />
          </label>
          <button
            type="submit"
            className={`signup__button__submit ${poppins.className}`}
          >
            Sign Up
          </button>
        </form>
      )}
    </Formik>
  );
}

export default SignupForm;
