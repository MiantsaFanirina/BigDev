import { Routes,Route } from 'react-router-dom'

/******** Pages ********/
// auth
import Login from './login/page'
import Register from './register/page'

// home
import Home from './home/page'

// userContext
import {UserProvider} from '../context/userContext'

function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        
      </Routes>
      <UserProvider>
        <Routes>
          <Route index path="/" element={<Home />}/>
        </Routes>
      </UserProvider>
    </>
  )
}

export default MainRoutes