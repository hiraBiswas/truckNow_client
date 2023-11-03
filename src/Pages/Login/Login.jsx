
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import axios from 'axios';
const Login = () => {

  const {signIn} = useContext(AuthContext)
  const location = useLocation()
  const navigate = useNavigate()
  console.log(location);

 const handleLogin = e =>{
  e.preventDefault();
    const form =e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password)

    signIn(email, password)
    .then(result=>{
      const loggedInUser= result.user;
      console.log(loggedInUser)
      const user ={email}
      console.log('Login Complete')
      // navigate(location?.state?location?.state:'/')
     axios.post('http://localhost:5900/jwt', user, {withCredentials:true})
     .then(res=>{
      console.log(res.data)
      if(res.data.success){
        navigate(location?.state?location?.state:'/')

      }
     })
    })
    .catch(error=>{
      console.error(error)
    })
    
 }

    return (
        <div className="hero min-h-screen ">
        <div className="hero-content flex-col lg:flex-row ">
          <div className="text-center w-1/2 lg:text-left">
           <img src={img} alt="" />
          </div>
          <div className="card flex-shrink-0 w-1/2 shadow-2xl bg-base-100">
           <div className='p-16'>
           <h1 className='text-3xl font-bold text-center pb-12'>Login</h1>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" name="password" className="input input-bordered" required />
              
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-orange-500">Sign In</button>
              </div>
            </form>
            <p>New to Car doctor? <Link to="/signUp" className='text-xl text-orange-500'>Sign Up</Link> here.</p>
           </div>
          </div>
        </div>
      </div>
    );
};

export default Login;