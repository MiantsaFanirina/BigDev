import { Routes,Route } from 'react-router-dom'

/******** Pages ********/
// auth
import Login from './login/page'
import Register from './register/page'

// home
import Home from './home/page'

// userContext
import {UserProvider} from '../context/userContext'
import {WebSocketProvider} from '../context/WebSocketContext'

function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        
      </Routes>
      <UserProvider>
        <WebSocketProvider>
          <Routes>
            <Route index path="/" element={<Home />}/>
          </Routes>

        </WebSocketProvider>
      </UserProvider>
    </>
  )
}

export default MainRoutes