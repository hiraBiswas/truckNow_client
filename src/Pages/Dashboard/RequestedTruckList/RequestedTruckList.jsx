import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RequestedTruckList = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const navigate = useNavigate()

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
      toast.success('Request is approved');
      navigate('/dashboard/allBooking')
    } catch (error) {
      console.error(error);
      // Handle errors if necessary
    }
  };

  const handleRejectRequest = async (request) => {
    try {
      await axiosSecure.patch(`/rent/reject/${request._id}`, { status: 'Rejected' });
      refetch();
      toast.success('Request is rejected');
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = requests.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl font-bold mt-8 mb-5">All Requests</h2>
        <h2 className="text-3xl font-bold mt-8 mb-5">Total Requests: {requests.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr className='text-lg font-semibold text-black '>
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
            {currentItems.map((request, index) => (
              <tr className='text-base text-black ' key={request._id}>
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
                    >
                      Approve
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
      <ToastContainer />
      <div className="flex justify-center mt-4 text-lg font-semibold text-black ">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4">
          Page {currentPage} of {Math.ceil(requests.length / itemsPerPage)}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(requests.length / itemsPerPage)))}
          disabled={currentPage === Math.ceil(requests.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RequestedTruckList;
