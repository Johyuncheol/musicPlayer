import React from 'react';
import '../App.css';


function Home_menu() {

  function goSearch(e){
    window.location.href="/search"
  }

  return (
    <div className="App">
      <header className='header'>
        <a href='/' className='main'>music</a>
        <li>search <input type="text" onClick={goSearch}/></li>
        
        <ul  className='menu'>
          <a  href='/mypage' className='menu'>mypage</a>
          <a href='/login' className='menu'>login</a>
        </ul>

      </header>

    </div>
  );
}

export default Home_menu;
