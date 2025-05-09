import React, {useState} from "react";
import {Button, Container, Grid2, TextField} from "@mui/material";
import {
  ErrorOutline,
  Lock,
  LockOpen,
  ModeEditOutline,
  VerifiedUser,
} from "@mui/icons-material";
import profileimage from "../../../assets/commonIcon/profilepic.png";
import CardOne from "../../../common/cardOne/CardOne";
import TModal from "../../../common/Modal/TModal";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
const UserProfile = ({user}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="profile_card_wrapper">
        <div className="profile_card_box">
          <div className="profile_card_header">
            <img src={profileimage} alt="" />
            {/* header tags */}
            <div className="profile_header_tags">
              <img src={`${user?.Photo}`} alt="" srcset="" />
              <Button
                onClick={() => setIsOpen(!isOpen)}
                startIcon={<ModeEditOutline />}
                sx={{
                  background: "#6560f0",
                  padding: "8px 10px",
                  margin: "10px 10px",
                  color: "white",
                }}
              >
                Edit Profile
              </Button>
            </div>
            {/* header tags */}
          </div>
          {/* Profile Body */}
          <div className="profile_body">
            <div className="profile_body_head">
              <h1>
                {user?.FirstName} {user?.LastName}
              </h1>
            </div>

            <Grid2 container spacing={2}>
              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Email"}
                  paragraph={user?.Email}
                />
              </Grid2>
              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Role"}
                  paragraph={user?.Role}
                />
              </Grid2>
              <Grid2 size={{md: 12, lg: 4}}>
                {user?.Term && (
                  <CardOne
                    icon={user.Term ? <EmailOutlinedIcon /> : null}
                    title={user.Term ? "Term" : null}
                    paragraph={user.Term ? "true" : "false"}
                  />
                )}
              </Grid2>
              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Acitivity"}
                  paragraph={user.Activity ? "true" : "false"}
                />
              </Grid2>
              <Grid2 size={{md: 12, lg: 4}}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Block Status"}
                  paragraph={user.BlockStatus ? "unblock" : "blocked"}
                />
              </Grid2>
            </Grid2>
          </div>
          {/* Profile body */}
        </div>
      </div>

      {isOpen && (
        <TModal
          title={"Edit Profile"}
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Container>
            <Grid2 container spacing={2}>
              <Grid2 item xs={12} sm={6} md={4}>
                <TextField type="text" fullWidth />
              </Grid2>
              <Grid2 item xs={12} sm={6} md={4}>
                <TextField type="text" fullWidth />
              </Grid2>
            </Grid2>
          </Container>
        </TModal>
      )}
    </>
  );
};

export default UserProfile;
