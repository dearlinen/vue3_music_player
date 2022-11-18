// 通用操作封装

import axios from 'axios'

import {
    handleAuth,
    handleAuthError,
    handleGeneralError,
    handleNetworkError,
    handleRequestHeader,
    handleConfigureAuth,
    handleChangeRequestHeader
} from './Interceptors.js'


const instance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials:true,
    timeout: 1000,
});

// instance.interceptors.request.use(config => {
//
//     config = handleChangeRequestHeader(config)
//     config = handleConfigureAuth(config)
//     return config
// })

instance.interceptors.response.use(response => {
        if (response.status !== 200&&response.status!==304) {

            return Promise.reject(response.data)
        }
        // handleGeneralError(response.data.code, response.data.msg)
        return response.data
    },
    err => {
        handleNetworkError(err.response.status)
        return Promise.reject(err.response)
    }
)

export const Get = (url, params) => {
    return new Promise(
        resolve => {
            instance.get(url, {params})
                .then(res => resolve([null, res]))
                .catch(err => resolve([err, undefined]))
        }
    )
}

export const Post = (url, data, params) => {
    return new Promise(
        resolve => {
            instance.post(url, data, {params})
                .then(res => resolve([null, res]))
                .catch(err => resolve([err, undefined]))
        }
    )
}