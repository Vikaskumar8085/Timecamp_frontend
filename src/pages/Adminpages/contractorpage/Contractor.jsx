import React, {useState} from "react";
import {Drawer, TextField} from "@mui/material";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {Button} from "@mui/material";
import {
  addContractorapicall,
  fetchcontractorapicall,
  updatecontractorapicall,
} from "../../../ApiServices/AdminApiServices/Contractor";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import AddIcon from "@mui/icons-material/Add";
import ContractorUploadForm from "../../../Component/AdminComponents/Contractor/ContractorUploadForm";
import ContractorTable from "../../../Component/AdminComponents/Contractor/ContractorTable";
import {uploadcontractorcsvapicall} from "../../../ApiServices/Csvapiservices/csvapiservices";
import ContractorForm from "../../../Component/AdminComponents/Contractor/ContractorForm";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";

const Contractor = () => {
  const [Iscontractordata, setIscontractordata] = useState([]);
  const [isUpload, setIsUpload] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const [IsEdit, setIsEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const dispatch = useDispatch();
  const getcontractor = async () => {
    try {
      const response = await fetchcontractorapicall({
        params: {
          search,
          page: page + 1,
          limit: rowsPerPage,
        },
      });
      if (response.success) {
        setIscontractordata(response.result);
        setTotalCount(response.totalCount || 0);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await addContractorapicall(value);
      if (response.success) {
        dispatch(setLoader(false));
        setIsOpen(false);
        getcontractor();
      } else {
        toast.error(response?.message || "Something went wrong.");
      }
    } catch (error) {
      dispatch(setLoader(false));
      setIsOpen(false);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const uploadcontractorcsvupload = async (value) => {
    try {
      const response = await uploadcontractorcsvapicall(value);
      alert("File uploaded successfully!");
      console.log(response.data);
      getcontractor();
      setIsUpload(false);
    } catch (error) {
      console.log(error?.message);
    }
  };

  const udpatecontractorfunc = async (value) => {
    try {
      const val = {
        id: IsEdit?.staff_Id,
        payload: value,
      };
      dispatch(setLoader(true));
      const response = await updatecontractorapicall(val);
      if (response?.success) {
        setIsOpen(false);
        setIsEdit(null);
        getcontractor();
        dispatch(setLoader(false));
        toast.success(response?.message);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast?.error(error?.response?.data?.message);
    }
  };

  React.useEffect(() => {
    getcontractor();
  }, [search, page, rowsPerPage]);
  return (
    <Layout>
      <BreadCrumb pageName="Contractor" />

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
        Add Contractor
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
        Upload Contractor
      </Button>

      {IsOpen && (
        <Drawer
          open={IsOpen}
          onClose={() => {
            setIsOpen(false), setIsEdit(null);
          }}
          anchor="right"
        >
          <ContractorForm
            udpatecontractorfunc={udpatecontractorfunc}
            IsEdit={IsEdit}
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
          <ContractorUploadForm
            setIsUpload={setIsUpload}
            uploadcontractorcsvupload={uploadcontractorcsvupload}
          />
        </Drawer>
      )}
      {/* table of contractor */}

      <ContractorTable
        setIsOpen={setIsOpen}
        setIsEdit={setIsEdit}
        Iscontractordata={Iscontractordata}
        setLoading={setLoading}
        loading={loading}
        setSearch={setSearch}
        search={search}
        setPage={setPage}
        page={page}
        setTotalCount={setTotalCount}
        totalCount={totalCount}
        setRowsPerPage={setRowsPerPage}
        rowsPerPage={rowsPerPage}
      />
    </Layout>
  );
};

export default Contractor;
