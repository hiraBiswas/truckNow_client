import './navbar.css'

import {  Link, NavLink } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';

const Navbar = () => {

  const {user, logOut}= useContext(AuthContext)
    const links =<>
    <li className="text-lg lg:text-xl font-semibold mr-5"><NavLink to="/">Home</NavLink></li>
    <li className="text-lg lg:text-xl font-semibold mr-5"><NavLink to="/allTruck">All Truck</NavLink></li>
    {/* <li className="text-lg lg:text-xl font-semibold mr-5"><NavLink to="/blog">Blog</NavLink></li> */}
    <li className="text-lg lg:text-xl font-semibold mr-5"><NavLink to="/contact">Contact</NavLink></li>
    {user && (
        <li className="text-lg lg:text-xl font-semibold mr-5">
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>





const handleSignOut=()=>{
     logOut()
     .then(result=>{
      console.log(result.user)
     })

     .then(error=>{
      console.error(error)
     })
}
    return (
        <div>
           <div className="navbar static bg-black">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost text-white lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="white" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className=" dropdown-content mt-3 p-2 shadow z-40 bg-white text-amber-600 rounded-box w-52 ">
       {links}
      </ul>
    </div>
    <div className="flex flex-col items-center">
        <img className="h-10 w-18 hidden lg:block" src="https://i.ibb.co/LSJFDGt/Hanover-removebg-preview-2.png" alt="" />
        <h2 className="text-white font-bold">TruckNow</h2>
    </div>
  </div>
  <div className="navbar-center hidden  lg:flex">
    <ul className=" text-white pr-5 menu-horizontal px-3">
      {links}
    </ul>
  </div>
  <div className="navbar-end ">
  {user ? (
            <div className="flex items-center">
             <div className="dropdown dropdown-hover">
  <label tabIndex={0} className="hover:underline"> <img
                src={user.photoURL} 
                alt="Profile"
                className="h-10 w-10 rounded-full mr-2"
              /></label>

</div>
             
              <span className="text-lg font-semibold hidden text-white lg:block">{user.displayName}</span>
              <Link>
                <button onClick={handleSignOut} className="btn bg-amber-500 text-white ml-3">
                  Sign Out
                </button>
              </Link>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn bg-amber-500 text-white">Login</button>
            </Link>
          )}
            
         
</div>
        </div>
        </div>
    );
};


export default Navbar;