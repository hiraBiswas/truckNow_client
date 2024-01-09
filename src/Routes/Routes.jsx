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
import AllBooking from "../Pages/Dashboard/AllBooking/AllBooking";
import AllUser from "../Pages/Dashboard/AllUser/AllUser";
import RequestedTruckList from "../Pages/Dashboard/RequestedTruckList/RequestedTruckList";
import AllRequest from "../Pages/Dashboard/AllRequest/AllRequest";
import AddNewTruck from "../Pages/Dashboard/AddNewTruck/AddNewTruck";
import ManageTruck from "../Pages/Dashboard/ManageTruck/ManageTruck";
import UpdateTruck from "../Pages/Dashboard/UpdateTruck/UpdateTruck";
import Contact from "../Pages/Contact/Contact";
import UpdateRequest from "../Pages/Dashboard/UpdateRequest/UpdateRequest";



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
          path: 'contact',
          element: <Contact></Contact>
        },

       

        {
            path: '/details/:id',
            element: <PrivateRoute><Details></Details></PrivateRoute>,
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
        
        {
          path: 'updateRequest/:id',
          element: <UpdateRequest></UpdateRequest>,
          loader: ({params}) => fetch(`http://localhost:5000/rent/${params.id}`)
        },

        // admin only routes
        {
          path: 'adminHome',
          element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path: 'allBooking',
          element: <AllBooking></AllBooking>
        
        },
        {
            path: 'allRequest',
            element: <AllRequest></AllRequest>
           
          },
        {
          path: 'allUser',
          element: <AllUser></AllUser>
        },

        {
          path: 'addTruck',
         element:<AddNewTruck></AddNewTruck>
        },

        {
          path:'manageTruck',
          element:<ManageTruck></ManageTruck>
        }
        ,
        {
          path: 'updateTruck/:id',
          element:<UpdateTruck></UpdateTruck>,
          loader: ({params}) => fetch(`http://localhost:5000/truck/${params.id}`)
        },
       
      ]
    }
  ]);