import {useState, createContext, useEffect} from 'react'
import { getFromLocalStorage, removeFromLocalStorage } from '../helpers/auth';
import axios from 'axios'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(null);

    //axios configuration
    axios.defaults.baseURL = process.env.REACT_APP_API;
    axios.defaults.headers.common['authorization'] =  auth?.token;

    axios.interceptors.response.use(function(response) {
        return response
    }, function(err) {
        if(err.response.status === 401 || err.response.status === 403) {
            setAuth(null)
            removeFromLocalStorage()
        }
        return Promise.reject(err)
    })

    useEffect(() => {
        setAuth(getFromLocalStorage("auth"))
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
        {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}