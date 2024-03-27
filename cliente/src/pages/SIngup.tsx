/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { setLogin, setLogged,setUser } from '../features/session'
import { toast } from "react-toastify"
import axios from "axios"
const Singup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const body = {
            email,
            password,
            name,
            surname,
        }
        axios.post(`${import.meta.env.VITE_API_HOST}/singin`, body)
            .then((data: any) => {
                console.log(data)
                localStorage.setItem('token', JSON.stringify(data.data.token))
                localStorage.setItem('user', JSON.stringify(data.data.data.dataValues));
                dispatch(setLogin(data.data.token))
                dispatch(setUser(data.data.data.dataValues))
                dispatch(setLogged(true))
                toast('login successful',{theme: 'light', hideProgressBar: true})
                navigate('/')
            }
            )
            .catch((err: any) => 
            {   
                toast(err.message, {theme: 'light', hideProgressBar: true})
                console.log(err)
        })
    }
    return (
        <>
         <div className="min-h-screen flex justify-center items-center w-100 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
       <div className="max-w-md w-full">
        <form className="bg-gray-100 max-w-screen-sm shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
        <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                    Name
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
        <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                    Surname
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="surname"
                    type="surname"
                    placeholder="Enter surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"   
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Sing up
                </button>
            </div>
            </form>
            </div>
            </div>
        </>
    )
}
export default Singup