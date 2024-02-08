import { Box, Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getall_data } from "../../api/Productapi";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NoImage from "../../assets/images/free-no-image-1771002-1505134.png";
import ProdDelete from "./ProdDelete";

function ProdIndex() {
  const [productListTable, setProductListTable] = useState([]);
  const [delete_id, setDelete_id] = useState(null);
  const [delete_modal_open, setDelete_modal_open] = React.useState(false);
  useEffect(() => {
    productList();
  }, []);

  const productList = async () => {
    try {
      const { data } = await getall_data();
      if (data) {
        console.log(data);
        setProductListTable(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const delete_val_set = (delete_id) => {
    setDelete_id(delete_id);
    delete_modal_open_f();
  };

  const delete_modal_open_f = () => {
    setDelete_modal_open((prev) => !delete_modal_open);
  };

  const delete_model_Close = () => {
    setDelete_modal_open((prev) => !delete_modal_open);
  };
  return (
    <>
      <Container fixed>
        <Box sx={{ height: "100%" }}>
          <Grid sx={{ marginTop: "20px" }}>
            <Grid item xs={12} className="d-flex justify-content-end ">
              <Link to={"/product-page/add"}>
                <Button variant="contained" color="primary">
                  Add Product
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} className="mt-5">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">ID</TableCell>
                      <TableCell align="left">Product Name</TableCell>
                      <TableCell align="left">Item code</TableCell>
                      <TableCell align="left">Category</TableCell>
                      <TableCell align="left">Stock</TableCell>
                      <TableCell align="left">Product Image</TableCell>
                      <TableCell align="left">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productListTable.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">{row.product_name}</TableCell>
                        <TableCell align="left">{row.item_code}</TableCell>
                        <TableCell align="left">{row.category}</TableCell>
                        <TableCell align="left">{row.stack}</TableCell>
                        <TableCell align="left">
                          <img
                            src={row.product_img ? row.product_img : NoImage}
                            style={{ width: "50px", height: "50px" }}
                          />
                        </TableCell>
                        <TableCell>
                          <TableCell align="left">
                            <Link to={`/product-edit/${row.id}`}>
                              <Button
                                variant="contained"
                                color="success"
                                startIcon={<EditIcon />}
                                sx={{ marginRight: "10px" }}
                              >
                                Edit
                              </Button>
                            </Link>
                            <Button
                              variant="contained"
                              color="error"
                              startIcon={<DeleteIcon />}
                              onClick={() => delete_val_set(row.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <ProdDelete
        delete_id={delete_id}
        delete_model_Close={delete_model_Close}
        delete_modal_open={delete_modal_open}
        productList={productList}
      />
    </>
  );
}

export default ProdIndex;
