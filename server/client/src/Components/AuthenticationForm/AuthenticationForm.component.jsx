import React, {useEffect, useState} from 'react';
import { useDispatch} from 'react-redux';
import { useHttp } from '../../Hooks/http.hook';
import { useMessage } from '../../Hooks/message.hook';
import {updateCurrentUser} from '../../Redux/currentUser/currentUser.actions';
//import {Cookies} from 'js-cookie';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import './AuthenticationForm.style.css';


function AuthenticationForm() {
    const dispatch = useDispatch();
    const message = useMessage();
    const {loading, error, request}= useHttp();
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [errormail, setErrormail] = useState(false);
    const [errorpass, setErrorpass] = useState(false);

    useEffect(()=>{
        message (error);
        //clearError()
    },[error, message]);
        
    const changeEmail = (event) =>{
    setEmail(event.target.value)
   }
   const changePassword = (event) =>{
    setPassword(event.target.value)
    }

    const startRegistr =() =>{
        console.log('Запустили registr');
        const valid = validation();
        
        if (valid){
            registerHandler()
        }
    }
    const validation =()=>{
        console.log("Запустили validation");
        let testEmail=/\S+@\S+/.test(email);
        if (!testEmail){
            setErrormail(true)            
        } else{
            setErrormail(false) 
        }
        if (password.length<6){
            setErrorpass(true)
        } else{
            setErrorpass(false)
        }
        if(testEmail && (password.length>=6)){
            setErrormail(false)
            setErrorpass(false)
            console.log ("Validation = true")
                return true
            }
            
        else {
            console.log ("Validation = false")
                return false
            }           
    }

    const registerHandler = async ()=>{
        try{
            console.log('Запустили registerHandler');
            
            const data = await request (
                'http://localhost:5000/auth/register', 
                'POST', 
                {email, password},
                {credentials:true} 
                );
            console.log('DATA', data);
        }catch(e){

        }
    }
    const startlogin =() =>{
        console.log('Запустили login');
        const valid = validation();
        if (valid){
            loginHandler();
        }
    }
    const loginHandler = async ()=>{
        try{
            const data = await request (
                ' http://localhost:5000/auth/login', 
                'POST', 
                {email, password},
                {'credentials': 'true'}  
                );
            console.log('DATA', data);
            
            // так cookie не видит
            const cookie = data.request.cookie("access_token");

            console.log(cookie);

            //если удачно залогинились, то ложим в Redux CurrentUser
            const currentUser = {
                email:email,
                password:password
            }
            dispatch(updateCurrentUser(currentUser)) 
            

        }catch(e){

        }
    }

    return(    
      <div className='wrapper-auth'>
        
        <Box 
        sx={{
            width: 400,
            height: 400,
            backgroundColor: 'white',       
            color: 'primary.main',     
            
          }}
         component="form"      
         noValidate
         autoComplete="off"
        >
            <div className='auth-header'>
                <br/>
                <h2 >Authorization</h2>
            </div>
            <div className="field">
                
                <TextField 
                required
                id="outlined-required"
                label="Email"
                placeholder="Email"
                type="email"
                name ="email"
                autoComplete="off"
                onChange={changeEmail}
                />
                {(errormail) && <Alert severity="error" className='alert'>Enter the correct Email</Alert>} 
            </div>   
             
            <div className="field">    
                <TextField 
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                name="password"
                onChange={changePassword} 

                />
                 {(errorpass) && <Alert severity="error" className='alert'>password must be at least 6 characters</Alert>}
            </div> 
            <div className='btn'>   
                <Button variant="contained" className="log-btn"
                disabled={loading}
                onClick={startlogin}
                 >Log in
                </Button>  
                
                <Button variant="contained" className='reg'
                 onClick={startRegistr} 
                disabled={loading}
                > Register
                </Button>
               
            </div> 
        </Box>
        
    </div>
        );     
}

export default AuthenticationForm;
