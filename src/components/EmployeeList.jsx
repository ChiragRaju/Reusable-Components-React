import React from 'react'
import { useState,useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import  { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Button,Link} from '@mui/material';

//this is for first task just to fetch not reusable

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const btnstyle={margin:'8px 0',padding: '10px 20px',width:'25%'}

function EmployeeList() {
    const [employeeData, setEmployeeData] = useState([]);
    
    
  
   
    const getData=() => {
      axios.get('https://localhost:7190/api/Employee/List') 
      .then((response) => {
        if (response.status === 200) {
          setEmployeeData(response.data);
          console.log(employeeData);
        
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });}

        useEffect(() => {
          getData();
         
        }, []);
       
      
        const handleDeleteEmployee = (employeeId) => {
          axios
            .delete(`https://localhost:7190/api/Employee/Delete/${employeeId}`)
            .then((response) => {
              if (response.status === 200) {
                getData(); 
              }
            })
            .catch((error) => {
              console.error('Error deleting employee:', error);
            });
        };
      
       
  
  
    return (
      <div style={{ height: 400, width: '100%'}}>
        <TableContainer component={Paper}>
        
            <Link href="/">
            <Button type='submit' color='primary' variant="contained"   style={btnstyle} >Create</Button>
        </Link>
        
        <Table sx={{ minWidth: 400 }} aria-label="customized table">
        <TableHead>
           
       
          <TableRow>
         
          <StyledTableCell>Id</StyledTableCell>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell>Salary</StyledTableCell>
          <StyledTableCell>Email</StyledTableCell>
          <StyledTableCell>PhoneNumber</StyledTableCell>
          <StyledTableCell>Action</StyledTableCell>
       
             </TableRow>
        </TableHead>
        <TableBody>
        
         
          {employeeData.map(user=>
          {
              return(
                <>
                 <StyledTableRow key={user.employeeId}>
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
              <StyledTableCell component="th" scope="row">
                   
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteEmployee(user.employeeId)}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
          
  </StyledTableRow>
                </>
               
              )
            })
            }
          
        </TableBody>
      </Table>
    </TableContainer>
   
       
      </div>
  )
}

export default EmployeeList