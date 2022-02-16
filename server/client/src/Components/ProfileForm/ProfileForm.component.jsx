import React from 'react'
import Button from '../Button/Button.component'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useHttp } from '../../Hooks/http.hook'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'

import './ProfileForm.style.css'

function ProfileForm(props) {
    //console.log(props.user);
    console.log(props.user.email)
    const { /*loading, error,*/ request /*, clearError*/ } = useHttp()

    const formik = useFormik({
        initialValues: {
            UserName: '',
            Name: '',
            Company: '',
            Website: '',
            Phone: '',
            Address: '',
            Picture: '',
        },
        validationSchema: Yup.object({
            UserName: Yup.string().min(3, 'Must be 3 characters or more'),
            Name: Yup.string().min(3, 'Must be 3 characters or more'),
            Company: Yup.string(),
            Website: Yup.string().url(),
            Phone: Yup.string(),
            Address: Yup.string(),
        }),
        onSubmit: (values) => {
            profileUserHandler(values)
        },
    })
    const profileUserHandler = async (email, password) => {
        try {
            await request(
                'http://localhost:5000/auth/register',
                'POST',
                { email, password },
                { credentials: true }
            )
        } catch (e) {
            console.log(e.message)
        }
    }

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
                            alt={props.user.userName}
                            src={props.user.avatar}
                            sx={{ width: 56, height: 56 }}
                        />
                    </div>
                    <div className="form">
                        <TextField
                            id="standard-helperText"
                            label="UserName"
                            value={formik.values.UserName}
                            onChange={formik.handleChange}
                            helperText="Enter your username"
                            variant="standard"
                        />

                        <TextField
                            id="standard-helperText"
                            label="Name"
                            value={formik.values.Name}
                            onChange={formik.handleChange}
                            helperText="Enter your name"
                            variant="standard"
                        />

                        <TextField
                            id="standard-helperText"
                            label="Company name"
                            value={formik.values.Company}
                            onChange={formik.handleChange}
                            helperText="Enter your company name"
                            variant="standard"
                        />

                        <TextField
                            id="standard-helperText"
                            label="Website"
                            value={formik.values.Website}
                            onChange={formik.handleChange}
                            helperText="Enter your website"
                            variant="standard"
                        />

                        <TextField
                            id="standard-helperText"
                            label="Phone"
                            value={formik.values.Phone}
                            onChange={formik.handleChange}
                            helperText="Enter your phone number"
                            variant="standard"
                        />

                        <TextField
                            id="standard-textarea"
                            label="Address"
                            value={formik.values.Address}
                            onChange={formik.handleChange}
                            multiline
                            variant="standard"
                        />

                        <TextField
                            id="standard-helperText"
                            label="Avatar"
                            value={formik.values.Phone}
                            onChange={formik.handleChange}
                            helperText="Enter your picture"
                            variant="standard"
                            type="file"
                        />
                    </div>

                    <div className="form_button">
                        <Button type="submit">SUBMIT</Button>
                        <Button type="reset">CANCEL</Button>
                    </div>
                </Box>
            </form>
        </div>
    )
}

export default ProfileForm
