import React from 'react';
import '../App.css';


import { useState } from 'react';
import axios from 'axios';

function User_home() {

  function goSearch(e){
    window.location.href="/user/search"
  }

  function logout(){
    axios.get('http://localhost:8080/schema/users/logout')
      .then(response =>{
        console.log(response.data.success)
      })
  }

  return (
    <div className="App">
      <header className='header'>
        <a href='/user' className='main'>music</a>
        <li>search <input type="text" onClick={goSearch}/></li>
        
        <ul  className='menu'>
          <a  href='/mypage' className='menu'>mypage</a>
          <a href='/' className='menu' onClick={()=>{logout();}}>logout</a>
        </ul>

      </header>

    </div>
  );
}

export default User_home;
