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
import DefaultLayout from "./Layoutcomponents/DefaultLayout/DefaultLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Company from "./pages/Adminpages/Company/Company";
import Taskupload from "./pages/Adminpages/TaskPage/Taskupload";
import ProjectUpload from "./pages/Adminpages/Projectpage/ProjectUpload";

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
        <Route path="/employee" element={<Employee />} />
        <Route path="/contractor" element={<Contractor />} />
        <Route path="/project" element={<Project />} />
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
