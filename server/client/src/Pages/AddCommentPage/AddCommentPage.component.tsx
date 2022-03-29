import React from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

import { useHttp } from '../../Hooks/http.hook';
import Selectors from '../../Redux/selectors/selectors';

import AddCommentForm from '../../Components/AddCommentForm/AddCommentForm.component';

function AddCommentPage() {
    const { id, posts } = Selectors();
    const { postid } = useParams<{ postid: string }>();
    const { request, loading, error, clearError } = useHttp();
    const navigate = useNavigate();
    const post: object = posts.find((post: any) => post.id === postid);
    const formik: any = useFormik({
        initialValues: {
            body: '',
        },
        validationSchema: Yup.object({
            body: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            const addComment: object = {
                userId: id,
                postId: postid,
                body: values.body,
            };
            handlerAddComment(addComment);
        },
    });
    const handlerAddComment = async (addComment: object) => {
        try {
            await request(
                `http://localhost:5000/saveComment`,
                'POST',
                addComment,
                {
                    credentials: true,
                }
            );

            navigate('/', { replace: true });
        } catch (e: any) {
            console.log(e.message);
        }
    };

    return (
        <AddCommentForm
            formik={formik}
            error={error}
            loading={loading}
            post={post}
            clearError={clearError}
        />
    );
}
export default AddCommentPage;
