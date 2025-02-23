import React, { useEffect } from "react";
import TimesheetTable from "./ProjectTimesheetComp/TimesheetTable";

const ProjectTimesheet = ({ Isprojecttimesheetdata }) => {
  return (
    <div>
      <TimesheetTable data={Isprojecttimesheetdata} />
    </div>
  );
};

export default ProjectTimesheet;
