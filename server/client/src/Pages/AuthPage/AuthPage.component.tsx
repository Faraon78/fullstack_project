import React from 'react';

import { useFormik /*, FormikProps*/ } from 'formik';
import * as Yup from 'yup';
import { useHttp } from '../../Hooks/http.hook';
import { useAuth } from '../../Hooks/auth.hook';

import AuthenticationForm from '../../Components/AuthenticationForm/AuthenticationForm.component';

interface MyFormValues {
    email: string;
    password: string;
}

function AuthPage() {
    const { login } = useAuth();
    const { loading, error, request, clearError } = useHttp();

    // describe the input form
    const formik = useFormik<MyFormValues>({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .min(6, 'Must be 6 characters or more')
                .required('Required'),
        }),
        onSubmit: (values) => {
            loginHandler(values.email, values.password);
        },
    });

    const loginHandler = async (email: string, password: string) => {
        try {
            const data = await request(
                'http://localhost:5000/auth/login',
                'POST',
                { email, password },
                { credentials: 'true' }
            );

            login(data.token, data.userId);
        } catch (e: any) {
            console.log(e.message);
        }
    };

    return (
        <div className="main">
            <AuthenticationForm
                formik={formik}
                error={error}
                loading={loading}
                clearError={clearError}
            />
        </div>
    );
}

export default AuthPage;
