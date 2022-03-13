import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import './AuthenticationForm.style.css';

function AuthenticationForm(props: any) {
    // function to display an error message
    const { error, formik, loading, clearError } = props;
    const { values, handleChange, handleBlur, errors, touched } = formik;
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [isOpen, setisOpen] = useState(false);
    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setisOpen(false);
        clearError();
    };

    useEffect(() => {
        if (error) setisOpen(true);
    }, [error]);

    return (
        <div className="wrapper-auth">
            <form onSubmit={formik.handleSubmit}>
                <Box
                    sx={{
                        width: 400,
                        height: 400,
                        backgroundColor: 'white',
                        color: 'primary.main',
                    }}
                    component="div"
                >
                    <div className="auth-header">
                        <h2>SIGN IN</h2>
                    </div>

                    <div className="field">
                        <TextField
                            id="outlined-required"
                            label="Email"
                            type="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="email"
                        />
                        {touched.email && errors.email && (
                            <div className="error-auth">
                                {formik.errors.email}
                            </div>
                        )}
                    </div>

                    <div className="field">
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoComplete="current-password"
                        />

                        {touched.password && errors.password && (
                            <div className="error-auth">{errors.password}</div>
                        )}
                    </div>

                    <div className="btn">
                        <Button
                            variant="contained"
                            className="log-btn"
                            disabled={loading}
                            type="submit"
                        >
                            Login
                        </Button>
                    </div>
                    <NavLink to="/register">
                        <p> New user? Try register</p>
                    </NavLink>
                </Box>
            </form>
            {{ error } && (
                <Snackbar
                    open={isOpen}
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
export default AuthenticationForm;
