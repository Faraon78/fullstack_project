import { useState, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import {
    updateCurrentUser,
    userSetToken,
} from '../Redux/currentUser/currentUser.actions'
import { config } from '../config'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const storageName = 'userData'
    const dispatch = useDispatch()

    const login = useCallback(
        (jwtToken, id) => {
            setToken(jwtToken)
            setUserId(id)

            localStorage.setItem(
                config.STORAGENAME,
                JSON.stringify({
                    userId: id,
                    token: jwtToken,
                })
            )
            dispatch(userSetToken(jwtToken))
        },
        [dispatch]
    )

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
        dispatch(updateCurrentUser({}))
        dispatch(userSetToken(null))
        console.log(localStorage.getItem(storageName))
        console.log('token ', token)
        console.log('завершили logout')
    }, [dispatch, token])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) {
            login(data.token, data.userId)
        }
    }, [login])

    return { login, logout, token, userId }
}
