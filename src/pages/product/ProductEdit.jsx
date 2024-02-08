import { Box, Container, Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { toast } from "react-toastify";
import { update } from "../../api/Productapi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getFetchData } from "../../api/Productapi";

const ProductEdit = () => {
  const { id } = useParams();
  const [editId, setEditId] = useState("");
  const [field, setField] = useState({
    product_name: "",
    item_code: "",
    category: "",
    normal: false,
    Combo: false,
    gift: false,
    stack: "",
    key_features: "",
    product_img: "",
  });

  const [error, setError] = useState({
    product_name: false,
    item_code: false,
    category: false,
    normal: false,
    Combo: false,
    gift: false,
    key_features: false,
    product_img: false,
  });

  const currencies = [
    "Full HD",
    "Window Ac",
    "Single Door",
    "Cooker",
    "Home Theater",
  ];

  useEffect(() => {
    getEditData();
  }, []);

  // useEffect(() => {
  //   console.log(editData);
  // }, [editData]);

  useEffect(() => {
    setError((prev) => {
      return {
        ...prev,
        product_img: field.product_img ? true : false,
      };
    });
  }, [field?.product_img]);

  const getEditData = async () => {
    try {
      const { data } = await getFetchData(id);
      console.log(data);
      if (data) {
        setField((prev) => ({ ...prev, ...data }));
        setEditId(data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  var navigate = useNavigate();

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleFieldChange = async (event) => {
    const { name, value, checked, files } = event.target;

    if (name === "normal" || name === "Combo" || name === "gift") {
      setField((prev) => {
        // checkbox
        return {
          ...prev,
          [name]: checked,
        };
      });

      setError((prev) => {
        return {
          ...prev,
          [name]: checked,
        };
      });
    } else if (name === "product_img") {
      //files
      try {
        const binaryString = await toBase64(files[0]);
        setField((prev) => {
          return {
            ...prev,
            [name]: binaryString,
          };
        });
      } catch (error) {
        console.log("err", error);
      }
    } else {
      setField((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });

      setError((prev) => {
        return {
          ...prev,
          [name]: value ? false : true,
        };
      });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(field, "field");
    console.log(error, "error");
    setError({
      product_name: field.product_name ? false : true,
      item_code: field.item_code ? false : true,
      category: field.category ? false : true,
      normal: field.normal ? false : true,
      Combo: field.Combo ? false : true,
      gift: field.gift ? false : true,
      key_features: field.key_features ? false : true,
      product_img: field.product_img ? false : true,
    });

    if (
      error.product_name ||
      error.item_code ||
      error.category ||
      error.normal ||
      error.gift ||
      error.Combo ||
      error.product_img
    ) {
      try {
        const res = await update(field, editId);
        toast.success("Product Updated Successfully");

        setTimeout(() => {
          navigate("/product-page");
        }, 3000);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.warning("All Field Required");
    }
  };
  return (
    <Container>
      <Box sx={{ height: "100%" }}>
        <Grid container sx={{ marginTop: "30px" }}>
          <Grid item xs={12}>
            <Card sx={{ Width: "100%" }}>
              <CardContent>
                <h1>PRODUCT EDIT FORM</h1>
                <form onSubmit={handleFormSubmit}>
                  <Grid container sx={{ marginTop: "30px" }} spacing={2}>
                    <TextField
                      id="outlined-required"
                      label="id"
                      sx={{ display: "none" }}
                      name="id"
                      value={field?.id}
                      onChange={(e) => handleFieldChange(e)}
                    />
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-required"
                        label="Product Name"
                        fullWidth
                        name="product_name"
                        onChange={(e) => handleFieldChange(e)}
                        value={field?.product_name}
                        error={error.product_name}
                        helperText={
                          error.product_name ? "Product Name is Required" : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="outlined-required"
                        label="Item Code"
                        name="item_code"
                        fullWidth
                        value={field?.item_code}
                        onChange={(e) => handleFieldChange(e)}
                        error={error.item_code}
                        helperText={
                          error.item_code ? "Item Code is Required" : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-select-currency"
                        label="Category"
                        name="category"
                        value={field?.category}
                        fullWidth
                        onChange={(e) => handleFieldChange(e)}
                        error={error.category}
                        helperText={
                          error.category ? "Category is Required" : ""
                        }
                      >
                        {currencies.map((option, index) => (
                          <MenuItem key={index} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FormLabel
                          component="legend"
                          sx={{
                            width: "115px",
                            paddingTop: "5px",
                            paddingRight: "10px",
                          }}
                        >
                          Product Type :
                        </FormLabel>

                        <FormControlLabel
                          control={
                            <Checkbox
                              name="normal"
                              checked={field?.normal}
                              onChange={(e) => handleFieldChange(e)}
                            />
                          }
                          label="Normal"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="Combo"
                              checked={field?.Combo}
                              onChange={(e) => handleFieldChange(e)}
                            />
                          }
                          label="Combo"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="gift"
                              checked={field?.gift}
                              onChange={(e) => handleFieldChange(e)}
                            />
                          }
                          label="Gift"
                        />
                      </Box>
                      <p className="text-danger fw-bold">
                        {!error.Combo && !error.gift && !error.normal
                          ? "Product type is required"
                          : ""}
                      </p>
                    </Grid>
                    <Grid item md={6} xs={12} sx={{ display: "flex" }}>
                      <FormLabel
                        component="legend"
                        sx={{
                          width: "172px",
                          paddingTop: "8px",
                          paddingRight: "10px",
                        }}
                      >
                        Out of Stock Status :
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="stack"
                        value={field?.stack}
                        onChange={(e) => handleFieldChange(e)}
                      >
                        <Box sx={{ display: "flex" }}>
                          <FormControlLabel
                            value="Stock"
                            control={<Radio />}
                            label="Stock"
                          />
                          <FormControlLabel
                            value="Out Of Stock"
                            control={<Radio />}
                            label="Out Of Stock"
                          />
                        </Box>
                      </RadioGroup>
                    </Grid>
                    <Grid item xs={6}>
                      <FormLabel
                        component="legend"
                        sx={{
                          width: "172px",
                          paddingTop: "8px",
                          paddingRight: "10px",
                        }}
                      >
                        Product Image :
                      </FormLabel>
                      <Button variant="contained" component="label">
                        Upload File
                        <input
                          type="file"
                          hidden
                          name="product_img"
                          onChange={(e) => handleFieldChange(e)}
                        />
                      </Button>
                      <p className="text-danger">
                        {error.category ? "Product img is Required" : ""}
                      </p>
                      <img
                        src={field?.product_img}
                        style={{
                          width: "100px",
                          height: "100px",
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={12}>
                      <FormLabel
                        component="legend"
                        sx={{
                          width: "172px",
                          paddingTop: "8px",
                          paddingRight: "10px",
                        }}
                      >
                        Key Features
                      </FormLabel>
                      <TextField
                        name="key_features"
                        id="outlined-required"
                        label="Item Code"
                        rows={4}
                        multiline
                        fullWidth
                        value={field?.key_features}
                        onChange={(e) => handleFieldChange(e)}
                        error={error.key_features}
                        helperText={
                          error.key_features ? "Key features  is Required" : ""
                        }
                      ></TextField>
                    </Grid>
                    <Grid item xs={12} className="d-flex justify-content-end">
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          marginRight: "10px",
                        }}
                      >
                        Update
                      </Button>
                      <Link to={"/product-page"}>
                        <Button variant="contained" color="error">
                          Back
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ProductEdit;
