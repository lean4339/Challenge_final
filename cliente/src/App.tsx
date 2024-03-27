
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLogged } from './features/session'
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Header from "./components/header/Header";
import { useDispatch } from "react-redux";
import {setUser} from './features/session'
import Home from "./pages/Home";
function App() {
  console.log("App")
  const logged  = useSelector(selectLogged);
  const location = useLocation()
  const dispatch = useDispatch()
  if (!logged) {
    // user is not authenticated
    const token = localStorage.getItem('token');
    if(!token) {
      return <Navigate to="/login" />;
    }else{
      const userFromStorage = localStorage.getItem('user');
      if(userFromStorage)
      dispatch(setUser(JSON.parse(userFromStorage)))
    }
  }

  return (
    <>
    <Header/>
    <div className="container mx-auto bg-gray-100 py-8 px-4">

    {location.pathname === '/'? <Home />: 
    <Outlet/>}
    </div>
    </>
  )
}

export default App
