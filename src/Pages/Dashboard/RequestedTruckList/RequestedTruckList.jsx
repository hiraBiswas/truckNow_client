import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";


const RequestedTruckList = () => {

    const { user, loading } = useContext(AuthContext);
    const [rentData, setRentData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/rent')
            .then(response => response.json())
            .then(data => {
                const userRentData = data.filter(item => item.renterEmail === user.email && item.status == 'pending');
                setRentData(userRentData);
              
            })
            .catch(error => {
                console.error('Error fetching  data:', error);
            });
    }, []);
    
   

   console.log(rentData)
    const handleDeleteItem = (itemId) => {
        fetch(`http://localhost:5000/rent/${itemId}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response) {
                    const remainingData = rentData.filter(dataItem => dataItem._id !== itemId);
                    toast.success('Deleted Successfully')
                    setRentData(remainingData);
                } else {
                  toast.error('Failed to Delete')
                }
            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
    };
    const handleUpdateItem = (itemId, createdAt) => {
        // Handle update logic here
        console.log(`Update item with ID ${itemId} created at ${createdAt}`);
    };

    const isWithin0_2Hours = (createdAt) => {
        const currentDate = new Date();
        const createdDate = new Date(createdAt);
        const timeDifferenceInHours = (currentDate - createdDate) / (1000 * 60 * 60);
    
        console.log('Time difference in hours:', timeDifferenceInHours);

        return timeDifferenceInHours <= 24
    };



    return (
        <div>
        <div className="flex justify-evenly my-4">
            <h2 className="text-3xl">My Requests</h2>
           
        </div>
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Truck Name</th>
                        <th>Time slot</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Total Rent</th> 
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody className="p-2">
                    {rentData.map((singleRentData, index) => (
                        <tr key={singleRentData._id}>
                            <td>{index + 1}</td>
                            <td><img className="h-12 w-12" src={singleRentData.truckDetails.img} /></td>
                            <td>{singleRentData.truckDetails.name}</td>
                            <td>{singleRentData.bookedTimeSlot.from} - <br />{singleRentData.bookedTimeSlot.to} </td>
                            <td>{singleRentData.address}</td>
                            <td>{singleRentData.phoneNumber}</td>
                            <td>{singleRentData.totalAmount}</td>
                            
                         
                            <td>
                            <Link to={`/dashboard/updateRequest/${singleRentData._id}`}>
                                 <button
                                        onClick={() => handleUpdateItem(singleRentData._id, singleRentData.createdAt)}
                                        className="btn btn-ghost"
                                        disabled={!isWithin0_2Hours(singleRentData.createdAt)}
                                    >
                                        Update
                                        <GrUpdate className="text-amber-500"></GrUpdate>
                                    </button>
                                    </Link>
                            </td>

                            <td>
                           <button
                                    onClick={() => handleDeleteItem(user)}
                                    className="btn btn-ghost btn-lg"
                                >
                                   
                                    <FaTrashAlt className="text-amber-500"></FaTrashAlt>
                                </button>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <ToastContainer></ToastContainer>
    </div>
);
};
    

export default RequestedTruckList;