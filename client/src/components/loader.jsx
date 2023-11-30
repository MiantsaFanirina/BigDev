import React from 'react'
import { createPortal } from 'react-dom';

// assets
import loaderGif from '../assets/loading.gif';

function Loader() {
  return createPortal(
    <div className="w-full h-full bg-white dark:bg-black z-50 flex items-center justify-center absolute left-0 top-0">
        <div className="w-[100px] h-[100px] flex items-center justify-center">
            <img src={loaderGif} alt="loader" className='w-full h-full object-cover object-center'/>
        </div>
    </div>
  , document.body)
}

export default Loader