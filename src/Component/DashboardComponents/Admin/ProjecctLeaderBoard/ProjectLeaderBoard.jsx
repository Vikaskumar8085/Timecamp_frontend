import Grid2 from "@mui/material/Grid2";
import React from "react";

const ProjectLeaderBoard = () => {
  let value = 35;
  return (
    <>
      <div className="project_leaderboard_wrapper">
        <div className="title">
          <h1>Project Decision Maker Leaderboard</h1>
          <p>Grack project and resource productivity in real-time</p>
        </div>
        <Grid2 container spacing={2}>
          <Grid2 size={{ sm: 6, md: 4, lg: 4, xs: 12 }}>
            <div
              style={{
                background:
                  value > 40
                    ? "orange"
                    : value > 30
                    ? "yellow"
                    : value > 20
                    ? "green"
                    : "transparent",
              }}
              className="project_leaderboard_card"
            >
              <div className="project_leaderboard_card_title">
                <h1>Project Leaderboard</h1>
                <p>Grack project and resource productivity in real-time</p>
              </div>
              <div className="project_leaderboard_card_content">
                <h1>Project Leaderboard</h1>
                <p>Grack project and resource productivity in real-time</p>
              </div>
            </div>
          </Grid2>

          <Grid2 size={{ sm: 6, md: 4, lg: 4, xs: 12 }}>
            <div className="project_leaderboard_card">
              <div className="project_leaderboard_card_title">
                <h1>Project Leaderboard</h1>
                <p>Grack project and resource productivity in real-time</p>
              </div>
              <div className="project_leaderboard_card_content">
                <h1>Project Leaderboard</h1>
                <p>Grack project and resource productivity in real-time</p>
              </div>
            </div>
          </Grid2>
        </Grid2>
      </div>
    </>
  );
};

export default ProjectLeaderBoard;
