import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import { delete_api } from "../../api/Productapi";

const ProdDelete = (props) => {
  const { delete_modal_open, delete_model_Close, delete_id, productList } =
    props;
  const delete_f = async () => {
    try {
      const { data } = await delete_api(delete_id);
      if (data) {
        toast.success("Deleted Successfully");
        productList();
        delete_model_Close();
      }
    } catch (error) {}
  };
  return (
    <>
      <React.Fragment>
        <Dialog
          onClose={delete_model_Close}
          aria-labelledby="customized-dialog-title"
          open={delete_modal_open}
          fullWidth={true}
          maxWidth={"sm"}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Delete Modal
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={delete_model_Close}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <h3 className="text-center">
              Are you sure you want to delete this?
            </h3>
            <div className="d-flex justify-content-center">
              <Button
                variant="contained"
                color="success"
                sx={{ marginRight: "10px" }}
                onClick={delete_f}
              >
                Yes
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={delete_model_Close}
              >
                No
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default ProdDelete;
