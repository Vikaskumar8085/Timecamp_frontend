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
  Box,
} from "@mui/material";
import {
  Lock,
  LockOpen,
  VerifiedUser,
  ErrorOutline,
  Delete,
  Edit,
} from "@mui/icons-material";

const UserList = ({users}) => {
  return (
    <Box
      sx={{display: "flex", flexWrap: "wrap", justifyContent: "start"}}
      gap={3}
      gridTemplateColumns="repeat(auto-fit, minmax(320px, 1fr))"
      p={3}
    >
      {users.map((user) => (
        <Card
          key={user._id}
          sx={{
            p: 2,
            borderRadius: 4,
            boxShadow: 3,
          }}
        >
          <CardContent>
            {/* User Avatar and Name */}
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

            {/* Role */}
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

            {/* Activity Toggle */}
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
                  {user.BlockStatus === "Unblock" ? "Unblocked" : "Blocked"}
                </Typography>
              </Grid>
            </Grid>

            {/* Terms Agreement */}
            <Typography
              variant="body2"
              sx={{mt: 2, color: user.Term ? "green" : "red"}}
            >
              {user.Term ? "Accepted Terms & Conditions" : "Terms Not Accepted"}
            </Typography>

            {/* Action Buttons */}

            {user?.IsAdmin === false && (
              <Grid container spacing={2} sx={{mt: 3}}>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    // startIcon={<Delete />}
                  >
                    block
                  </Button>
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default UserList;
