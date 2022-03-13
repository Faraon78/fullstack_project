import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import './RegisterForm.style.css';

function RegisterForm(props: any) {
    const formik = props.formik;
    const error = props.error;
    const loading = props.loading;
    const clearError = props.clearError;
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
        <div className="main">
            <div className="wrapper-reg">
                <form onSubmit={formik.handleSubmit}>
                    <Box
                        sx={{
                            width: 400,
                            height: 500,
                            backgroundColor: 'white',
                            color: 'primary.main',
                        }}
                        component="div"
                    >
                        <div className="auth-header">
                            <h2>Register new user</h2>
                        </div>

                        <div className="field">
                            <TextField
                                id="outlined-required"
                                label="Email"
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="email"
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error-auth">
                                    {formik.errors.email}
                                </div>
                            ) : null}
                        </div>

                        <div className="field">
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="current-password"
                            />

                            {formik.touched.password &&
                            formik.errors.password ? (
                                <div className="error-auth">
                                    {formik.errors.password}
                                </div>
                            ) : null}
                        </div>

                        <div className="field">
                            <TextField
                                label="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                autoComplete="current-password"
                            />

                            {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword ? (
                                <div className="error-auth">
                                    {formik.errors.confirmPassword}
                                </div>
                            ) : null}
                        </div>

                        <div className="btn">
                            <Button
                                variant="contained"
                                className="log-btn"
                                disabled={loading}
                                type="submit"
                            >
                                Register
                            </Button>
                        </div>
                        <NavLink to="/login">
                            <p> Already have an account? Let's login</p>
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
        </div>
    );
}

export default RegisterForm;
