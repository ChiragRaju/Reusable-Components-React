import { React, useEffect, useState } from "react";
import { Grid, Paper, Avatar, TextField, Button, Link } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TableCell from "@mui/material/TableCell";
import { tableCellClasses } from "@mui/material/TableCell";

import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import NavBar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";

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

const paperStyle = {
  padding: 20,
  height: "80vh",
  width: "25vw",
  margin: "20px auto",
  marginTop: "10px",
  margginBottom: "50px",
};
const avatarStyle = { backgroundColor: "#007aff" };
const btnstyle = { margin: "8px 0" };

function EmployeeForm() {
  const [employee, setEmployee] = useState({
    employeeName: "",
    employeeSalary: "",
    email: "",
    phoneNumber: "",
  });

  const [employeeData, setEmployeeData] = useState([]);

  const getData = () => {
    axios
      .get("https://localhost:7190/api/Employee/List") //this is fetching from backend api endpoint i created.
      .then((response) => {
        if (response.status === 200) {
          setEmployeeData(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  /* const handleDeleteEmployee = (employeeId) => {
      axios
        .delete(`https://localhost:7190/api/Employee/Delete/${employeeId}`)
        .then((response) => {
          if (response.status === 200) {
            getData(); 
            toast.success("deleted employee",{autoClose:500})
          }
        })
        .catch((error) => {
          console.error('Error deleting employee:', error);
        });
    };*/

  const diffToast = () => {
    toast.success("Details Submitted Succesfully", {
      position: "top-right",
      autoClose: 1000,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://localhost:7190/api/Employee/Create", employee) //this is Posting from backend api endpoint i created.
      .then((response) => {
        if (response.status === 200) {
          console.log(response.body);
          diffToast();
          setInterval(() => {
            window.location.href = "/Lists";
          }, 1000);
          getData();
        } else if (response.status === 404) {
          toast.error("Employee not found");
        }
      })
      .catch((err) => {
        toast.error("Error posting data", {
          position: "top-right",
        });
        console.error("Error posting data:", err);
      });
  };

  return (
    <>
      <NavBar />
      <Grid>
        <form onSubmit={handleSubmit}>
          <Paper elevation={20} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                {" "}
                <AssignmentIcon />
              </Avatar>
              <h4>EMPLOYEE FORM</h4>
            </Grid>
            <TextField
              label="Name"
              name="employeeName"
              value={employee.employeeName}
              placeholder="Enter Name"
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              style={{ marginTop: 20 + "px" }}
              label=" Salary"
              name="employeeSalary"
              value={employee.employeeSalary}
              placeholder="Enter Salary"
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              style={{ marginTop: 20 + "px" }}
              label="email"
              name="email"
              value={employee.email}
              placeholder="Enter Email"
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              style={{ marginTop: 20 + "px" }}
              label="PhoneNumber"
              name="phoneNumber"
              value={employee.phoneNumber}
              placeholder="Enter PhoneNumber"
              onChange={handleChange}
              fullWidth
              required
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              Submit
            </Button>

            <ToastContainer />
          </Paper>
        </form>
      </Grid>
    </>
  );
}

export default EmployeeForm;
