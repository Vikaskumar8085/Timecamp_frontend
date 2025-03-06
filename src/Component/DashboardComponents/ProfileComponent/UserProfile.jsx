import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Switch,
  Button,
  Chip,
} from "@mui/material";
import {Lock, LockOpen, VerifiedUser, ErrorOutline} from "@mui/icons-material";

const UserProfile = ({user}) => {
  return (
    <Card sx={{maxWidth: 400, p: 2, borderRadius: 4, boxShadow: 3, mt: 2}}>
      <CardContent>
        {/* User Avatar */}
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar
              src={user.Photo}
              alt={user.FirstName}
              sx={{width: 80, height: 80}}
            />
          </Grid>
          <Grid item>
            <Typography variant="h6" fontWeight="bold">
              {user.FirstName} {user.LastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.Email}
            </Typography>
          </Grid>
        </Grid>

        {/* User Role */}
        <Chip
          label={user.Role}
          color={user.Role === "Admin" ? "primary" : "secondary"}
          sx={{mt: 2}}
        />

        {/* Verification Status */}
        <Grid container alignItems="center" spacing={1} sx={{mt: 2}}>
          <Grid item>
            {user.isVerify ? (
              <VerifiedUser color="success" />
            ) : (
              <ErrorOutline color="error" />
            )}
          </Grid>
          <Grid item>
            <Typography variant="body2">
              {user.isVerify ? "Verified" : "Not Verified"}
            </Typography>
          </Grid>
        </Grid>

        {/* Account Activity Toggle */}
        <Grid container alignItems="center" spacing={1} sx={{mt: 2}}>
          <Grid item>
            <Typography variant="body2">Active</Typography>
          </Grid>
          <Grid item>
            <Switch checked={user.Activity} color="success" />
          </Grid>
        </Grid>

        {/* Block Status */}
        <Grid container alignItems="center" spacing={1} sx={{mt: 2}}>
          <Grid item>
            {user.BlockStatus === "Unblock" ? (
              <LockOpen color="success" />
            ) : (
              <Lock color="error" />
            )}
          </Grid>
          <Grid item>
            <Typography variant="body2">
              {user.BlockStatus === "Unblock"
                ? "Account Unblocked"
                : "Account Blocked"}
            </Typography>
          </Grid>
        </Grid>

        {/* Terms & Conditions Agreement */}
        <Typography
          variant="body2"
          sx={{mt: 2, color: user.Term ? "green" : "red"}}
        >
          {user.Term ? "Accepted Terms & Conditions" : "Terms Not Accepted"}
        </Typography>

        {/* Action Buttons */}
        {/* <Grid container spacing={2} sx={{mt: 3}}>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="primary">
              Edit Profile
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="outlined" color="error">
              Logout
            </Button>
          </Grid>
        </Grid> */}
      </CardContent>
    </Card>
  );
};

export default UserProfile;
