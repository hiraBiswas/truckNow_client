import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
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
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import AdminRoute from "./AdminRoute";
import AllBookedTrip from "../Pages/Dashboard/AllBookedTrip/AllBookedTrip";
import AllUser from "../Pages/Dashboard/AllUser/AllUser";
import BiddingPending from "../Pages/Dashboard/BiddingPending/BiddingPending";
import TripRequest from "../Pages/Dashboard/TripRequest/TripRequest";
import RequestedTruckList from "../Pages/Dashboard/RequestedTruckList/RequestedTruckList";

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
            path: '/details/:id',
            element: <Details></Details>,
            loader: ({ params }) => fetch(`http://localhost:5000/truck/${params.id}`)
          },

          {
            path: 'truck/rentForm/:id',
            element:<RentForm></RentForm>,
            loader: ({ params }) => fetch(`http://localhost:5000/truck/${params.id}`)
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
          path: 'requestedTruck',
          element: <RequestedTruckList></RequestedTruckList>
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