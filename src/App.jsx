import {Routes, Route, useLocation} from "react-router-dom";
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
import {useEffect, useState} from "react";
import Loader from "./common/Loader/Loader";
import Signup from "./pages/AuthPages/Signup";
import Dashboard from "./pages/Dashboard/Dashboard";
import Company from "./pages/Adminpages/Company/Company";
import Taskupload from "./pages/Adminpages/TaskPage/Taskupload";
import ProjectUpload from "./pages/Adminpages/Projectpage/ProjectUpload";
import Activeclient from "./pages/Adminpages/clientPage/Activeclient";
import Deadclient from "./pages/Adminpages/clientPage/Deadclient";
import Deactiveclient from "./pages/Adminpages/clientPage/Deactiveclient";
import ContractorInfo from "./pages/Adminpages/contractorpage/ContractorInfo";
import Employeeinfo from "./pages/Adminpages/employeepage/Employeeinfo";
import ActiveEmployee from "./pages/Adminpages/employeepage/ActiveEmployee";
import DeactiveEmployee from "./pages/Adminpages/employeepage/DeactiveEmployee";
import Activecontractor from "./pages/Adminpages/contractorpage/Activecontractor";
import InActivecontractor from "./pages/Adminpages/contractorpage/InActivecontractor";
import Activeproject from "./pages/Adminpages/Projectpage/Activeproject";
import Inactiveprojects from "./pages/Adminpages/Projectpage/Inactiveprojects";

const App = () => {
  const [loading, setLoading] = useState(true);
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {/* auth pages */}
        <Route index element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* auth pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Admin Pages */}
        <Route path="/company" element={<Company />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/client" element={<Client />} />
        <Route path="/active-client" element={<Activeclient />} />
        <Route path="/inactive-client" element={<Deactiveclient />} />
        <Route path="/dead-client" element={<Deadclient />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/active-employee" element={<ActiveEmployee />} />
        <Route path="/inactive-employee" element={<DeactiveEmployee />} />
        <Route path="/employee-info/:id" element={<Employeeinfo />} />
        <Route path="/contractor" element={<Contractor />} />
        <Route path="/active-contractor" element={<Activecontractor />} />
        <Route path="/inactive-contractor" element={<InActivecontractor />} />
        <Route path="/contractor/:id" element={<ContractorInfo />} />
        <Route path="/project" element={<Project />} />
        <Route path="/active-projects" element={<Activeproject />} />
        <Route path="/inactive-projects" element={<Inactiveprojects />} />
        <Route path="/project-upload" element={<ProjectUpload />} />
        <Route path="/task" element={<Task />} />
        <Route path="task-upload" element={<Taskupload />} />
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
