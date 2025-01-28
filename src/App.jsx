import React from "react";
import {Routes, Route} from "react-router-dom";
import Nopage from "./pages/ErrorPage/Nopage";
import Contractor from "./pages/Adminpages/contractorpage/Contractor";
import Admin from "./pages/Adminpages/Adminpage/Admin";
import Employee from "./pages/Adminpages/employeepage/Employee";
import Client from "./pages/Adminpages/clientPage/Client";
import Project from "./pages/Adminpages/Projectpage/Project";
import Task from "./pages/Adminpages/TaskPage/Task";
import Timesheet from "./pages/Adminpages/Timesheetpage/Timesheet";
import Designation from "./pages/Adminpages/masterPages/Designation";
import Department from "./pages/Adminpages/masterPages/Department";
import Roles from "./pages/Adminpages/masterPages/Roles";
import Login from "./pages/AuthPages/Login";

const App = () => {
  return (
    <>
      <Routes>
        {/* auth pages */}
        <Route index element={<Login />} />

        {/* auth pages */}

        {/* Admin Pages */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/client" element={<Client />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/contractor" element={<Contractor />} />
        <Route path="/project" element={<Project />} />
        <Route path="/task" element={<Task />} />
        <Route path="/timesheet" element={<Timesheet />} />
        <Route path="/master/designation" element={<Designation />} />
        <Route path="/master/department" element={<Department />} />
        <Route path="/master/roles" element={<Roles />} />
        {/* Admin pages */}

        <Route path="*" element={<Nopage />} />
      </Routes>
    </>
  );
};

export default App;
