import React from 'react'
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'

import './ProfileForm.style.css'

function ProfileForm(props) {
    const formik = props.formik
    const loading = props.loading
    const handleFileInputChange = props.handleFileInputChange
    return (
        <div className="profile">
            <form onSubmit={formik.handleSubmit}>
                <Box
                    component="div"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '200px' },
                        backgroundColor: 'white',
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <h3>MY PROFILE</h3>
                    <div className="avatar">
                        <Avatar
                            alt={formik.values.userName}
                            src={props.previewSource || formik.values.avatar}
                            sx={{ width: 60, height: 60 }}
                        />
                    </div>
                    <div className="form">
                        <TextField
                            //id="standard-helperText"
                            label="userName"
                            name="userName"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText="Enter your username"
                            variant="standard"
                        />

                        <TextField
                            //id="standard-helperText"
                            label="Name"
                            name="realName"
                            value={formik.values.realName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText="Enter your name"
                            variant="standard"
                        />

                        <TextField
                            //id="standard-helperText"
                            label="Company name"
                            name="company"
                            value={formik.values.company}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText="Enter your company name"
                            variant="standard"
                        />

                        <TextField
                            //id="standard-helperText"
                            label="Website"
                            name="website"
                            value={formik.values.website}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText="Enter your website"
                            variant="standard"
                        />

                        <TextField
                            //id="standard-helperText"
                            label="Phone"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText="Enter your phone number"
                            variant="standard"
                        />

                        <TextField
                            id="standard-textarea"
                            label="Address"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            multiline
                            variant="standard"
                        />

                        <TextField
                            id="file_field"
                            label="Picture"
                            name="avatar"
                            onChange={handleFileInputChange}
                            onBlur={formik.handleBlur}
                            helperText="Enter your picture"
                            variant="standard"
                            type="file"
                        />
                        {props.previewSource && (
                            <img
                                src={props.previewSource}
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
        </div>
    )
}

export default ProfileForm
