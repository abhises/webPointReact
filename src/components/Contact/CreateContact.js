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
import axiosBase from '../../utils/axios';
import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
const CreateContact = ({contact,setContact,show,toggle}) => {

  const [full_name,setFullName]=useState('');
  const [email,setEmail]=useState("");
  const [mobile_number,setMobileNumber]=useState('');
  const [isLoading,setIsLoading]=useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    axiosBase.post('createContact', { full_name, email,mobile_number }).then(resp => {
      console.log(resp.data);
      setIsLoading(true);
      if (resp.status===201) {
        setIsLoading(false);

        let {full_name,email,mobile_number}=resp.data.data;
        const newContact = [...contact, {
         
          full_name: full_name,
          email:email,
          mobile_number:mobile_number,
         

        }]
        setContact(newContact);
        toast.success('Contact created successfully')
        toggle();
      }
    }).catch(errors => {
      // console.log(errors.response.data.error);
      if (errors) {
        setIsLoading(false);
        setErrors(errors.response.data.error)
      }

    })
  }
  return (
    <div><Dialog
    open={show}
    keepMounted
    onClose={toggle}
    aria-describedby="alert-dialog-slide-email"
  >
    <DialogTitle>{"Create Contact"}</DialogTitle>
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
              label="Full Name"               
              placeholder='Enter full_name'
              id="demo-helper-text-aligned"
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
            />
              {Object.keys(errors).includes('full_name') && <Alert severity="error">{errors.full_name}</Alert>}
            <br/>
            <TextField
              label="Email"               
              placeholder='Enter email'
              id="demo-helper-text-aligned-no-helper"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
              {Object.keys(errors).includes('email') && <Alert severity="error">{errors.email}</Alert>}

            <br/>
            
             <br/>
            <TextField
              placeholder='Enter Mobile Number'
              label="Mobile Number"
              id="demo-helper-text-aligned-no-helper"
              value={mobile_number}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              type="tel"
              inputMode="numeric"
              pattern="[0-9]{10,15}" // Modify the pattern based on your validation requirements
              helperText="Please enter a valid mobile number"
              error={Boolean(errors.mobile_number)}
            />
            {Object.keys(errors).includes('mobile_number') && <Alert severity="error">{errors.mobile_number}</Alert>}

          </FormControl>


        </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleSubmit}>Create</Button>
      <Button onClick={toggle}>Cancel</Button>
    </DialogActions>
    </>
    }
   
  </Dialog></div>
  )
}

export default CreateContact