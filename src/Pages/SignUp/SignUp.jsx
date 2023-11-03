import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const SignUp = () => {
    const {createUser} = useContext(AuthContext)

    const handleSignUp = e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password)
        

        createUser(email, password)
        .then(result=>{
            const user = result.user;
            console.log(user)
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
           <h1 className='text-3xl font-bold text-center pb-12'>Sign Up</h1>
            <form onSubmit={handleSignUp} className="card-body">
            <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="name" placeholder="name" name="name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input type="password" placeholder="password" name="password" className="input input-bordered" required />
              
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-orange-500">Sign Up</button>
              </div>
            </form>
            <p>Already Have an Account? <Link to="/login" className='text-xl text-orange-500'>Sign In</Link> here.</p>
           </div>
          </div>
        </div>
      </div>
    );
};

export default SignUp;