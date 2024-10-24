import './App.css'
import Changepass from './Components/Registration/Changepass';
import Forgatepass from './Components/Registration/Forgatepass';
import Login from './Components/Registration/Login';
import Register from './Components/Registration/Register';
import VerifyOtp from './Components/Registration/VerifyOtp';
import Todo from './Components/Todo'
import ViewTodo from './Components/Viewtodo';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  

  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Register/>}></Route>
    <Route path='/login' element={<Login/>}></Route>

    <Route path='/insertadmin' element={<Todo/>}></Route>
    <Route path="/viewadmin" element={<ViewTodo/>}></Route>
    <Route path='/changepass' element={<Changepass/>}></Route>
    <Route path='/forgetpass' element={<Forgatepass/>}></Route>
    <Route path='/verifyotp' element={<VerifyOtp/>}></Route>
  
  </Routes>
  </BrowserRouter>
     
    
  )
}

export default App
