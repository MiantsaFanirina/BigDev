import React, {useState} from 'react'

// icon
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs"


export default function PostSlider({media}) {

    const [currentIndex, setCurrentIndex] = useState(0)
    
    // check if the file is a video
    const isVideoFile = (filename) => {
        const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.webm', /* Add more video extensions if needed */];
        return videoExtensions.some((ext) => filename.toLowerCase().includes(ext));
    };

    return (
        <div className="w-full h-full relative group">
            <div className="w-full h-full bg-center bg-contain bg-no-repeat duration-500 dark:bg-black">
                {/** verfier si src est une video */}
                {(isVideoFile(media[currentIndex].src)) ?
                    <video src={import.meta.env.VITE_BACKEND_URL+ "/" + media[currentIndex].src} controls className="w-full h-full object-contain object-center"></video>
                    :
                    <img src={import.meta.env.VITE_BACKEND_URL+ "/" + media[currentIndex].src} alt="post media" className="w-full h-full object-contain object-center"/>
                }
            </div>

            {/* left arrow */}
            {currentIndex === 0 ? null :
                <div 
                    onClick={() => setCurrentIndex(currentIndex - 1)}
                    className="md:hidden group-hover:block absolute top-[50%] left-5 -translate-x-0 translate-y-[-50%] text-2xl rounded-full p-2 md:bg-slate-800/20 bg-slate-800/50 text-white cursor-pointer md:hover:bg-slate-800/50"
                >
                    <BsChevronCompactLeft size={20}/>
                </div>
            }
            {/* right errow */}
            {currentIndex === media.length - 1 ? null :
                <div 
                    onClick={() => setCurrentIndex(currentIndex + 1)}
                    className="md:hidden group-hover:block absolute top-[50%] right-5 -translate-x-0 translate-y-[-50%] text-2xl rounded-full p-2 md:bg-slate-800/20 bg-slate-800/50 text-white cursor-pointer md:hover:bg-slate-800/50"
                >
                    <BsChevronCompactRight size={20}/>
                </div>
            }
        </div>
    )
}
