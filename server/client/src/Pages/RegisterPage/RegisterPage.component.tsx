import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHttp } from '../../Hooks/http.hook';

import RegisterForm from '../../Components/RegisterForm/RegisterForm.component';
interface RegisterFormValues {
    email: string;
    userName: string;
    password: string;
    confirmPassword: string;
}

function RegisterPage() {
    const { loading, error, request, clearError } = useHttp();
    const navigate = useNavigate();
    const formik = useFormik<RegisterFormValues>({
        initialValues: {
            email: '',
            userName: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            userName: Yup.string().required('Required'),
            password: Yup.string()
                .min(6, 'Must be 6 characters or more')
                .required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Password mismatch')
                .required('Required'),
        }),
        onSubmit: (values) => {
            registerHandler(values.email, values.userName, values.password);
        },
    });
    const registerHandler = async (
        email: string,
        userName: string,
        password: string
    ) => {
        try {
            await request(
                'http://localhost:5000/auth/register',
                'POST',
                { email, userName, password },
                { credentials: true }
            );
            navigate('/login', { replace: true });
        } catch (e: any) {
            console.log(e.message);
        }
    };
    return (
        <RegisterForm
            formik={formik}
            error={error}
            loading={loading}
            clearError={clearError}
        />
    );
}

export default RegisterPage;
