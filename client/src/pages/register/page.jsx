import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion' 

import { useNavigate } from 'react-router-dom'

// Services
import { createUser } from '../../services/users.service'

// Utils
import { capitalizeString } from '../../utils/format'
import Cookies from 'js-cookie'


export default function Register() {
  // navigation
  const history = useNavigate()

  // error handler state
  const [errorMessage, setErrorMessage] = useState(null)

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

    // Check if either username or password is empty
    setIsButtonDisabled(formData.username === "" || formData.password === "")
  }

  const registerUser = async () => {
    const { username, password } = formData
  
   
    const response = await createUser({ username: capitalizeString(username), password })


    if (response.token) {
      Cookies.set('token', response.token, { expires: 30 })
      history('/')
    }
    else {
      setErrorMessage("Le nom d'utilisateur a déja été pris")
    }
  }

  // lifecycle
  useEffect(() => {
    const token = Cookies.get('token')
    if(token) {
      history('/')
    }
  }, [])

  return (
    <>
    {console.log(errorMessage)}
      <motion.div

        // animation
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}

        className="w-full h-full flex items-center justify-center"
      >
        <div className="bg-white md:w-fit md:h-auto w-full h-full p-10 md:rounded md:drop-shadow flex flex-col items-center justify-center">
          
          <h1 className="font-mono font-semibold text-4xl text-slate-900 mb-20">S'inscrire</h1>
          
          
          <div className="relative h-11 w-full md:min-w-[250px] mb-8">
            <input
              type="text"
              name="username"

              value={formData.username}
              onChange={handleChange}

              placeholder="Nom d'utilisateur"
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Nom d'utilisateur
            </label>
          </div>
          
          <div className="relative h-11 w-full md:min-w-[250px] mb-8">
            <input
              type="password"
              name="password"

              value={formData.password}
              onChange={handleChange}

              placeholder="Mot de passe"
              className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-pink-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-sm font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-pink-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-sm peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:after:scale-x-100 peer-focus:after:border-pink-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Mot de passe
            </label>
          </div>

          {errorMessage === null ? <></> : <span className="text-center text-pink-500 mb-6">{errorMessage}</span>}

          <button
            onClick={() => registerUser()}
            className={`md:px-0 md:w-full px-5 h-11 bg-slate-900 text-white font-semibold rounded mb-3 ${isButtonDisabled ? 'opacity-50 cursor-default' : 'hover:bg-slate-800'}`}
            disabled={isButtonDisabled}
          >
            S'inscrire
          </button>

          <p className="text-sm">Vous avez déja un compte ? <Link to="/login" className="text-blue-500">Se connecter</Link></p>
          
        </div>
      </motion.div>
    </>
  )
}

