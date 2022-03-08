import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import './AddPostForm.style.css';

function AddPostForm(props: any) {
    // function to display an error message
    const { error, formik } = props;
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = useState(false);
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        props.clearError();
    };

    useEffect(() => {
        if (error) setOpen(true);
    }, [error]);

    return (
        <div className="wrapper-post">
            <form onSubmit={formik.handleSubmit}>
                <Box
                    sx={{
                        width: 600,
                        height: 500,
                        backgroundColor: 'white',
                        color: 'primary.main',
                    }}
                    component="div"
                >
                    <div className="auth-header">
                        <h2>MY POST</h2>
                    </div>

                    <div className="field">
                        <TextField
                            id="standard-multiline-static"
                            label="Title"
                            multiline
                            rows={2}
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                        />
                        {formik.touched.title && formik.errors.title && (
                            <div className="error-post">
                                {formik.errors.title}
                            </div>
                        )}
                    </div>

                    <div className="field">
                        <TextField
                            id="standard-multiline-static"
                            label="Post"
                            multiline
                            rows={6}
                            name="body"
                            value={formik.values.body}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            fullWidth
                        />

                        {formik.touched.body && formik.errors.body && (
                            <div className="error-post">
                                {formik.errors.body}
                            </div>
                        )}
                    </div>

                    <div className="btn">
                        <Button
                            variant="contained"
                            className="log-btn"
                            disabled={props.loading}
                            type="submit"
                        >
                            Save
                        </Button>
                        <NavLink to="/">
                            <Button variant="contained" type="button">
                                CANCEL
                            </Button>
                        </NavLink>
                    </div>
                </Box>
            </form>
            {{ error } && (
                <Snackbar
                    open={open}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    autoHideDuration={4000}
                    onClose={handleClose}
                >
                    <Alert severity="info" sx={{ width: '100%' }}>
                        {error}
                    </Alert>
                </Snackbar>
            )}
        </div>
    );
}
export default AddPostForm;
