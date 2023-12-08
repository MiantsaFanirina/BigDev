import React, {useState, useEffect, useRef} from 'react'

// icon
import {BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs"



export default function PostSlider({media, setMediaCount}) {

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const videoRef = useRef(null)
    // check if the file is a video
    const isVideoFile = (filename) => {
        const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.webm', /* Add more video extensions if needed */]
        return videoExtensions.some((ext) => filename.toLowerCase().includes(ext))
    }

    // autoplay and pause onView
    useEffect(() => {
        if(isVideoFile(media[currentIndex].src)) {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.5,
            }
          
            const callback = (entries) => {
                 entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVideoPlaying(true)
                        videoRef.current.play()
                    } else {
                        setIsVideoPlaying(false)
                        videoRef.current.pause()
                    }
                })
            }
          
            const observer = new IntersectionObserver(callback, options)
            observer.observe(videoRef.current)
          
            return () => {
                observer.disconnect()
            }
        }
    }, [currentIndex])

    useEffect(() => {
        setMediaCount((currentIndex + 1) + " / " + media.length)
    }, [media, currentIndex, setMediaCount])

    return (
        <div className="w-full h-full relative group">
            <div className="w-full h-full bg-center bg-contain bg-no-repeat duration-500 dark:bg-slate-800">
                {/** verfier si src est une video */}
                {(isVideoFile(media[currentIndex].src)) ?
                    <video src={import.meta.env.VITE_BACKEND_URL+ "/" + media[currentIndex].src} ref={videoRef} loop playsInline controls className="w-full h-full object-contain object-center bg-black dark:bg-slate-800"></video>
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
