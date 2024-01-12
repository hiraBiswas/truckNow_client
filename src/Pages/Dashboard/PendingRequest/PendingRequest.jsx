import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashAlt } from 'react-icons/fa';
import { GrUpdate } from 'react-icons/gr';

const PendingRequest = () => {
  const { user, loading } = useContext(AuthContext);
  const [rentData, setRentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Change this to show the desired number of items per page

  useEffect(() => {
    fetch('http://localhost:5000/rent')
      .then(response => response.json())
      .then(data => {
        const userRentData = data.filter(item => item.renterEmail === user.email && item.status === 'pending');
        setRentData(userRentData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [user.email]);

  console.log(rentData);

  const handleDeleteItem = (itemId) => {
    fetch(`http://localhost:5000/rent/${itemId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response) {
          const remainingData = rentData.filter(dataItem => dataItem._id !== itemId);
          toast.success('Deleted Successfully');
          setRentData(remainingData);
        } else {
          toast.error('Failed to Delete');
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

    return timeDifferenceInHours <= 24;
  };

  const totalItems = rentData.length;
  const lastPage = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl font-bold mt-8 mb-5">Pending Requests</h2>
      </div>
      <div className="overflow-x-auto min-h-[600px]">
        <table className="table table-zebra max-w-9xl">
          {/* head */}
          <thead>
            <tr>
              <th className='text-lg font-semibold text-black '>#</th>
              <th className='text-lg font-semibold text-black '>Image</th>
              <th className='text-lg font-semibold text-black '>Truck Name</th>
              <th className='text-lg font-semibold text-black '>Time slot</th>
              <th className='text-lg font-semibold text-black '>Address</th>
              <th className='text-lg font-semibold text-black '>Phone Number</th>
              <th className='text-lg font-semibold text-black '>Total Rent</th>
              <th className='text-lg font-semibold text-black '>Update</th>
              <th className='text-lg font-semibold text-black '>Delete</th>
            </tr>
          </thead>
          <tbody className="p-2">
            {rentData
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((singleRentData, index) => (
                <tr key={singleRentData._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img className="h-12 w-12" src={singleRentData.truckDetails.img} alt="" />
                  </td>
                  <td>{singleRentData.truckDetails.name}</td>
                  <td>
                    {singleRentData.bookedTimeSlot.from} - <br />
                    {singleRentData.bookedTimeSlot.to}
                  </td>
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
      <div className="flex justify-center mt-4 className='text-lg font-semibold text-black '">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4">
          Page {currentPage} of {lastPage}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, lastPage))}
          disabled={currentPage === lastPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PendingRequest;
