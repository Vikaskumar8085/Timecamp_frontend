import React, {useEffect} from "react";
import {Button, Container} from "@mui/material";
import {useFormik} from "formik";
import {loginapicall} from "../../ApiServices/Authapiservices";
import {useGoogleLogin} from "@react-oauth/google";
import {useDispatch} from "react-redux";
import {setLoader} from "../../redux/LoaderSlices/LoaderSlices";
import {GoogleLoginAuth} from "../../ApiServices/UserApiServices/User";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";
const validate = (values) => {
  const errors = {};

  if (!values.Email) {
    errors.Email = "Email is required";
  }
  if (!values.Password) {
    errors.Password = "Password is required";
  } else if (values.Password.length < 6) {
    errors.Password = "Password must be at least 6 characters";
  }

  return errors;
};

const Login = () => {
  const dispatch = useDispatch();

  // at us.
  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        dispatch(setLoader(true));
        const response = await loginapicall(values);
        console.log(response, "login value");
        if (response.success) {
          dispatch(setLoader(false));
          window.location.href = response.redirectUrl;
          localStorage.setItem("token", JSON.stringify(response.token));
          toast.success(response.message);
          formik.resetForm();
        } else {
          dispatch(setLoader(false));
          toast.error(response.message);
          formik.resetForm();
        }
      } catch (error) {
        formik.resetForm();
        dispatch(setLoader(false));
        toast.error(error?.response?.data?.message || "something went wrong");
      }
    },
  });

  function redirectfunc() {
    if (localStorage.getItem("token")) {
      window.location.href = "/dashboard";
    }
  }

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      dispatch(setLoader(true));
      const response = await GoogleLoginAuth(tokenResponse);
      console.log(response, "afsdfasdfjlsadfj");
      if (response.success) {
        dispatch(setLoader(false));
        localStorage.setItem("token", JSON.stringify(response.result));
        window.location.href = response.redirectUrl;
      }
    },
  });

  useEffect(() => {
    redirectfunc();
  }, [0]);

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
            <br />
            <Link to="/signup">
              <strong>registration ?</strong>
            </Link>
            <br />
            <div className="mb-3">
              <Button onClick={() => login()}>google Login</Button>
            </div>
          </form>
        </Container>
      </div>
    </>
  );
};

export default Login;
