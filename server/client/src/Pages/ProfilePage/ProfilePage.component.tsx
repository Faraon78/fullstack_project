import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHttp } from '../../Hooks/http.hook';

import ProfileForm from '../../Components/ProfileForm/ProfileForm.component';
import Selectors from '../../Redux/selectors/selectors';

import { fetchCurrentUserStart } from '../../Redux/currentUser/currentUser.actions';

function ProfilePage() {
    const dispatch = useDispatch();
    const { request, loading } = useHttp();
    const [previewSource, setPreviewSource] = useState();
    const [message, setMessage] = useState('');
    const { currentUser, id } = Selectors();

    //start loading all user data from the database
    useEffect(() => {
        dispatch(fetchCurrentUserStart(id));
    }, [dispatch, id]);

    const initialValues = {
        userName: `${currentUser.userName}`,
        realName: `${currentUser.realName}`,
        company: `${currentUser.company}`,
        website: `${currentUser.website}`,
        phone: `${currentUser.phone}`,
        address: `${currentUser.address}`,
        avatar: `${currentUser.avatar}`,
    };

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
            };
            profileUserHandler(updateUser);
        },
    });

    const handleFileInputChange = (e: any) => {
        const file = e.target.files[0];
        previewFile(file);
        console.log(file);
    };
    const previewFile = (file: File) => {
        const reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };
    const profileUserHandler = async (updateUser: any) => {
        try {
            await request(
                `http://localhost:5000/users/${id}`,
                'PATCH',
                updateUser,
                { credentials: true }
            );
            setMessage('Profile succsesful update');
        } catch (e) {
            setMessage('Something went wrong, try again');
        }
    };

    return (
        <div className="content-pages">
            <ProfileForm
                user={currentUser}
                formik={formik}
                loading={loading}
                handleFileInputChange={handleFileInputChange}
                previewSource={previewSource}
                message={message}
            />
        </div>
    );
}

export default ProfilePage;
