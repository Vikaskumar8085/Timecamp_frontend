import React from "react";
import Card from "../../common/Card/Card";
import Breadcrumb from "../../common/BreadCrumb/BreadCrumb";
import {Container} from "@mui/material";
import DefaultLayout from "../../Layoutcomponents/DefaultLayout/DefaultLayout";
import {useFormik} from "formik";

const validate = (values) => {
  const errors = {};

  if (!values.Email) {
    errors.Email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.Email)) {
    errors.Email = "Email address is invalid";
  }

  if (!values.Password) {
    errors.Password = "Password is required";
  } else if (values.Password.length < 6) {
    errors.Password = "Password must be at least 6 characters";
  }

  return errors;
};

const Login = () => {
  // at us.
  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <div className="login_wrapper">
        <Container>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Email">Email</label>
              <input
                type="text"
                id="Email"
                {...formik.getFieldProps("Email")}
              />
              <p style={{color: "red"}}>
                {formik.touched.Email && formik.errors.Email ? (
                  <div>{formik.errors.Email}</div>
                ) : null}
              </p>
            </div>
            <div className="mb-3">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                id="Password"
                {...formik.getFieldProps("Password")}
              />
              <p style={{color: "red"}}>
                {formik.touched.Password && formik.errors.Password ? (
                  <div>{formik.errors.Password}</div>
                ) : null}
              </p>
            </div>
            <div className="mb-3">
              <button type="submit">Submit</button>
            </div>
          </form>
        </Container>
      </div>
    </>
  );
};

export default Login;
