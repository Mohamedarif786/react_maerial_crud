import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { edit_api } from "../api/Userapi";

const User_Table = (props) => {
  const { user_data, fetch_value, delete_val_set } = props;

  const edit_data = async (id) => {
    try {
      const { data } = await edit_api(id);
      if (data) {
        fetch_value(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone Number</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user_data.map((row, index) => (
            <TableRow key={row.id + row.name}>
              <TableCell>{index + 1}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.phone_number}</TableCell>
              <TableCell align="left">{row.address}</TableCell>
              <TableCell align="left">
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<EditIcon />}
                  sx={{ marginRight: "10px" }}
                  onClick={() => edit_data(row.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => delete_val_set(row.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default User_Table;
