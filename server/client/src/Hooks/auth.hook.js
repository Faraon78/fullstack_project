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
        localStorage.removeItem(config.STORAGENAME)
        dispatch(updateCurrentUser({}))
        dispatch(userSetToken(null))
    }, [dispatch, setToken])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(config.STORAGENAME))

        if (data && data.token) {
            login(data.token, data.userId)
        }
    }, [login])

    return { login, logout, token, userId }
}
