import React from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { useHttp } from '../../Hooks/http.hook';
import Selectors from '../../Redux/selectors/selectors';

import AddPostForm from '../../Components/AddPostForm/AddPostForm.component';

function AddPostPage() {
    const { id } = Selectors();
    const { request, loading, error, clearError } = useHttp();
    const navigate = useNavigate();
    const formik: any = useFormik({
        initialValues: {
            title: '',
            body: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(80, 'Must be less then 80 characters')
                .required('Required'),
            body: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            console.log(values);
            const addPost: object = {
                userId: id,
                title: values.title,
                body: values.body,
            };
            handlerAddPost(addPost);
        },
    });
    const handlerAddPost = async (addPost: object) => {
        try {
            await request(`http://localhost:5000/savePost`, 'POST', addPost, {
                credentials: true,
            });

            navigate('/', { replace: true });
        } catch (e: any) {
            console.log(e.message);
        }
    };

    return (
        <AddPostForm
            formik={formik}
            error={error}
            loading={loading}
            clearError={clearError}
        />
    );
}
export default AddPostPage;
