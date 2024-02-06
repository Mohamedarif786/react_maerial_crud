import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { getall_data } from "../api/Userapi";
import Table from "../Component/User_Table";
import AddIcon from "@mui/icons-material/Add";
import Delete_modal from "../Component/Delete_modal";
import Form from "../Component/Form";

function Crud() {
  const [open, setOpen] = React.useState(false);
  const [user_data, setUser_data] = useState([]);
  const [edit_data, setEdit_data] = useState(null);
  const [delete_id, setDelete_id] = useState(null);
  const [delete_modal_open, setDelete_modal_open] = React.useState(false);

  useEffect(() => {}, [delete_modal_open]);

  useEffect(() => {
    getAllUser();
  }, []);

  useEffect(() => {
    console.log(edit_data);
  }, [edit_data]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const delete_model_Close = () => {
    setDelete_modal_open((prev) => !delete_modal_open);
  };

  const getAllUser = () => {
    getall_data().then(
      (res) => {
        // console.log(res);
        setUser_data(res.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const modal_open = () => {
    setOpen(true);
  };
  const fetch_value = (data) => {
    // console.log(data);
    setEdit_data(data);
  };

  const delete_val_set = (delete_id) => {
    setDelete_id(delete_id);
    delete_modal_open_f();
  };

  const delete_modal_open_f = () => {
    setDelete_modal_open((prev) => !delete_modal_open);
  };

  return (
    <>
      <Container fixed>
        <Box sx={{ height: "100%" }}>
          <Grid sx={{ marginTop: "20px" }}>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                variant="contained"
                onClick={handleClickOpen}
                startIcon={<AddIcon />}
              >
                Add User
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: "20px" }}>
              <Table
                user_data={user_data}
                fetch_value={fetch_value}
                delete_val_set={delete_val_set}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Form
        open={open}
        modal_open={modal_open}
        handleClose={handleClose}
        getAllUser={getAllUser}
        edit_data={edit_data}
      />
      <Delete_modal
        delete_id={delete_id}
        delete_model_Close={delete_model_Close}
        delete_modal_open={delete_modal_open}
        getAllUser={getAllUser}
      />
    </>
  );
}

export default Crud;
