import { Routes,Route } from 'react-router-dom'

/******** Pages ********/
// auth
import Login from './login/page'
import Register from './register/page'

// home
import Home from './home/page'

// userContext
import {UserProvider} from '../context/userContext'

// toast
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function MainRoutes() {
  return (
    <>
      {console.log('backend url', import.meta.env.VITE_BACKEND_URL)}
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        
      </Routes>
      <UserProvider>
          
          <Routes>
            <Route index path="/" element={<Home />}/>
          </Routes>

      </UserProvider>

      {/* message toast container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
    </>
  )
}

export default MainRoutes