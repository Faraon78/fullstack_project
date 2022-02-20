import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useHttp } from '../../Hooks/http.hook'

import ProfileForm from '../../Components/ProfileForm/ProfileForm.component'

import { fetchCurrentUserStart } from '../../Redux/currentUser/currentUser.actions'

function ProfilePage() {
    const dispatch = useDispatch()
    const { request, loading } = useHttp()
    const [previewSource, setPreviewSource] = useState()

    const data = localStorage.getItem('userData')
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
        avatar: '',
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object({
            userName: Yup.string().min(3, 'Must be 3 characters or more'),
            realName: Yup.string().min(3, 'Must be 3 characters or more'),
            company: Yup.string(),
            website: Yup.string(),
            phone: Yup.string(),
            address: Yup.string(),
            avatar: Yup.string(),
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            const updateUser = {
                id: id,
                userName: values.userName,
                realName: values.realName,
                company: values.company,
                website: values.website,
                phone: values.phone,
                address: values.address,
            }
            profileAvatarHandler(previewSource)
            profileUserHandler(updateUser)
        },
    })
    const profileAvatarHandler = async (previewSource) => {
        console.log('Запустили profileAvatarHandler')
        const uploadImage = (base64EncodedImage) => {
            console.log(base64EncodedImage)
        }
        if (previewSource) {
            uploadImage(previewSource)
        }

        /* try {
            await request(
                'http://localhost:5000/avatar',
                'POST',
                 base64EncodedImage, 
                { credentials: true }
            )
        } catch (e) {
            console.log(e.message)
        }*/
    }
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
                'http://localhost:5000/updateUser',
                'POST',
                updateUser,
                { credentials: true }
            )
        } catch (e) {
            console.log(e.message)
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
            />
        </div>
    )
}

export default ProfilePage
