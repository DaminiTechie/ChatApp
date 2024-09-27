import Room from './page/Room'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './utils/AuthContext'
import './App.css'
import LoginPage from './page/LoginPage'
import Register from './page/Register'


function App() {


  return (
    <Router>
      <AuthProvider>
      <Routes>
      <Route path="/login" element ={<LoginPage />}/>
      <Route path="/register" element ={<Register />}/>
      <Route element = {<PrivateRoute/>}>
      <Route path="/" element ={<Room/>}/>
      </Route>

         
        </Routes>
      
      </AuthProvider>
      
    </Router>
  )
}

export default App
