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
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <Link to="/">
              <img
                className="h-24 w-24"
                src="https://i.ibb.co/RBv1kDP/Hanover-removebg-preview.png"
                alt=""
              />
            </Link>
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/adminHome">Admin Home</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allUser">All User</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allBookedTrip">All Booked Trip</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/biddingPending">Pending Biding</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/tripRequest">All Request</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/userHome">User Home</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/allMyTrip">All My Trip</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/requestedTruck">Requested Truck List</NavLink>
                </li>
              </>
            )}

            <hr />

            <Link>
              <button onClick={handleSignOut} className="text-black mt-5 ml-4">
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
