import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useHttp } from '../../Hooks/http.hook'
import { config } from '../../config'

import ProfileForm from '../../Components/ProfileForm/ProfileForm.component'

import { fetchCurrentUserStart } from '../../Redux/currentUser/currentUser.actions'

function ProfilePage() {
    const dispatch = useDispatch()
    const { request, loading } = useHttp()
    const [previewSource, setPreviewSource] = useState()
    const [message, setMessage] = useState('')

    const data = localStorage.getItem(config.STORAGENAME)
    const id = JSON.parse(data).userId

    //запускаем загрузку из БД всех данных пользователя
    useEffect(() => {
        dispatch(fetchCurrentUserStart(id))
    }, [dispatch, id])
    const user = useSelector((state) => state.currentUser.currentUser)

    const initialValues = {
        userName: `${user.userName}`,
        realName: `${user.realName}`,
        company: `${user.company}`,
        website: `${user.website}`,
        phone: `${user.phone}`,
        address: `${user.address}`,
        avatar: `${user.avatar}`,
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            userName: Yup.string(),
            realName: Yup.string(),
            company: Yup.string(),
            website: Yup.string(),
            phone: Yup.string(),
            address: Yup.string(),
            avatar: Yup.string(),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            const updateUser = {
                ...values,
                id: id,
                avatar: { data: previewSource },
            }
            profileUserHandler(updateUser)
        },
    })

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        previewFile(file)
        console.log(file)
    }
    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }
    const profileUserHandler = async (updateUser) => {
        try {
            await request(
                `http://localhost:5000/users/${id}`,
                'PATCH',
                updateUser,
                { credentials: true }
            )
            setMessage('Profile succsesful update')
        } catch (e) {
            setMessage('Something went wrong, try again')
        }
    }

    return (
        <div className="content-pages">
            <ProfileForm
                user={user}
                formik={formik}
                loading={loading}
                handleFileInputChange={handleFileInputChange}
                previewSource={previewSource}
                message={message}
            />
        </div>
    )
}

export default ProfilePage
