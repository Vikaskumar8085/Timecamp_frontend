import React from "react";
import {Grid2} from "@mui/material";
import bgImage from "../../../../assets/commonIcon/profilepic.png";
import moment from "moment";
import CardOne from "../../../../common/cardOne/CardOne";

const ProjectInformation = ({IsprojectInfodata}) => {
  return (
    <div>
      <div className="project_card_wrapper">
        <div className="project_card_wrapper_box">
          <div className="project_card_header">
            <img src={bgImage} alt="" srcset="" />
            <div className="project_header_tags">
              <img
                src={"https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="User avatar"
                loading="lazy"
              />
              <h1>{IsprojectInfodata.Project_Name}</h1>
              {/*<p>{IsprojectInfodata?.project_Address}</p> */}
            </div>
          </div>
          <div className="project_body">
            <Grid2 container spacing={2}>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"Project Name"}
                  paragraph={IsprojectInfodata?.Project_Name}
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"Project_Code "}
                  paragraph={IsprojectInfodata?.Project_Code}
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"Start Date"}
                  paragraph={moment(IsprojectInfodata?.Start_Date).format(
                    "DD/MM/YYYY"
                  )}
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"End Date"}
                  paragraph={moment(IsprojectInfodata?.End_Date).format(
                    "DD/MM/YYYY"
                  )}
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                  <CardOne
                    title={"Project_Type"}
                    paragraph={IsprojectInfodata?.Project_Type}
                  />
                </Grid2>
                <CardOne
                  title={"Project_Hours"}
                  paragraph={IsprojectInfodata?.Project_Hours}
                />
              </Grid2>
              <Grid2 size={{md: 6, lg: 6, sm: 12}}>
                <CardOne
                  title={"Project_Status"}
                  paragraph={
                    IsprojectInfodata?.Project_Status ? "Active" : "InActive"
                  }
                />
              </Grid2>
            </Grid2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;
