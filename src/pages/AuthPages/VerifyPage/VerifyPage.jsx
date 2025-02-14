import React from "react";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import "./verify.scss";
const VerifyPage = () => {
  return (
    <div>
      <div className="verify_container">
        <section className="verify_box">
          <div className="verify_gif"></div>

          <article className="verify">
            <h1> Your email has been verified</h1>
            <p>Your email address has been verified. please go on login page</p>
            <Button id="one">
              <Link to="/login">Go to Login</Link>
            </Button>
          </article>
        </section>
      </div>
    </div>
  );
};

export default VerifyPage;
