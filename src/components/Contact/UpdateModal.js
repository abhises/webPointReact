import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import Alert from '@mui/material/Alert';
import axiosBase from '../../utils/axios';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

const UpdateModal = ({contact,setContact,showUpdateModal,update_id,toggleShowModal}) => {
    const [full_name,setFullName]=useState();
    const [email,setEmail]=useState();
    const [mobile_number,setMobileNumber]=useState();
    const [isLoading,setIsLoading]=useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit =()=>{
        axiosBase.put(`updateContact/${update_id.id}`, {full_name,email,mobile_number}).then(resp => {
            setIsLoading(true);
            if (resp.status===200) {
              setIsLoading(false);
      
              const updateContact = [...contact];
              const index = updateContact.findIndex(i=>i._id===resp.data.data.id)
              
              let {_id,full_name,email,mobile_number}=resp.data.data;
              const newall={
                _id:_id,
                full_name: full_name,
                email:email,
                mobile_number: mobile_number,
                
              }
              updateContact.splice(index,1,newall);
              setContact(updateContact);
              toggleShowModal();
              toast.success('Contact updated')
            }
          }).catch(errors => {
            console.log(errors);
            if (errors) {
                setIsLoading(false);
                setErrors(errors.response.data.error)
              }
      
          })
    }
  
    return (
    <div><div>  <Dialog
    open={showUpdateModal}
    keepMounted
    onClose={toggleShowModal}
    aria-describedby="alert-dialog-slide-email"
  >
    <DialogTitle>{"Update Service"}</DialogTitle>
    {isLoading?<Box style={{position: 'relative'}}>
       <CircularProgress
       size={40}
       left={-20}
       top={10}
       status={'loading'}
       style={{marginLeft: '50%'}}
       />
     </Box>:<>
      <DialogContent>
      <DialogContentText id="alert-dialog-slide-email">
      </DialogContentText>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > :not(style)': { m: 2 },
          }}
        >
          <FormControl>
            
            <TextField
             label="Name"               
             placeholder='Enter Full Name'
              id="demo-helper-text-aligned"
              value={full_name?full_name:update_id.full_name}
              onChange={(e)=>setFullName(e.target.value)}
            />

            {Object.keys(errors).includes('full_name') && <Alert severity="error">{errors.full_name}</Alert>}

            <br/>

            <TextField
               label="Email"               
              placeholder='Enter Email'
              id="demo-helper-text-aligned-no-helper"
              value={email?email:update_id.email}
              onChange={(e)=>setEmail(e.target.value)}

            />
            {Object.keys(errors).includes('email') && <Alert severity="error">{errors.email}</Alert>}

            <br/>
            <TextField
             placeholder='Enter Mobile Number'
             label="Mobile Number"
              id="demo-helper-text-aligned-no-helper"
              value={mobile_number?mobile_number:update_id.mobile_number}
              onChange={(e)=>setMobileNumber(e.target.value)}

            />
            {Object.keys(errors).includes('mobile_number') && <Alert severity="error">{errors.mobile_number}</Alert>}

            <br/>

           
          </FormControl>


        </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleSubmit}>Update</Button>
      <Button onClick={toggleShowModal}>Cancel</Button>
    </DialogActions>
    </>
    }
   
  </Dialog></div></div>
  )
}

export default UpdateModal