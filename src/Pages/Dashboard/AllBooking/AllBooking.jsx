
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { parse ,format} from 'date-fns';
import axios from 'axios'; 

const AllBookedTrip = () => {
    const axiosSecure = useAxiosSecure();
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
                               
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};



export default AllBookedTrip;