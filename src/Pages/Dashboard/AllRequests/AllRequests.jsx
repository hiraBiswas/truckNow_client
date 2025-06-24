import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrashAlt } from "react-icons/fa";

const AllRequests = () => {
  const { user } = useContext(AuthContext);
  const [rentData, setRentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    fetch("https://car-doctor-server-v1-sigma.vercel.app/rent")
      .then((response) => response.json())
      .then((data) => {
        const userRentData = data
          .filter((item) => item.renterEmail === user.email)
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setRentData(userRentData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [user.email]);

  console.log(rentData);

  //   const handleDeleteItem = (itemId) => {
  //     fetch(http://localhost:5000/rent/${itemId}, {
  //       method: 'DELETE',
  //     })
  //       .then(response => {
  //         if (response) {
  //           const remainingData = rentData.filter(dataItem => dataItem._id !== itemId);
  //           toast.success('Deleted Successfully');
  //           setRentData(remainingData);
  //         } else {
  //           toast.error('Failed to Delete');
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error deleting item:', error);
  //       });
  //   };

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl font-bold mt-8 mb-5">All Requests </h2>
      </div>
      <div className="max-w-7xl min-h-[600px]">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="text-lg font-semibold text-black ">#</th>
              <th className="text-lg font-semibold text-black ">Image</th>
              <th className="text-lg font-semibold text-black ">Truck Name</th>
              <th className="text-lg font-semibold text-black ">Time slot</th>
              <th className="text-lg font-semibold text-black ">Address</th>
              <th className="text-lg font-semibold text-black ">
                Phone Number
              </th>
              <th className="text-lg font-semibold text-black ">Total Rent</th>
              <th className="text-lg font-semibold text-black ">Status</th>
            </tr>
          </thead>
          <tbody className="p-2 ">
            {rentData.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="text-center text-lg text-gray-600 py-10"
                >
                  No requests found.
                </td>
              </tr>
            ) : (
              rentData
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((singleRentData, index) => (
                  <tr
                    className="text-base text-black "
                    key={singleRentData._id}
                  >
                    <td>{index + 1}</td>
                    <td>
                      <img
                        className="h-12 w-16"
                        src={singleRentData.truckDetails.img}
                        alt=""
                      />
                    </td>
                    <td>{singleRentData.truckDetails.name}</td>
                    <td>
                      {singleRentData.bookedTimeSlot.from} - <br />
                      {singleRentData.bookedTimeSlot.to}
                    </td>
                    <td>{singleRentData.address}</td>
                    <td>{singleRentData.phoneNumber}</td>
                    <td>{singleRentData.totalAmount}</td>
                    <td>{singleRentData.status}</td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer></ToastContainer>
      <div className="flex justify-center mt-4 text-lg font-semibold text-black ">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4">
          Page {currentPage} of {Math.ceil(rentData.length / itemsPerPage)}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(rentData.length / itemsPerPage))
            )
          }
          disabled={currentPage === Math.ceil(rentData.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllRequests;
