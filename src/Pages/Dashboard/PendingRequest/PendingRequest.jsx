import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";



const PendingRequest = () => {
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
        onClick={() => handleDeleteItem(singleRentData._id)}
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

export default PendingRequest;


// const AllRequest = () => {
//     const axiosSecure = useAxiosSecure();
//     const { data: requests = [], refetch } = useQuery({
//         queryKey: ['requests'],
//         queryFn: async () => {
//             const res = await axiosSecure.get('/rent', {
//                 params: {
//                     status: 'pending',
//                 },
//             });
//             return res.data;
//         }
//     });

//     const handleApproveRequest = async (request) => {
//         // Update status to "Approved" and move to bookedCollection
//         const updatedRequest = {
//             ...request,
//             status: 'Approved',

//         };

//         try {
//             // Update the status to "Approved" in the rent collection
//             await axiosSecure.patch(`/rent/approve/${request._id}`, updatedRequest);

//             // Show success popup
//             refetch();
//             toast.success('Request is approved')
//         } catch (error) {
//             console.error(error);
//             // Handle errors if necessary
//         }
//     };

//     const handleRejectRequest = async (request) => {
//         try {

//             await axiosSecure.patch(`/rent/reject/${request._id}`, { status: 'Rejected' });


//             refetch();
//             toast.success('Request is rejected')
//         } catch (error) {
//             console.error(error);

//         }
//     };


//     return (
//         <div>
//             <div className="flex justify-evenly my-4">
//                 <h2 className="text-3xl">All Requests</h2>
//                 <h2 className="text-3xl">Total Requests: {requests.length}</h2>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="table table-zebra w-full">
//                     {/* head */}
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Renter Name</th>
//                             <th>Phone number</th>
//                             <th>Address</th>
//                             <th>Truck Name</th>
//                             <th>Rent Duration</th>
//                             <th>Total Rent</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody className="p-2">
//                         {requests.map((request, index) => (
//                             <tr key={request._id}>
//                                 <td>{index + 1}</td>
//                                 <td>{request.renterName}</td>
//                                 <td>{request.phoneNumber}</td>
//                                 <td>{request.address}</td>
//                                 <td>{request.truckDetails.name}</td>
//                                 <td>{request.bookedTimeSlot.from} - <br />{request.bookedTimeSlot.to}</td>
//                                 <td>{request.totalAmount}</td>
//                                 <td className="p-2">
//                                     {request.type === "admin" ? (
//                                         'Admin'
//                                     ) : (
//                                         <button
//                                             onClick={() => handleApproveRequest(request)}
//                                             className="bg-green-800 btn text-white hover:text-black"
//                                         > Approve

//                                         </button>
//                                     )}
//                                 </td>
//                                 <td>
//                                     <button
//                                         onClick={() => handleRejectRequest(request)}
//                                         className="btn bg-red-500 text-white"
//                                     >
//                                         Reject
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>

//                 </table>
               
//             </div>
//             <ToastContainer></ToastContainer>
//         </div>
//     );
// };


// export default AllRequest;