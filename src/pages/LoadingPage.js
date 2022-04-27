import React from 'react';
import ReactLoading from 'react-loading';

const LoadingPage = ({max}) => {

  return (
    <div className={'flex flex-col justify-center items-center ' + (max ? 'w-screen h-screen ' : 'w-full h-full ')}>
      <img
        className="h-32 w-32"
        alt='logo'
        src={require('../assets/images/logo.png')}
      />
      <ReactLoading type="spokes" color="#0060C8" height={40} width={40} />
    </div>
  )
}

export default LoadingPage;