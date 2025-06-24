import { useContext } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { BsGoogle } from 'react-icons/bs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from "react-icons/fc";



const Login = () => {

    
    const location = useLocation()
    console.log('location in login page', location)
    const navigate = useNavigate()
    const { signIn, loading, signInWithGoogle } = useContext(AuthContext)


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

  
  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate(location?.state ? location.state : '/dashboard');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      toast.error('Failed to sign in with Google');
    }
  };


    return (

        <div className="  mb-10 " >
            <div className="max-w-sm lg:max-w-3xl mx-auto"  >
                <h2 className="text-2xl font-bold text-black py-5 text-center lg:py-12    lg:text-4xl ">Login Here !</h2>
                <div className="flex drop-shadow rounded-xl">

                    <form onSubmit={handleLogin} className="py-5 px-5 flex-1 bg-white" >
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
          <button className="btn bg-amber-500 text-black border-none drop-shadow">Login</button>
          
        </div>

        <div className="form-control mt-6">
          <button onClick={handleGoogleLogin}  className="btn btn-outline border-2 border-amber-500 hover:bg-amber-500 hover:text-black hover:border-none "> <FcGoogle className="text-xl" /> Login With Google</button>
        </div>


        <p className="py-3 text-lg">Create an account. <NavLink to="/register" className="text-amber-500 font-bold">Sign Up.</NavLink>now</p>
                    </form>

                  <div className="flex-1 h-full">
                     <img className="h-[430px] w-96" src="https://i.ibb.co/x68YNsS/images-2.png" alt="" />
                  </div>
                </div>
            </div>

        </div>


    );
};

export default Login;