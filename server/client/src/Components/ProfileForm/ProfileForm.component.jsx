import React  from 'react';
import Buttons from '../Button/Buttons.component';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';

import './ProfileForm.style.css';

function ProfileForm(props) {   
    console.log(props.user); 
    console.log(props.user.email); 

    return (
        <div className='profile'>
        <Box
        
        component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '200px' },
         backgroundColor: 'white'
      }}
      noValidate
      autoComplete="off"
    >
        <h3>MY PROFILE</h3>
        <div className='avatar'>
            <Avatar
            alt={props.user.userName}
            src={props.user.avatar}
            sx={{ width: 56, height: 56 }}
            />
        </div>
            <div className='form'>
            <TextField
             id="standard-read-only-input"
            label="Email Read Only"
            defaultValue={props.user.email}
            InputProps={{
            readOnly: true,
            }}
            variant="standard"
            />

            <TextField
             id="standard-helperText"
            label="User"
            defaultValue={props.user.userName}
            helperText="Enter your username"
            variant="standard"
            />

            <TextField
            id="standard-helperText"
            label="Name"
            defaultValue={props.user.realName}
            helperText="Enter your name"
            variant="standard"
            />

            <TextField
            id="standard-helperText"
            label="Company name"
            defaultValue={props.user.company}
            helperText="Enter your company name"
            variant="standard"
            />

            <TextField
            id="standard-helperText"
            label="Website"
            defaultValue={props.user.website}
            helperText="Enter your website"
            variant="standard"
            />

            <TextField
            id="standard-helperText"
            label="Phone"
            defaultValue={props.user.phone}
            helperText="Enter your phone number"
            variant="standard"
            />

            <TextField
             id="standard-textarea"
            label="Address"
            placeholder="Address"
            multiline
            variant="standard"
            />

            <TextField
            id="standard-helperText"
            label="Avatar"
            defaultValue={props.user.phone}
            helperText="Enter your picture"
            variant="standard"
            type="file"
            />
            </div>

            <div className='form_button'>
                <Buttons type="submit">SAVE</Buttons> 
                <Buttons type="reset">RESET</Buttons> 
            </div>
        </Box>
        </div>

    );
}

export default ProfileForm;