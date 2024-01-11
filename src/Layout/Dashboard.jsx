import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { AiFillHome } from "react-icons/ai";
import { FaBorderAll } from "react-icons/fa";
import { FaTruckMoving } from "react-icons/fa";
import './dashboad.css'
import { MdSpaceDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { PiUsersFill } from "react-icons/pi";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
  const { user, logOut } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut()
      .then(result => {
        console.log(result.user);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="flex">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center ">
        <div className="">
        <Outlet />
      </div>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className=" p-4 w-80 min-h-full bg-black text-white text-lg lg:text-xl font-semibold mr-5 ">
            {/* Sidebar content here */}
            <Link to="/">
              <img className="h-12 w-20" src="https://i.ibb.co/LSJFDGt/Hanover-removebg-preview-2.png" alt="" />
              <h3 className="text-2xl font-bold text-black pb-5">TruckNow</h3>
            </Link>
            {isAdmin ? (
              <>
                <li className=" hover:text-amber-500 flex flex-row pt-3 py-1 ">
                <NavLink className="hover:text-amber-500 flex justify-center items-center gap-3" to="/dashboard/adminHome"> <MdSpaceDashboard className="text-xl text-white hover:text-amber-500" />   Dashboard</NavLink>
                </li>
                <li className=" hover:text-amber-500 flex flex-row py-1 ">
                  <NavLink className="hover:text-amber-500 flex items-center gap-3 "
                   to="/dashboard/allUser">
                    <PiUsersFill className="text-xl text-white hover:text-amber-500"/>
                    All User
                    </NavLink>
                </li>
                <li className="font-semibold hover:text-amber-500 py-1">
                  <NavLink className="hover:text-amber-500 flex items-center gap-3" to="/dashboard/addTruck"> <MdOutlineAddCircleOutline className="text-xl text-white hover:text-amber-500" />Add Truck</NavLink>
                </li>
                <li className="font-semibold hover:text-amber-500 py-1">
                  <NavLink className="hover:text-amber-500 flex items-center gap-3" to="/dashboard/manageTruck"><MdEdit className="text-xl text-white hover:text-amber-500"/>Manage Truck</NavLink>
                </li>
                <li className="font-semibold hover:text-amber-500 py-1">
                  <NavLink className="hover:text-amber-500 flex items-center gap-3" to="/dashboard/allBooking"><TbBrandBooking className="text-xl text-white hover:text-amber-500"/> All Booking</NavLink>
                </li>
              
                <li className="font-semibold hover:text-amber-500 py-1 pb-3">
                  <NavLink className="hover:text-amber-500 flex items-center gap-3" to="/dashboard/allRequest"> <FaBorderAll className="text-xl text-white hover:text-amber-500" /> All Request</NavLink>
                </li>

              
              </>
            ) : (
              <>
                <li className=" hover:text-amber-500 flex flex-row pt-3 py-2 ">
                <NavLink className="hover:text-amber-500 flex justify-center items-center gap-3" to="/dashboard/userHome"> <MdSpaceDashboard className="text-xl text-white hover:text-amber-500" />   Dashboard</NavLink>
                </li>
                <li className="hover:text-amber-500 flex flex-row py-2 ">
                  <NavLink className="hover:text-amber-500 flex justify-center items-center gap-3" to="/dashboard/allMyTrip"><FaBorderAll className="text-xl text-white hover:text-amber-500" /> All My Trip</NavLink>
                </li>
                <li className="hover:text-amber-500 flex flex-row py-2 pb-3">
                  <NavLink className="hover:text-amber-500 flex justify-center items-center gap-3" to="/dashboard/requestedTruck"><FaTruckMoving className="text-xl text-white hover:text-amber-500"  /> Requested Truck List</NavLink>
                </li>
              </>
            )}

            <hr />

            <Link className="hover:text-amber-500 flex flex-row gap-3 items-center mt-4 pb-2" to="/"><AiFillHome className="text-xl text-white hover:text-amber-500" /><h3 className="font-semibold">Home</h3></Link>

            < Link className="flex items-center gap-3">
            <IoIosLogOut className="text-xl text-white hover:text-amber-500"  />
              <button onClick={handleSignOut} className=" text-white  font-semibold hover:text-amber-500">
              
 Logout
              </button>
            </Link>
          </ul>
        </div>
      </div>
      {/* Main content */}
    
    </div>
  );
};

export default Dashboard;
