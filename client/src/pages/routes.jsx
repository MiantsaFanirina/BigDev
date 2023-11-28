import { Routes,Route } from 'react-router-dom'

/******** Pages ********/
// auth
import Login from './login/page'
import Register from './register/page'

// home
import Home from './home/page'

function MainRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route index path="/" element={<Home />}/>
    </Routes>
  )
}

export default MainRoutes