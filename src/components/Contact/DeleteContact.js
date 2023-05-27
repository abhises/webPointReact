import React from 'react'
import {  toast } from 'react-toastify';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axiosBase from '../../utils/axios';

const DeleteContact = ({showDeleteModal,toggleDeleteModal,delete_id,contact,setContact}) => {
    const confirmDelete =()=>{
        axiosBase.delete(`deleteContact/${delete_id}/`).then(resp=>{
            console.log(resp.data.message);
            if(resp.status===200){
              const newList =contact.filter(key=>key.id !==delete_id);
              setContact(newList);
              toggleDeleteModal();
              toast.error("Contact deleted Successfully")
            }
          })
    }
    return (  
    <div><Dialog
    open={showDeleteModal}
    onClose={toggleDeleteModal}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"Delete Contact alert"}
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure want to delete
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={confirmDelete}>Confirm</Button>
      <Button onClick={toggleDeleteModal} autoFocus>
        Cancel
      </Button>
    </DialogActions>
  </Dialog></div>
  )
}

export default DeleteContact