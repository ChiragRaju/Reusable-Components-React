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
import { Button, Grid, Link } from "@mui/material";

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

const ProductCard = ({ apiEndpoints }) => {
  const [data, setData] = useState([]);
  const [showEmployeeData, setEmployeeData] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const employee = await axios.get(apiEndpoints[0]);
        const product = await axios.get(apiEndpoints[1]);

        const response1 = employee.data;
        const response2 = product.data;
        setData(showEmployeeData ? response1 : response2);
        console.log(showEmployeeData ? response1 : response2);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
    // handleDeleteEmployee();
  }, [apiEndpoints, showEmployeeData]);

  const toggleDataView = (isEmployeeData) => {
    setEmployeeData(isEmployeeData);
  };

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
              onClick={() => toggleDataView(true)}
            >
              Employee
            </Button>
          </Grid>

          <Grid style={{ marginLeft: "5px", marginBottom: "10px" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => toggleDataView(false)}
            >
              product
            </Button>
          </Grid>
        </Grid>

        <Table sx={{ minWidth: 400 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Id</StyledTableCell>
              {showEmployeeData ? (
                <>
                  <StyledTableCell>EmployeeName</StyledTableCell>
                  <StyledTableCell>Salary</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>PhoneNumber</StyledTableCell>
                </>
              ) : (
                <>
                  <StyledTableCell>Price </StyledTableCell>
                  <StyledTableCell>Category</StyledTableCell>
                </>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((user, index) => {
              return (
                <>
                  <StyledTableRow key={index}>
                    {showEmployeeData ? (
                      <>
                        <StyledTableCell component="th" scope="row">
                          {user.employeeId}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {user.employeeName}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {user.employeeSalary}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {user.email}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {user.phoneNumber}
                        </StyledTableCell>
                      </>
                    ) : (
                      <>
                        <StyledTableCell component="th" scope="row">
                          {user.id}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {user.price}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          {user.category}
                        </StyledTableCell>
                      </>
                    )}
                  </StyledTableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductCard;
