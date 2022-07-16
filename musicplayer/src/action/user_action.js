import axios from "axios";
import {
    LOGIN_USER
}from './types'

export function loginUser(dataToSubmit){
    

    const request = axios.post('http://localhost:8080/loginTry' , dataToSubmit )
        .then(response => response.data)

    //request를 reduce로 전달 
    return{
        type:LOGIN_USER,
        payload: request
    }
}