import React, {useEffect, useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Button, Drawer} from "@mui/material";
import ClientForm from "../../../Component/AdminComponents/Client/ClientForm";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ClientTable from "../../../Component/AdminComponents/Client/ClientTable";
import {
  createclientapicall,
  fetchclientapicall,
  removeclientapicall,
  updateclientapicall,
} from "../../../ApiServices/AdminApiServices/Client";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import AddIcon from "@mui/icons-material/Add";
import ClientUploadForm from "../../../Component/AdminComponents/Client/ClientUploadForm";
import {uploadclientcsvapicall} from "../../../ApiServices/Csvapiservices/csvapiservices";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import toast from "react-hot-toast";

const Client = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [Isclientdata, setIsclientdata] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const dispatch = useDispatch();
  // fetch client

  const fetchclientfucntion = async () => {
    try {
      const response = await fetchclientapicall();
      console.log(response, "client");

      if (response.success) {
        setIsclientdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleSubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await createclientapicall(value);
      if (response.success) {
        setIsOpen(false);
        fetchclientfucntion();
        dispatch(setLoader(false));
      } else {
        console.log(response.message);
        dispatch(setLoader(false));
      }
    } catch (error) {
      console.log(error?.message);
      dispatch(setLoader(false));
    }
  };

  const uploadclientcsvhandlesubmit = async (value) => {
    try {
      const response = await uploadclientcsvapicall(value);
      alert("File uploaded successfully!");
      console.log(response.data);
      fetchclientfucntion();
      setIsUpload(false);
    } catch (error) {
      console.log(error?.message);
    }
  };

  // delete client
  const handleUpdate = async (value) => {
    try {
      let val = {
        id: isEdit.Client_Id,
        payload: value,
      };

      dispatch(setLoader(true));
      const response = await updateclientapicall(val);
      if (response.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);
        setIsEdit(null);
        fetchclientfucntion();
        setIsOpen(false);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
        setIsEdit(null);
        setIsOpen(false);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };

  const removeclientfunc = async (value) => {
    try {
      console.log(value, ">>>>>>>>>");
      dispatch(setLoader(true));
      const response = await removeclientapicall(value);
      if (response?.success) {
        dispatch(setLoader(false));
        fetchclientfucntion();
        toast.success(response?.message);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };

  const handleOpen = async (value) => {
    setIsEdit(value);
    setIsOpen(true);
  };

  useEffect(() => {
    fetchclientfucntion();
  }, [0]);

  return (
    <Layout>
      <BreadCrumb pageName="Client" />
      <Button
        onClick={() => setIsOpen(true)}
        startIcon={<AddIcon />}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 0px",
          color: "white",
        }}
      >
        Add Client
      </Button>

      <Button
        onClick={() => setIsUpload(true)}
        startIcon={<FileUploadIcon />}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
      >
        Upload Client
      </Button>
      {IsOpen && (
        <Drawer open={IsOpen} onClose={() => setIsOpen(false)} anchor="right">
          <ClientForm
            isEdit={isEdit}
            handleUpdate={handleUpdate}
            handleSubmit={handleSubmit}
          />
        </Drawer>
      )}
      {isUpload && (
        <Drawer
          open={isUpload}
          onClose={() => setIsUpload(false)}
          anchor="right"
        >
          <ClientUploadForm
            uploadclientcsvhandlesubmit={uploadclientcsvhandlesubmit}
          />
        </Drawer>
      )}
      <ClientTable
        removeclientfunc={removeclientfunc}
        handleOpen={handleOpen}
        Isclientdata={Isclientdata}
      />
    </Layout>
  );
};

export default Client;
