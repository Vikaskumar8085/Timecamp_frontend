import React, { useState } from "react";
import { Button, Container, Grid2 } from "@mui/material";
import { ModeEditOutline } from "@mui/icons-material";
import profileimage from "../../../assets/commonIcon/profilepic.png";
import CardOne from "../../../common/cardOne/CardOne";
import TModal from "../../../common/Modal/TModal";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Input from "../../../common/Input/Input";
import InputImageUpload from "../../../common/InputImageUpload/InputImageUpload";
const StaffProfile = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [IsEdit, setIsEdit] = useState(user);

  return (
    <div>
      {" "}
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
              <Grid2 size={{ md: 12, lg: 4 }}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"UserName"}
                  paragraph={user?.UserName}
                />
              </Grid2>
              <Grid2 size={{ md: 12, lg: 4 }}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"FirstName"}
                  paragraph={user?.FirstName}
                />
              </Grid2>
              <Grid2 size={{ md: 12, lg: 4 }}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"LastName"}
                  paragraph={user?.LastName}
                />
              </Grid2>
              <Grid2 size={{ md: 12, lg: 4 }}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Email"}
                  paragraph={user?.Email}
                />
              </Grid2>
              <Grid2 size={{ md: 12, lg: 4 }}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Address"}
                  paragraph={user?.Address}
                />
              </Grid2>
              <Grid2 size={{ md: 12, lg: 4 }}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Phone"}
                  paragraph={user?.Phone}
                />
              </Grid2>
              <Grid2 size={{ md: 12, lg: 4 }}>
                <CardOne
                  icon={<EmailOutlinedIcon />}
                  title={"Joining Date"}
                  paragraph={user?.Joining_Date}
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
          <Container maxWidth="md">
            <Grid2 container spacing={2}>
              <form>
                <Grid2 size={{ md: 12, sm: 12 }}></Grid2>
              </form>
            </Grid2>
          </Container>
        </TModal>
      )}
    </div>
  );
};

export default StaffProfile;
