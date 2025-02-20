import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TabComp from "../../common/TabComponent/TabComp";

const EmployeeProjectinfo = () => {
  const { id } = useParams();
  const [isSubState, setisSubState] = useState(0);

  const tabsheader = [
    { title: "Employee Project Info" },
    { title: "Employee TimeSheet" },
    { title: "Employee Task" },
  ];
  const Tabsbody = [
    {
      content: <></>,
    },
    {
      content: <></>,
    },
    {
      content: <></>,
    },
  ];
  return (
    <div>
      <TabComp
        Tabsheader={tabsheader}
        TabsBody={Tabsbody}
        isSubState={isSubState}
        setisSubState={setisSubState}
      />
    </div>
  );
};

export default EmployeeProjectinfo;
