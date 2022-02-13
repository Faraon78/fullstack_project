import React , {useState, useEffect}from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useHttp } from '../../Hooks/http.hook';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import './RegisterForm.style.css';

function RegisterForm() {
    const {loading, error, request, clearError}= useHttp();
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
      const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
        clearError();
      };
     
     
    useEffect(()=> {
        console.log('Error useEffect', error);        
        if(error)setOpen(true);        
    },[error ]);

    const formik = useFormik({
        initialValues: {
        email:'',
        password:'',
        confirmPassword:''
    },
    validationSchema: Yup.object({        
        email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        password: Yup.string()
          .min(6, 'Must be 6 characters or more')
          .required('Required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')],'Password mismatch')
          .required('Required'),
      }),
      onSubmit: values => {
        registerHandler(values.email, values.password);
      },
    });    
    
    const registerHandler = async (email, password)=>{
        try{
            await request (
                'http://localhost:5000/auth/register', 
                'POST', 
                {email, password},
                {credentials:true} 
                );
        }catch(e){
            console.log(e.message);
        }
    }

    return(
        <div className="main">
      <div className='wrapper-reg'>
        <form 
            onSubmit={formik.handleSubmit}
        >
        <Box 
        sx={{
            width: 400,
            height: 470,
            backgroundColor: 'white',
            color: 'primary.main',
        }}

        component="div"
        noValidate
        autoComplete="off"
        >
            <div className='auth-header'>
                <h2 >Register new user</h2>
            </div>
            
            <div className="field">

                <TextField 
                id="outlined-required"
                label='Email'
                type='email'
                name ='email'
                value={formik.values.email} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="email"
                />
                {formik.touched.email && formik.errors.email ? (
                <div className='error-auth'>{formik.errors.email}</div>
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
                <div className='error-auth'>{formik.errors.password}</div>
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

                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className='error-auth'>{formik.errors.confirmPassword}</div>
                ) : null}
                
            </div>

            <div className='btn'>
                <Button variant="contained"
                className="log-btn"
                disabled={ loading }
                type = 'submit'
                 >Register
                </Button>
            </div>
            
        </Box>
        </form>
        {{error} && <Snackbar open={open} 
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={4000} onClose={handleClose}>
            <Alert severity="info" sx={{ width: '100%' }}>
              {error}
            </Alert>
        </Snackbar>}
    </div>
    </div>
    );
}

export default RegisterForm;