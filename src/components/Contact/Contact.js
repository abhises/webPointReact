import React,{useState,useEffect} from 'react'
import {Table,TableHead,TableRow,TableBody,TableContainer,TableCell} from '@mui/material';
import {} from '@mui/material';
import axiosBase from '../../utils/axios';
import { Pagination } from '@mui/material';


const Contact = () => {
    const[contact,setContact]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [totalPages, setTotalPages] = useState(0);


    useEffect(()=>{
        axiosBase(`/getAllContact?page=${currentPage}`).then(resp=>{
            console.log(resp.data.data.last_page)
            if(resp.status===200){
                setContact(resp.data.data.data)
                setCurrentPage(resp.data.data.current_page)
                setTotalPages(resp.data.data.last_page)
            }
        })


    },[currentPage])
    console.log(currentPage);
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };

  return (
    <div>Contact

<TableContainer >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell >Email</TableCell>
            <TableCell>Mobile Number</TableCell>
            <TableCell >Action</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {contact.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              <TableCell >{row.full_name}</TableCell>
              <TableCell >{row.email}</TableCell>
              <TableCell >{row.mobile_number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />

        
    </div>
  )
}

export default Contact