import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { parse, format } from 'date-fns';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const AllBookedTrip = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const { data: requests = [], refetch } = useQuery({
    queryKey: ['requests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/rent', {
        params: {
          status: 'Approved',
        },
      });
      return res.data;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = requests.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div className="flex justify-evenly ">
        <h2 className="text-3xl font-bold mt-8 mb-5">All Booked</h2>
        <h2 className="text-3xl font-bold mt-8 mb-5">Total Booked: {requests.length}</h2>
      </div>
      <div className="overflow-x-auto min-h-[600px]">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr className='text-lg font-semibold text-black '>
              <th>#</th>
              <th>Renter Name</th>
              <th>Renter Email</th>
              <th>Phone number</th>
              <th>Address</th>
              <th>Truck Name</th>
              <th>Timeslot</th>
              <th>Total Rent</th>
            </tr>
          </thead>
          <tbody className="p-2">
            {currentItems.map((request, index) => (
              <tr className='text-base text-black ' key={request._id}>
                <td>{index + 1}</td>
                <td>{request.renterName}</td>
                <td>{request.renterEmail}</td>
                <td>{request.phoneNumber}</td>
                <td>{request.address}</td>
                <td>{request.truckDetails.name}</td>
                <td>{request.bookedTimeSlot.from} <br /> {request.bookedTimeSlot.to}</td>
                <td>{request.totalAmount}</td>
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

export default AllBookedTrip;
