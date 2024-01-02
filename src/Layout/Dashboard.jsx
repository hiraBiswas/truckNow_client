import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";

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
          <ul className="menu p-4 w-80 min-h-full bg-amber-100 text-base-content">
            {/* Sidebar content here */}
            <Link to="/">
              <img className="h-12 w-20" src="https://i.ibb.co/LSJFDGt/Hanover-removebg-preview-2.png" alt="" />
              <h3 className="text-2xl font-bold text-black pb-5">TruckNow</h3>
            </Link>
            {isAdmin ? (
              <>
                <li className="font-bold">
                  <NavLink to="/dashboard/adminHome">Admin Home</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allUser">All User</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addTruck">Add Truck</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageTruck">Manage Truck</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allBooking">All Booking</NavLink>
                </li>
              
                <li>
                  <NavLink to="/dashboard/allRequest">All Request</NavLink>
                </li>

              
              </>
            ) : (
              <>
                <li className="font-bold">
                  <NavLink to="/dashboard/userHome">User Home</NavLink>
                </li>
                <li className="font-bold">
                  <NavLink to="/dashboard/allMyTrip">All My Trip</NavLink>
                </li>
                <li className="font-bold">
                  <NavLink to="/dashboard/requestedTruck">Requested Truck List</NavLink>
                </li>
              </>
            )}

            <hr />

            <Link to="/"><h3 className="font-bold ml-4 mt-5">Home</h3></Link>

            <Link>
              <button onClick={handleSignOut} className="text-black pt-2 ml-4 font-bold">
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
