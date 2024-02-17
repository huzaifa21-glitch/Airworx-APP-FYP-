import React,{useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, Link } from 'react-router-dom';

export const Login = () => {
    const [userData, setUserData] = useState({})
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/login', userData)
            console.log(res.data)
            localStorage.setItem('token', res.data.access_token)
            localStorage.setItem('email', userData.email)
            toast.success('Login Successfull', {position: toast.POSITION.TOP_CENTER})
            navigate('/home')

        } catch (error) {
            console.log("error is: ",error)
            toast.error("Invalid Credentials")
        }
    }
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 object-cover h-full w-full z-0"
        autoPlay
        loop
        muted
      >
        <source src={require("../background.mp4")} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
     
      <div className="absolute top-0 left-0 h-full w-full bg-black opacity-80 z-10"></div>

      <div className="flex justify-center items-center h-screen gap-4 flex-col text-white relative z-20">
        {/* Login Form */}
        <span className="text-9xl font-extrabold">AIRWORKX</span>
          
        <div className="bg-black/50 w-96 p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-white">Log In</h2>
          <form onSubmit={loginUser}  >
            <div className="mb-4">
              <label htmlFor="email" className="block text-white text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 rounded-md bg-gray-800 text-white"
                placeholder='Enter your email'
                required
                onChange={(e) => setUserData({...userData, email: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-white text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-2 rounded-md bg-gray-800 text-white"
                placeholder='Enter your password'
                required
                onChange={(e) => setUserData({...userData, password: e.target.value})}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Log In
            </button>
          </form>
          <p className="mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="underline">
              Register here
            </Link>
          </p>
          <ToastContainer />
        </div>
         
      </div>
    
        
    </div>
  );
};
