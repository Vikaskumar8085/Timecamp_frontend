import React, {useEffect, useState} from "react";
import {Button, Drawer} from "@mui/material";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import ProjectForm from "../../../Component/AdminComponents/Project/ProjectForm";
import UploadProjectForm from "../../../Component/AdminComponents/Project/UploadProjectForm";
import AddIcons from "@mui/icons-material/Add";
import {
  createprojectapicall,
  fetchprojectapicall,
} from "../../../ApiServices/ProjectApiServices";
import {useDispatch, useSelector} from "react-redux";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ProjectTable from "../../../Component/AdminComponents/Project/ProjectTable";
import ProjectUploadForm from "../../../Component/AdminComponents/Project/ProjectUploadForm";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import toast from "react-hot-toast";
import {uploadprojectcsvapicall} from "../../../ApiServices/Csvapiservices/csvapiservices";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";

const Project = () => {
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectdata, setIsProjectdata] = useState([]);
  const [IsProjectUploadModelOpen, setIsProjectUploadModelOpen] =
    useState(false);
  const [IsEdit, setIsEdit] = useState(null);
  const dispatch = useDispatch();
  // project data
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  // project data

  const handleSubmit = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await createprojectapicall(values);
      console.log();
      if (response.success) {
        setIsModalOpen(false);
        toast.success(response?.message);
        getProjectapicall();
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
      }
    } catch (error) {
      console.log(error?.message);
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
    }
  };

  const getProjectapicall = async () => {
    try {
      setLoading(true);
      const response = await fetchprojectapicall({
        params: {search, page, limit},
      });
      if (response.success) {
        setIsProjectdata(response.result || []);
        setTotalPages(response.totalPages || 1);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadhandlesubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await uploadprojectcsvapicall(value);
      if (response.success) {
        dispatch(setLoader(false));
        getProjectapicall();
        setIsProjectUploadModelOpen(false);
        toast.success(response.message);
      } else {
        dispatch(setLoader(false));
        setIsProjectUploadModelOpen(false);
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setIsProjectUploadModelOpen(false);
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    getProjectapicall();
  }, [page, search, limit]);

  return (
    <LayoutDesign>
      <BreadCrumb pageName="Projects" />
      <Button
        onClick={() => {
          setIsModalOpen(true);
          setIsEdit(null);
        }}
        startIcon={<AddIcons />}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 0px",
          color: "white",
        }}
      >
        Add Project
      </Button>
      <Button
        onClick={() => setIsProjectUploadModelOpen(true)}
        startIcon={<FileUploadIcon />}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
      >
        Upload Projects
      </Button>

      {isModalOpen ? (
        <Drawer
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setIsEdit(null);
          }}
          anchor="right"
        >
          <ProjectForm IsEdit={IsEdit} handleSubmit={handleSubmit} />
        </Drawer>
      ) : null}

      {IsProjectUploadModelOpen ? (
        <Drawer
          open={IsProjectUploadModelOpen}
          onClose={() => setIsProjectUploadModelOpen(false)}
          anchor="right"
        >
          <ProjectUploadForm
            setIsProjectUploadModelOpen={setIsProjectUploadModelOpen}
            uploadhandlesubmit={uploadhandlesubmit}
          />
        </Drawer>
      ) : null}

      <ProjectTable
        setIsModalOpen={setIsModalOpen}
        setIsEdit={setIsEdit}
        isProjectdata={isProjectdata}
        setSearch={setSearch}
        search={search}
        setPage={setPage}
        page={page}
        setLimit={setLimit}
        limit={limit}
        loading={loading}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
      />
    </LayoutDesign>
  );
};

export default Project;
