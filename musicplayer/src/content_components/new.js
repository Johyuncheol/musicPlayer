import React from "react";
import "./login.css"
import axios from 'axios'
import {useState} from 'react'

function New(){

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



    function newuser(){
        const client = axios.create();
        const name = '조현철';
        console.log("ehla")
        axios.post('http://localhost:8080/new' , {id:User.id, password:User.password} );

    }

    return(
        <div>
            <td className="login_Section">
            <tr><input className="object" type="text" name="id" placeholder="사용할 아이디" onChange={change} /></tr><br />
            <tr><input className="object" type="text" name ="password" placeholder="사용할 비밀번호" onChange={change} /></tr><br/>
            <tr><button onClick={()=>{newuser();}}>가입</button></tr><br/>

            </td>
        </div>

    )
}

export default New;