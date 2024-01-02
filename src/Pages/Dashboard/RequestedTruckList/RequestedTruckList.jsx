import { useContext, useEffect } from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrashAlt, FaUsers } from "react-icons/fa";


const RequestedTruckList = () => {

    const { user, loading } = useContext(AuthContext);
    const [rentData, setRentData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/rent')
            .then(response => response.json())
            .then(data => {
                const userRentData = data.filter(item => item.renterEmail === user.email && item.status == 'Pending');
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
                        <th>Name</th>
                        <th>Total Rent</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className="p-2">
                    {rentData.map((singleRentData, index) => (
                        <tr key={singleRentData._id}>
                            <td>{index + 1}</td>
                            <td><img className="h-12 w-12" src={singleRentData.truck_img} /></td>
                            <td>{singleRentData.name}</td>
                            <td>{singleRentData.totalRent}</td>
                            <td>{singleRentData.status}</td>
                         
                            <td>
                                <button
                                    onClick={() => handleDeleteItem(user)}
                                    className="btn btn-ghost btn-lg"
                                >
                                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
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
//         <div className='container mx-auto'>
//         <h1 className='font-bold text-center py-5 text-black lg:text-2xl'>My Request</h1>
//          <DataTable  className='text-center'
        
//         columns={columns}
//         data={rentData.map(item => ({
//             id: item.id,
//             image:<img className='h-16 w-16 lg:h-24 lg:w-24' src={rentData.truck_img} alt={item.name} />,
//             name: item.name,
//             rent: item.rent,
//             date: item.date,
           
//             action: <button onClick={() => handleDeleteItem(item._id)} className='btn bg-amber-500 text-xl text-black'>Delete</button>
//         }))}
       
//     />
//   <ToastContainer></ToastContainer>
//        </div>
//     )}

export default RequestedTruckList;