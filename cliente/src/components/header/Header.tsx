/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setLogged, setLanguage, selectLanguage } from '../../features/session'
import {config} from '../../config/index'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
const Header = () => {
  const user = useSelector(selectUser);
  const { dictionary } = useSelector(selectLanguage)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = () => {
    const headers = {
      authorization: localStorage.getItem('token'),
    }
    axios.get(`${import.meta.env.VITE_API_HOST}/logout`, {headers})
      .then((response) => {
        dispatch(setLogged(false))
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
        console.log(response);
      })
      .catch((error: any) => { console.log(error) })
  }
  const onChange = (e: any) => {
    if(e.target.value === 'es'){
      dispatch(setLanguage(config.spanish));
    }else{
      dispatch(setLanguage(config.english))
    }
  }
  return (
    <header className="bg-gray-800 mb-10 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-semibold">Your Payments</h1>
        <nav>
          <ul className="flex space-x-4">
            <NavLink to={'/'} className="text-white hover:text-gray-300">{dictionary.lblHome}</NavLink>
            <li onClick={logout} className="text-white hover:text-gray-300">{dictionary.lblLogout}</li>
            <li className="text-white hover:text-gray-300">{user.name}</li>
          </ul>
        </nav>
        <select
              className="block px-4 py-2 mt-1 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-grey-300"
              onChange={onChange}
            >
              
                <option value={'es'}>{dictionary.lblSpanish}</option>
                <option value={'en'}>{dictionary.lblEnglish}</option>
            </select>
      </div>
    </header>
  );
};

export default Header;