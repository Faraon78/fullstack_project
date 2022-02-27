import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

import './AddPostForm.style.css'

function AddPostForm(props) {
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
                    noValidate
                    autoComplete="off"
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
                        {formik.touched.title && formik.errors.title ? (
                            <div className="error-post">
                                {formik.errors.title}
                            </div>
                        ) : null}
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

                        {formik.touched.body && formik.errors.body ? (
                            <div className="error-post">
                                {formik.errors.body}
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
    )
}
export default AddPostForm
