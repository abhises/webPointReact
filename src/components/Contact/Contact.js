import React,{useState,useEffect} from 'react'
import {Table,TableHead,TableRow,TableBody,TableContainer,TableCell, Button} from '@mui/material';
import axiosBase from '../../utils/axios';
import { Pagination } from '@mui/material';
import CreateContact from './CreateContact';
import { useToggle } from '../../hooks/useToggle';
import {AiFillDelete} from "react-icons/ai"
import {GrDocumentUpdate} from "react-icons/gr"
import DeleteContact from './DeleteContact';
import UpdateModal from './UpdateModal';



const Contact = () => {
    const [contact,setContact]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [show,toggle,setShow]=useToggle();
    const [showDeleteModal,setShowDeleteModal]=useState(false);
    const [delete_id,setDeleteId]=useState();
    const toggleDeleteModal =()=>setShowDeleteModal(!showDeleteModal);
    const [showUpdateModal,setShowUpdateModal]=useState(false);
    const toggleShowModal =()=>setShowUpdateModal(!showUpdateModal);
    const [update_id,setUpdateId]=useState([]);
    const [searchQuery, setSearchQuery] = useState('');



    useEffect(()=>{
        axiosBase(`/getAllContact?page=${currentPage}&search=${searchQuery}`).then(resp=>{
            if(resp.status===200){
                setContact(resp.data.data.data)
                setCurrentPage(resp.data.data.current_page)
                setTotalPages(resp.data.data.last_page)
            }
        })


    },[currentPage,searchQuery])

    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };

    const showCreate =()=>{
      setShow(true);
    }

    const deleteContact=(id)=>{
      setShowDeleteModal(true);
      setDeleteId(id)

    }

    const updateContact=(row)=>{
      setUpdateId(row);
      setShowUpdateModal(true);

    }
    const handleSearch = (event) => {
      setSearchQuery(event.target.value);
    };

  return (
    <div>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Button onClick={showCreate}>Create Contact</Button>
    <div>
      <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search..."  style={{
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        outline: 'none',
        fontSize: '14px',
      }}/>
    </div>
  </div>
      {show?<CreateContact contact={contact} setContact={setContact} show={show} toggle={toggle}/>:null}
      {showDeleteModal?<DeleteContact toggleDeleteModal={toggleDeleteModal}
     delete_id={delete_id}
     contact={contact}
     setContact={setContact}
      showDeleteModal={showDeleteModal} />:null}

    { showUpdateModal?<UpdateModal  contact={contact}
     setContact={setContact}
     showUpdateModal={showUpdateModal}
      toggleShowModal={toggleShowModal}
      update_id={update_id}
      />:null}
     
<TableContainer style={{marginTop:20}}>
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
              <TableCell>
             <Button><AiFillDelete onClick={(e)=>deleteContact(row.id)} style={{fontSize:'1.4rem',cursor:'pointer'}} title="Delete"/></Button>
             <Button><GrDocumentUpdate onClick={(e)=>updateContact(row)} style={{fontSize:'1.4rem',cursor:'pointer'}} title="Update"/></Button>

           </TableCell>
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