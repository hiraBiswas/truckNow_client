import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import RequestedTruck from "../Pages/RequestedTruck/Requestedtruck";
import PrivateRoute from './PrivateRoute'
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllTruck from "../Pages/AllTruck/AllTruck";
import Details from "../Pages/Details/Details";
import RentForm from "../Pages/RentForm/RentForm";
import Dashboard from "../Layout/Dashboard";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AllMyTrip from "../Pages/Dashboard/AllMyTrip/AllMyTrip";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import RequestedTrip from "../Pages/Dashboard/RequestedTrip/RequestedTrip";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import AdminRoute from "./AdminRoute";
import AllBookedTrip from "../Pages/Dashboard/AllBookedTrip/AllBookedTrip";
import AllUser from "../Pages/Dashboard/AllUser/AllUser";
import BiddingPending from "../Pages/Dashboard/BiddingPending/BiddingPending";
import TripRequest from "../Pages/Dashboard/TripRequest/TripRequest";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage> ,
      children: [
        {
            path: '/',
            element: <Home></Home>
        }, 
        {
          path: 'allTruck',
          element:<AllTruck></AllTruck>
         
        },
       
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'register',
          element: <Register></Register>
        },
        {
            path: 'register',
            element: <AllTruck></AllTruck>
          },
        
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        // normal user routes
        {
          path: 'userHome',
          element: <UserHome></UserHome>
        },
        {
          path: 'allMyTrip',
          element: <AllMyTrip></AllMyTrip>
        },
        {
          path: 'requestedTrip',
          element: <RequestedTrip></RequestedTrip>
        },
        

        // admin only routes
        {
          path: 'adminHome',
          element:<AdminHome></AdminHome>
        },
        {
          path: 'allBookedTrip',
          element: <AllBookedTrip></AllBookedTrip>
        
        },
        {
            path: 'tripRequest',
            element: <TripRequest></TripRequest>
           
          },
        {
          path: 'allUser',
          element: <AllUser></AllUser>
        },

        {
            path: 'biddingPending',
            element: <BiddingPending></BiddingPending>
          },
       
      ]
    }
  ]);