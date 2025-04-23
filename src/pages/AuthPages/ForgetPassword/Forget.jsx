import React, {useState} from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  Grid2,
} from "@mui/material";
import apiInstance from "../../../ApiInstance/apiInstance";
import timecamplogo from "../../../assets/auth/Screenshot from 2025-04-22 17-26-29.png";

const Forget = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    // Mock API request
    let val = {Email: email};
    try {
      const response = await apiInstance.post("/v1/user/forget-password", val);
      console.log(response, "response");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess("If this email is registered, a reset link has been sent.");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className="forget_password_container">
        <div className="forget_password_bg_logo">
          <img src={timecamplogo} alt="no-image" srcset="" />
        </div>
        <div className="forget_password_box">
          <Grid2 container spacing={2}>
            <Grid2 size={{md: 12, lg: 6}}>
              <div className="forget_password_left_side">
                <Container maxWidth="sm">
                  <Box sx={{mt: 8, textAlign: "center"}}>
                    <Typography variant="h5" gutterBottom>
                      Forgot Password
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Enter your email address and we'll send you a link to
                      reset your password.
                    </Typography>
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">{success}</Alert>}
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{mt: 2}}
                        fullWidth
                      >
                        Send Reset Link
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </div>
            </Grid2>
            <Grid2
              size={{md: 12, lg: 6}}
              sx={{
                backgroundColor: "#f7f8f9",
                display: {
                  xs: "none",
                  sm: "none",
                  md: "none",
                  lg: "block", // or 'flex' depending on layout
                },
              }}
            >
              <div className="forget_password_right_side">
                <div className="forget_password_right_side_box">
                  <h6>Start managing your task faster & better!</h6>
                </div>
                <div className="forget_password_right_side_img">
                  <img src={""} alt="" srcset="" />
                </div>
              </div>
            </Grid2>
          </Grid2>
        </div>
      </div>
    </>
  );
};

export default Forget;
