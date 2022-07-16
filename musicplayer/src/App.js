import React from 'react';
import { Routes, Route, Link, useSearchParams } from 'react-router-dom'
import './App.css';
import Home from './content_components/home.js'
import Search from './content_components/search.js'
import Login from './content_components/login.js'
import New from './content_components/new.js'
import User_menu from './content_components/user_menu'
import Home_menu from './content_components/home_menu'


function App() {

  function goSearch(e){
    window.location.href="/search"
  }

  return (
    <div className="App">
      <header>
      <Routes>
      <Route path="/user" element={<User_menu/>}  />
      <Route path="*" element={<Home_menu/>} />
      <Route path="/" element={<Home_menu/>} />
      </Routes>
      </header>


      <body>
        <Routes>
          <Route path="/" element={<Home/>} exact={true} />
          <Route path="/user" element={<Home/>} exact={true} />
          <Route path="/user/search" element={<Search/>} exact={true} />
          <Route path="/search" element={<Search/>} exact={true} />
          <Route path="/login" element={<Login/>} exact={true} />
          <Route path="/new" element={<New/>} exact={true} />
        </Routes>
      </body>
 
    </div>
  );
}

export default App;
