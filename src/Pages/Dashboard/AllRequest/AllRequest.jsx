
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { parse, format } from 'date-fns';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from "react-toastify";

const AllRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { data: requests = [], refetch } = useQuery({
        queryKey: ['requests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/rent', {
                params: {
                    status: 'pending',
                },
            });
            return res.data;
        }
    });

    const handleApproveRequest = async (request) => {
        // Update status to "Approved" and move to bookedCollection
        const updatedRequest = {
            ...request,
            status: 'Approved',

        };

        try {
            // Update the status to "Approved" in the rent collection
            await axiosSecure.patch(`/rent/approve/${request._id}`, updatedRequest);

            // Show success popup
            refetch();
            toast.success('Request is approved')
        } catch (error) {
            console.error(error);
            // Handle errors if necessary
        }
    };

    const handleRejectRequest = async (request) => {
        try {

            await axiosSecure.patch(`/rent/reject/${request._id}`, { status: 'Rejected' });


            refetch();
            toast.success('Request is rejected')
        } catch (error) {
            console.error(error);

        }
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
                            <th>Phone number</th>
                            <th>Address</th>
                            <th>Truck Name</th>
                            <th>Rent Duration</th>
                            <th>Total Rent</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="p-2">
                        {requests.map((request, index) => (
                            <tr key={request._id}>
                                <td>{index + 1}</td>
                                <td>{request.renterName}</td>
                                <td>{request.phoneNumber}</td>
                                <td>{request.address}</td>
                                <td>{request.truckDetails.name}</td>
                                <td>{request.bookedTimeSlot.from} - <br />{request.bookedTimeSlot.to}</td>
                                <td>{request.totalAmount}</td>
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
                                        onClick={() => handleRejectRequest(request)}
                                        className="btn bg-red-500 text-white"
                                    >
                                        Reject
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


export default AllRequest;