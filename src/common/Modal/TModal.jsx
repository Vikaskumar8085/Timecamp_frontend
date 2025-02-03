import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid rgba(0,0,0,0.1)",
  borderRadius: 2,
  boxShadow: 24,
  padding: 4,
};
const TModal = ({isModalOpen, setIsModalOpen, title, children}) => {
  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              marginBottom: "15px",
              textAlign: "center",
              fontWeight: "700",
              fontSize: "1em",
            }}
          >
            {title}
          </Typography>
          {children}
        </Box>
      </Modal>
    </>
  );
};
export default React.memo(TModal);
