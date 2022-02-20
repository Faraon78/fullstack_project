import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

import './AuthenticationForm.style.css'

function AuthenticationForm(props) {
    // функция для вывода сообщения об ошибке
    const error = props.error
    const formik = props.formik
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    })
    const [open, setOpen] = useState(false)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
        props.clearError()
    }

    useEffect(() => {
        if (error) setOpen(true)
    }, [error])

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
                    noValidate
                    autoComplete="off"
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

                        {formik.touched.password && formik.errors.password ? (
                            <div className="error-auth">
                                {formik.errors.password}
                            </div>
                        ) : null}
                    </div>

                    <div className="btn">
                        <Button
                            variant="contained"
                            className="log-btn"
                            disabled={props.loading}
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
    )
}
export default AuthenticationForm
