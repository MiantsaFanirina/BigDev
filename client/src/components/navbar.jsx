import React, { useState, useEffect } from 'react'

import { Link } from "react-router-dom"

// icons
import { FiSearch } from "react-icons/fi"
import { LuSun } from "react-icons/lu"
import { IoMdMoon } from "react-icons/io"

function Navbar() {
    const [theme, setTheme] = useState("light")
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme")
        if (storedTheme) {
            setTheme(storedTheme)
        }
        if (theme === "dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark")
            localStorage.setItem("theme", "dark")
        } else {
            setTheme("light")
            localStorage.setItem("theme", "light")
        }
    }
    return (
        <div className='fixed w-full md:p-1.5 p-3 md:px-20 top-0 left-0 bg-slate-600 drop-shadow transition-all backdrop-filter backdrop-blur-md bg-opacity-5 z-40 flex md:justify-between justify-center items-center'>
            <h1 className='font-bold uppercase text-lg dark:text-slate-50 md:mr-0 mr-5'><Link to="/">Logo</Link></h1>
            <div className='md:w-2/3 h-full flex items-center '>
                <input type="text" placeholder='Rechercher' className="w-full h-full bg-slate-300 dark:bg-slate-900 dark:text-slate-200 rounded-lg p-3 px-10 outline-none"/>
                    <div className="flex items-center justify-center bg-slate-300 dark:bg-slate-900 mx-3 md:p-2 p-3 rounded-full">
                        <FiSearch className='text-slate-500 dark:text-slate-300' size={15}/>
                    </div>
                </div>
            <div className="h-full flex items-center">
                <div className='md:w-[40px] md:h-[40px] w-[30px] h-[30px] cursor-pointer bg-slate-700 rounded-lg overflow-hidden'></div>
                <div onClick={toggleTheme} className="flex md:ml-10 ml-4 items-center justify-center h-[30px] w-[30px] rounded-full bg-slate-300 hover:bg-slate-400 cursor-pointer">
                    {theme === "light" ? <LuSun size={17}/>
                    :<IoMdMoon size={17} className='text-pink-600'/>}
                </div>
            </div>
        </div>
    )
}

export default Navbar