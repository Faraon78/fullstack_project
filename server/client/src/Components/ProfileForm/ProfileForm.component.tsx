import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import './ProfileForm.style.css';

function ProfileForm(props: any) {
    const { formik, loading, message, handleFileInputChange, previewSource } =
        props;
    const { handleSubmit, values, handleChange, handleBlur } = formik;

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpen(false);
    };

    useEffect(() => {
        if (message) setIsOpen(true);
    }, [message]);
    return (
        <div className="profile">
            <form onSubmit={handleSubmit}>
                <Box
                    component="div"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '200px' },
                        backgroundColor: 'white',
                    }}
                >
                    <h3>MY PROFILE</h3>
                    <div className="avatar">
                        <Avatar
                            alt={values.userName}
                            src={previewSource || values.avatar}
                            sx={{ width: 60, height: 60 }}
                        />
                    </div>
                    <div className="form">
                        <TextField
                            label="userName"
                            name="userName"
                            value={values.userName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText="Enter your username"
                            variant="standard"
                        />

                        <TextField
                            label="Name"
                            name="realName"
                            value={values.realName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText="Enter your name"
                            variant="standard"
                        />

                        <TextField
                            label="Company name"
                            name="company"
                            value={values.company}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText="Enter your company name"
                            variant="standard"
                        />

                        <TextField
                            label="Website"
                            name="website"
                            value={values.website}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText="Enter your website"
                            variant="standard"
                        />

                        <TextField
                            label="Phone"
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            helperText="Enter your phone number"
                            variant="standard"
                        />

                        <TextField
                            id="standard-textarea"
                            label="Address"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            multiline
                            variant="standard"
                        />

                        <TextField
                            id="file_field"
                            label="Picture"
                            name="avatar"
                            onChange={handleFileInputChange}
                            onBlur={handleBlur}
                            helperText="Enter your picture"
                            variant="standard"
                            type="file"
                        />
                        {props.previewSource && (
                            <img
                                src={previewSource}
                                alt="chosen"
                                style={{ height: '100px' }}
                            />
                        )}
                    </div>

                    <div className="form_button">
                        <Button
                            variant="contained"
                            disabled={loading}
                            type="submit"
                        >
                            SUBMIT
                        </Button>
                        <NavLink to="/">
                            <Button variant="contained" type="button">
                                CANCEL
                            </Button>
                        </NavLink>
                    </div>
                </Box>
            </form>
            {{ message } && (
                <Snackbar
                    open={isOpen}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={4000}
                    onClose={handleClose}
                >
                    <Alert severity="info" sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}

export default ProfileForm;
