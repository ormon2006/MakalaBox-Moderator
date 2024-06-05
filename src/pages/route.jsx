import { Route, Routes } from 'react-router-dom'
import  Profile  from './ModeratorPage'
import Login from './Login'
import Examinations from './Examinations'
import LoadingAnimation from '../assets/components/Loading/Loading'
import Test from "../pages/Ts"

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path='/loading' element={<LoadingAnimation/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/moderator-page' element={<Profile/>}/>
        <Route path='/examination/:id' element={<Examinations/>}/>
        <Route path='/test' element={<Test/>}/>
        
      </Routes>
    </>
  )
}

export default Routing
