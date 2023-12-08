import { Routes,Route } from 'react-router-dom'

/******** Pages ********/
// auth
import Login from './login/page'
import Register from './register/page'

// layout
import Layout from './layout'

// home
import Home from './home/page'

// userContext
import {UserProvider} from '../context/userContext'

/********** Components ********** */
import Navbar from '../components/navbar'


// toast
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        
      </Routes>
      <UserProvider>
          
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />}/>
            </Route>
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