import { useContext, useEffect } from "react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';

const RequestedTruck = () => {
    const { user, loading } = useContext(AuthContext);
    const [rentData, setRentData] = useState([]);
    const loadedData = useLoaderData();
    const {name, quantity, date, img} = loadedData;
    console.log(loadedData);

    useEffect(() => {
        fetch('http://localhost:5000/rent')
            .then(response => response.json())
            .then(data => {
                const userRentData = data.filter(item => item.buyerEmail === user.email);
                setRentData(userRentData);
            })
            .catch(error => {
                console.error('Error fetching  data:', error);
            });
    }, []);

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

    const columns = [
        {
            name: 'Image',
            selector: row => row.image,
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Rent',
            selector: row => row.rent,
        },
        {
            name: 'Date',
            selector: row => row.date,
        },
        
        {
            name: 'Action',
            selector: row => row.action,
        },
    ];

    
    return (
        <div className='container mx-auto'>
        <h1 className='font-bold text-center py-5 text-white lg:text-2xl'>My Order</h1>
         <DataTable  className='text-center'
        
        columns={columns}
        data={rentData.map(item => ({
            id: item.id,
            image:<img className='h-16 w-16 lg:h-24 lg:w-24' src={item.img} alt={item.name} />,
            name: item.name,
            rent: item.rent,
            date: item.date,
           
            action: <button onClick={() => handleDeleteItem(item._id)} className='btn bg-amber-500 text-xl text-black'>Delete</button>
        }))}
       
    />
  <ToastContainer></ToastContainer>
       </div>
    )}
export default RequestedTruck;