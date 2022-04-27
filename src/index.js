import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';

ReactDOM.render(
  <React.StrictMode>

    <div id='modal_container'>
    </div>

    <div id='message_container' className='fixed top-4 w-full z-10 flex justify-center'>
    </div>

    <Routes />
    
  </React.StrictMode>,
  document.getElementById('root')
);