// import React from "react";
// import {useState} from "react";
// import {
//   Menu,
//   ChevronDown,
//   Users,
//   Clock,
//   Briefcase,
//   LayoutDashboard,
//   List,
//   User,
//   FileText,
//   Settings,
//   NotebookTabs,
// } from "lucide-react";
// import "./Dashboard.css"; // Import the external CSS file

// export default function DefaultLayout() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [clientsOpen, setClientsOpen] = useState(false);
//   const [employeesOpen, setEmployeesOpen] = useState(false);
//   const [modalOpen, setModalOpen] = useState(false); // State for Modal

//   return (
//     <>
//       <div className="dashboard-container">
//         <div className={`menu-button ${isOpen ? "menu-open" : ""}`}>
//           <button onClick={() => setIsOpen(!isOpen)}>
//             <Menu className="icon" />
//           </button>
//         </div>

//         <div className={`sidebar ${isOpen ? "open" : ""}`}>
//           <div className="sidebar-header">
//             <LayoutDashboard className="icon dashboard-icon" />
//             <span>Dashboard</span>
//           </div>
//           <nav className="nav">
//             <div
//               className="nav-item"
//               onClick={() => setClientsOpen(!clientsOpen)}
//             >
//               <Users className="icon" />
//               <span>Clients</span>
//               <ChevronDown className={`icon ${clientsOpen ? "rotated" : ""}`} />
//             </div>
//             {clientsOpen && (
//               <div className="submenu">
//                 <p>All Clients</p>
//                 <p className="inactive">Active Clients</p>
//                 <p className="inactive">Inactive Clients</p>
//                 <p className="inactive">Dead Clients</p>
//               </div>
//             )}
//             <div className="nav-item">
//               <Clock className="icon" />
//               <span>Timesheets</span>
//             </div>
//             <div
//               className="nav-item"
//               onClick={() => setEmployeesOpen(!employeesOpen)}
//             >
//               <User className="icon" />
//               <span>Employees</span>
//               <ChevronDown
//                 className={`icon ${employeesOpen ? "rotated" : ""}`}
//               />
//             </div>
//             {employeesOpen && (
//               <div className="submenu">
//                 <p>Employee List</p>
//                 <p>Roles</p>
//               </div>
//             )}
//             <div className="nav-item">
//               <Briefcase className="icon" />
//               <span>Projects</span>
//             </div>
//             <div className="nav-item">
//               <List className="icon" />
//               <span>Tasks</span>
//             </div>
//             <div className="nav-item">
//               <FileText className="icon" />
//               <span>Contractors</span>
//             </div>
//             <div className="nav-item">
//               <Settings className="icon" />
//               <span>Admins</span>
//             </div>
//             <div className="nav-item">
//               <NotebookTabs className="icon" />
//               <span>Accounts</span>
//             </div>
//           </nav>
//         </div>

//         <div className={`content ${isOpen ? "shifted" : ""}`}>
//           <h1 className="content-title">Welcome to the Dashboard</h1>
//           <p className="content-para">Your content goes here...</p>

//           {/* Open Modal Button */}
//           <section className="section-custom">
//             <button
//               className="open-modal-btn"
//               onClick={() => setModalOpen(true)}
//             >
//               Add client
//             </button>
//           </section>
//         </div>

//         {/* Modal */}
//         {modalOpen && (
//           <div className="modal-overlay" onClick={() => setModalOpen(false)}>
//             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//               <label className="name">Name</label>
//               <input
//                 className="input"
//                 type="text"
//                 placeholder="Enter Your Name"
//               />
//               <button
//                 className="close-modal-btn"
//                 onClick={() => setModalOpen(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

import React from "react";

const DefaultLayout = ({children}) => {
  return (
    <>
      <div className="Layout_Wrapper">{children}</div>
    </>
  );
};

export default DefaultLayout;
