import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import './RegisterForm.style.css';

function RegisterForm(props: any) {
    const { formik, error, loading, clearError } = props;
    const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
        formik;
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
                <form onSubmit={handleSubmit}>
                    <Box
                        sx={{
                            width: 400,
                            height: 600,
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
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="email"
                            />
                            {touched.email && errors.email ? (
                                <div className="error-auth">{errors.email}</div>
                            ) : null}
                        </div>
                        <div className="field">
                            <TextField
                                id="outlined-required"
                                label="userName"
                                type="text"
                                name="userName"
                                value={values.userName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="userName"
                            />
                            {touched.userName && errors.userName ? (
                                <div className="error-auth">
                                    {errors.userName}
                                </div>
                            ) : null}
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

                            {touched.password && errors.password ? (
                                <div className="error-auth">
                                    {errors.password}
                                </div>
                            ) : null}
                        </div>

                        <div className="field">
                            <TextField
                                label="confirmPassword"
                                type="password"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                autoComplete="current-password"
                            />

                            {touched.confirmPassword &&
                            errors.confirmPassword ? (
                                <div className="error-auth">
                                    {errors.confirmPassword}
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
