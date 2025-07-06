
import './App.css'
import Navbar from './components/shared/Navbar'
import { Outlet } from 'react-router'
import Footer from './components/shared/Footer'
function App() {


  return (
   <>
   <Navbar/>
   <Outlet/>
   <Footer/>
   </>
  )
}

export default App
