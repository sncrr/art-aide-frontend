import React, { useState } from 'react';
import ReactLoading from 'react-loading';

const LoadingImage = ({className, src, alt, onClick}) => {
  let [loaded, setLoaded] = useState(false);

  return (
    <div className={className}>
      <div className='flex w-full h-full items-center justify-center'>
        {
          !loaded ? <ReactLoading type='spokes' color='#0060C8' height={'2rem'} width={'2rem'} /> : null
        }
        <img
          className={loaded ? className : "hidden"}
          alt={alt}
          src={src}
          onClick={onClick}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  )
}

export default LoadingImage;