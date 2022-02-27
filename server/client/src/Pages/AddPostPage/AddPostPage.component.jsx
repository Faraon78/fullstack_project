import React from 'react'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

import { config } from '../../config'
import { useHttp } from '../../Hooks/http.hook'

import AddPostForm from '../../Components/AddPostForm/AddPostForm.component'

function AddPostPage() {
    const data = localStorage.getItem(config.STORAGENAME)
    const id = JSON.parse(data).userId
    const { request, loading, error } = useHttp()
    const navigate = useNavigate()
    const formik = useFormik({
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
            console.log(values)
            const addPost = {
                userId: id,
                title: values.title,
                body: values.body,
            }
            handlerAddPost(addPost)
        },
    })
    const handlerAddPost = async (addPost) => {
        try {
            await request(`http://localhost:5000/savePost`, 'POST', addPost, {
                credentials: true,
            })

            navigate('/', { replace: true })
        } catch (e) {
            console.log(e.message)
        }
    }

    return <AddPostForm formik={formik} error={error} loading={loading} />
}
export default AddPostPage
