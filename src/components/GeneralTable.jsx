import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import { Button, Grid } from "@mui/material";

//matrial ui styles
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const GeneralTable = ({ apiEndpoints }) => {
  const [data, setData] = useState([]);
  const [selectData, setSelectData] = useState("employees");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiEndpoints[selectData]);

        if (selectData === "employees") {
          //Use this for getting particular fields from api
          /*  const employeeData = response.data.map((employee) => ({
                    employeeId: employee.employeeId,
                    employeeName: employee.employeeName,
                    employeeSalary: employee.employeeSalary,
                    email: employee.email,
                    phoneNumber: employee.phoneNumber,
                  }));*/
          const employeeData = response.data;
          setData(employeeData);
        } else if (selectData === "product") {
          const productData = response.data.map((product) => ({
            id: product.id,
            price: product.price,
            category: product.category,
            description: product.description,
          }));
          setData(productData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [apiEndpoints, selectData]);
  console.log(data);

  const toggleDataView = (dataKey) => {
    setSelectData(dataKey);
  };

  const Headers = {
    employees: [
      "employeeId",
      "employeeName",
      "employeeSalary",
      "email",
      "phoneNumber",
    ],
    product: ["id", "price", "category", "description"],
  };

  const currentHeaders = Headers[selectData];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <TableContainer component={Paper}>
        <Grid
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Grid style={{ marginRight: "10px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => toggleDataView("employees")}
            >
              Employee
            </Button>
          </Grid>

          {console.log("My api ", data)}
          <Grid style={{ marginLeft: "5px", marginBottom: "10px" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => toggleDataView("product")}
            >
              product
            </Button>
          </Grid>
        </Grid>

        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {currentHeaders.map((Header) => (
                <StyledTableCell key={Header}> {Header}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((item, index) => (
              <StyledTableRow key={index}>
                {currentHeaders?.map((Header) => (
                  <StyledTableCell key={Header}>{item[Header]}</StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GeneralTable;
