
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { parse ,format} from 'date-fns';
import axios from 'axios'; 

const AllRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { data: requests = [], refetch } = useQuery({
      queryKey: ['requests'],
      queryFn: async () => {
        const res = await axiosSecure.get('/rent', {
          params: {
            status: 'Pending', 
          },
        });
        return res.data;
      }
    });

    const handleApproveRequest = (request) => {
        // Update status to "Approved" and move to bookedCollection
        const updatedRequest = {
          ...request,
          status: 'Approved',
        };
      
        axiosSecure.patch(`/rent/approve/${request._id}`, updatedRequest).then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount > 0) {
            // Move the record to bookedCollection
            axios.post('/booked', updatedRequest).then((response) => {
              console.log(response.data);
              console.log(updatedRequest)
              refetch();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Request is Approved and moved to bookedCollection!`,
                showConfirmButton: false,
                timer: 1500,
              });
            });
          }
        });
      };
    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                        });
                    }
                });
            }
        });
    };

    return (
        <div>
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Requests</h2>
                <h2 className="text-3xl">Total Requests: {requests.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Renter Name</th>
                            <th>Renter Email</th>
                            <th>Phone number</th>
                            <th>Address</th>
                            <th>Truck Name</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Total Rent</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="p-2">
                        {requests.map((request, index) => (
                            <tr key={request._id}>
                                <td>{index + 1}</td>
                                <td>{request.renterName}</td>
                                <td>{request.renterEmail}</td>
                                <td>{request.phone}</td>
                                <td>{request.address}</td>
                                <td>{request.name}</td>
                               <td>{request.startDate}</td>
                               <td>{request.endDate}</td>
                                <td>{request.totalRent}</td>
                                <td className="p-2">
                                    {request.type === "admin" ? (
                                        'Admin'
                                    ) : (
                                        <button
                                            onClick={() => handleApproveRequest(request)}
                                            className="bg-green-800 btn text-white hover:text-black"
                                        > Approve
                                           
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(request)}
                                        className="btn btn-ghost "
                                    >
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default AllRequest;