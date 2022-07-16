import React from "react";
import "./login.css"
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import{loginUser} from '../action/user_action'
//props.push에러 
import { useNavigate } from "react-router-dom";

function Login(props){

  let navigate = useNavigate();

  const dispatch=useDispatch();




    const [User, setUser] = useState({
        id: "",
        password: "",
      });


      const change = (e) => {
        setUser({
          ...User,
          [e.target.name]: e.target.value,
        });
        console.log(User)
      };



    function tryLogin(props){
        console.log("ehla")


        let body = {
          id:User.id,
          password:User.password
        }

        dispatch(loginUser(body)) // action
          .then(response =>{
            if(response.payload.loginSuccess){
              navigate("/user");              
            }
            else{
              alert("error")
            }
          }) 

        //로그인 완료 후 이동 
        
    }

    return(
        <div>
            <td className="login_Section">
            <tr><input className="object" type="text" name="id" placeholder="아이디" onChange={change} /></tr><br />
            <tr><input className="object" type="text" name ="password" placeholder="비밀번호" onChange={change} /></tr><br/>
            <tr><button onClick={()=>{tryLogin();}}>로그인</button></tr><br/>
            <tr><a href="">아이디 찾기</a> | <a href="">비밀번호 찾기</a> | <a href="/new">회원가입</a></tr>
            </td>
        </div>

    )
}

export default Login;