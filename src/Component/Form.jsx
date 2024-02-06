import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { create, update_api } from "../api/Userapi";
const Form = (props) => {
  const { open, getAllUser, edit_data, modal_open } = props;

  const [user_data, setUser_data] = useState({
    id: "",
    name: "",
    email: "",
    phone_number: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone_number: false,
    address: false,
  });

  useEffect(() => {
    if (edit_data) {
      modal_open();
      setUser_data((prev_data) => {
        return { ...prev_data, ...edit_data };
      });
    }
  }, [edit_data]);

  useEffect(() => {
    if (!open) {
      setUser_data({
        id: "",
        name: "",
        email: "",
        phone_number: "",
        address: "",
      });

      setErrors({
        name: false,
        email: false,
        phone_number: false,
        address: false,
      });
    }
  }, [open]);

  const handleClose = () => {
    props.handleClose();
  };

  const handleChange = (name, value) => {
    setUser_data((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validation logic
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value.trim() === "", // You can add more validation conditions here
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {
      name: !user_data.name.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user_data.email),
      phone_number: !user_data.name.trim(),
      address: !user_data.name.trim(),
    };
    // Update errors
    setErrors(newErrors);
    if (
      newErrors.name ||
      newErrors.email ||
      newErrors.phone_number ||
      newErrors.address
    ) {
      toast.warning("All fields are required");
    } else {
      if (user_data.id) {
        try {
          const res = await update_api(user_data, user_data.id);
          if (res) {
            toast.success("User form Updated Successfully");
            handleClose();
            getAllUser();
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          delete user_data.id;
          const { data } = await create(user_data);
          if (data) {
            console.log();
            toast.success("User form Submitted Successfully");
            handleClose();
            getAllUser();
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <>
      <React.Fragment>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          fullWidth={true}
          maxWidth={"md"}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {user_data?.id ? "User Edit Form" : "User Form"}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <form onSubmit={handleSubmit}>
            <DialogContent dividers>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    sx={{ display: "none" }}
                    value={user_data?.id}
                    onChange={(event) => handleChange("id", event.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Please Enter name"
                    variant="outlined"
                    value={user_data?.name}
                    onChange={(event) =>
                      handleChange("name", event.target.value)
                    }
                    error={errors.name}
                    helperText={errors.name && "Name is required"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Please Enter email"
                    variant="outlined"
                    onChange={(event) =>
                      handleChange("email", event.target.value)
                    }
                    value={user_data?.email}
                    error={errors.email}
                    helperText={errors.email && "Email is required"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Please Enter Phone Number"
                    variant="outlined"
                    onChange={(event) =>
                      handleChange("phone_number", event.target.value)
                    }
                    value={user_data?.phone_number}
                    error={errors.phone_number}
                    helperText={
                      errors.phone_number && "Phone number is required"
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Please Enter Address"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={user_data?.address}
                    onChange={(event) =>
                      handleChange("address", event.target.value)
                    }
                    error={errors.address}
                    helperText={errors.address && "Address is required"}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="error"
                autoFocus
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button variant="contained" type="submit" autoFocus>
                {user_data?.id ? "Update" : "Save"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    </>
  );
};

export default Form;
