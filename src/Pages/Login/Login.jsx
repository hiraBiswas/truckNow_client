import { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { BsGoogle } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SocialLogin from "./SocialLogin.jsx";


const Login = () => {

   
    const location = useLocation()
    console.log('location in login page', location)
    const navigate = useNavigate()
    const { signIn, loading } = useContext(AuthContext)


    const handleLogin = async (e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      const email = form.get('email');
      const password = form.get('password');
  
      try {
          await signIn(email, password);
          navigate(location?.state ? location.state : '/');
      } catch (error) {
          console.error("Login Error:", error.message);
          toast.error(error.message);
      }
  };
    return (

        <div className=" max-w-md m-2 lg:mx-auto shadow-drop mb-10">
            <div className="max-w-sm lg:max-w-3xl mx-auto"  >
                <h2 className="text-2xl font-bold text-black py-5 text-center lg:pt-12   lg:text-4xl ">Login Here !</h2>
                <div className="flex ">
                    <form onSubmit={handleLogin} className="py-5 flex-1" >
                    <div className="form-control">
          <label className="label">
            <span className="label-text text-xl font-medium">Email</span>
          </label>
          <input type="email" placeholder="email" name="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label ">
            <span className="label-text text-xl font-medium">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" name="password" required />
        
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-amber-600 text-white">Login</button>
        </div>

        <p className="py-3 text-lg">Create an account. <NavLink to="/register" className="text-amber-500 font-bold">Sign Up.</NavLink>now</p>
                    </form>
{/* 
                    <div className="flex-1 h-full">
                        <img className="h-[430px]" src="https://i.postimg.cc/jSHMzwjw/1000-F-282091909-OKTHM5-TJG5-Fa-KYRklh8-IFL9073x-NSt-Bg-1-c0-ESK6-Vd-C-transformed.jpg" alt="" />
                    </div> */}
                </div>
            </div>

        </div>


    );
};

export default Login;