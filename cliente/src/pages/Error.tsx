import { NavLink } from "react-router-dom";
const Error = () => {
    return (
        <>
        <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">Oops! The page you are looking for does not exist.</p>
      <NavLink to="/" className="text-blue-500 hover:underline">Go back to home</NavLink>
    </div>
        </>
    )
}
export default Error;