import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from "../../../Providers/AuthProvider";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { DatePicker, Space } from 'antd';
import { format, parse, differenceInHours } from 'date-fns'; // Import date-fns functions
import { enUS } from 'date-fns/locale'; // Import locale if needed 
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useNavigate } from 'react-router-dom';



const UpdateRequest = () => {
    const {user,loading} = useContext(AuthContext)
    const [rentDetails, setRentDetails] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id)
   
    useEffect(() => {
        const fetchRentDetails = async () => {
            try {
                // Check if id is defined before making the API call
                if (id) {
                    const response = await fetch(`https://car-doctor-server-v1-sigma.vercel.app/rent/${id}`);
                    
                    // Check if the response status is OK (200)
                    if (response.ok) {
                        const data = await response.json();
                        console.log("Rent details:", data);  // Add this log to check the fetched data
                        setRentDetails(data);
    
                    } else {
                        console.error(`Error fetching rent details: ${response.status}`);
                       
                    }
                }
            } catch (error) {
                console.error('Error fetching rent details:', error);
            }
        };
    
        fetchRentDetails();
    }, [id]);

    const truckDetails = rentDetails.truckDetails || {}; 
    
    const {
        address: pastAddress,
        bookedTimeSlot,
        phoneNumber: pastPhoneNumber,
        totalAmount: initialAmount,
    } = rentDetails;

console.log(pastPhoneNumber)

const { RangePicker } = DatePicker;
const [from, setForm] = useState();
const [to, setTo] = useState();
const [phoneNumber, setPhoneNumber] = useState(pastPhoneNumber);
const [address, setAddress] = useState(pastAddress);
const [totalHours, setTotalHours] = useState(0);
const [totalAmount, setTotalAmount] = useState(0)
const currentDate = new Date();


const selectTimeSlots = (values) => {
    console.log(values);

    // Convert moment objects to JavaScript Date objects
    const startDate = values[0].toDate();
    const endDate = values[1].toDate();

    // Use date-fns format function
    const formattedStartDate = format(startDate, 'MMM dd yyyy HH:mm', { locale: enUS });
    const formattedEndDate = format(endDate, 'MMM dd yyyy HH:mm', { locale: enUS });

    setForm(formattedStartDate)
    setTo(formattedEndDate)

};
useEffect(() => {
    if (from && to && truckDetails && truckDetails.rent) {
        console.log(truckDetails.rent);
        const hoursDifference = differenceInHours(to, from);
        setTotalHours(hoursDifference);
        setTotalAmount(hoursDifference * truckDetails.rent);
        console.log(hoursDifference);
    }
}, [from, to, truckDetails]);

const phoneNumberRef = useRef();
const addressRef = useRef();
const handleUpdateRequest = async (event) => {
    event.preventDefault();
    const form = event.target;
    const phoneNumber = phoneNumberRef.current.value;
    const address = addressRef.current.value;
    console.log(phoneNumber)
    // Check if from and to are both defined and not empty strings
    if (!from || !to) {
        toast.error('Please select a valid time slot');
        return;
    }

    // Check for overlapping time slots
    const enteredTimeSlot = { from, to };
    if (truckDetails.bookedTimeSlots && truckDetails.bookedTimeSlots.length > 0) {
        const isOverlapping = truckDetails.bookedTimeSlots.some((bookedSlot) => {
            return (
                (enteredTimeSlot.from < bookedSlot.to && enteredTimeSlot.to > bookedSlot.from) ||
                (bookedSlot.from < enteredTimeSlot.to && bookedSlot.to > enteredTimeSlot.from)
            );
        });

        if (isOverlapping) {
            toast.error('Selected time slot overlaps with existing bookings. Please choose another time.');
            return;
        }
    }

  

    const updatedRent = {
       
        bookedTimeSlot: enteredTimeSlot,
        totalAmount,
        phoneNumber,
        address,
    };

    console.log(updatedRent)

    try {
        const response = await fetch(`https://car-doctor-server-v1-sigma.vercel.app/rent/${id}`, {
            method:  'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedRent),
        });

        if (response.ok) {
            toast.success('Rent data updated successfully');
            navigate('/dashboard/pendingRequest');
        } else {
            toast.error(`Failed to update rent data: ${response.status}`);
        }
    } catch (error) {
        console.error('Error updating rent data:', error);
        toast.error('Failed to update rent data. Please try again.');
    }
};


    return (
        <div className='container mx-auto'>
        <div className='mt-16 '>
            <h2 className='text-3xl font-bold text-center mb-8'>Update Rent Info</h2>
        

            <div className="flex flex-col  ">
              <form  action="">
              <div className='form-control'>
                    <h2 className='text-lg font-semibold pb-2'>Phone Number: </h2>
                    <input name='phoneNumber'  ref={phoneNumberRef}  type="text" placeholder="Type here"   defaultValue={pastPhoneNumber}
       className="input input-bordered w-full max-w-2xl focus:border-none" />
       
                   

                </div>

                <div className="my-4 form-control">
                    <h2 className='text-lg font-semibold pb-2'>Address: </h2>
                    <input type="text" defaultValue={pastAddress} ref={addressRef}   placeholder="Type here" className="input input-bordered w-full max-w-2xl focus:border-none" />
       
                </div>
              </form>


                <div>

                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='text-lg font-semibold pb-2'>Time Slot: </h2>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn btn-outline border-2 border-amber-500" onClick={() => document.getElementById('my_modal_5').showModal()}>See Booked Time slot</button>
                        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Booked Time Slots</h3>
                                {truckDetails.bookedTimeSlots && truckDetails.bookedTimeSlots.length > 0 ? (
                                    <ul>
                                        {truckDetails.bookedTimeSlots.map((slot, index) => (
                                            <li key={index}>
                                                <strong>From:</strong> {slot.from}, <strong>To:</strong> {slot.to}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No booked slots for this truck.</p>
                                )}
                                <div className="modal-action">

                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn" onClick={() => document.getElementById('my_modal_5').close()}>Close</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                    <RangePicker
                        size='large'
                        className='h-12 '
                        showTime={{
                            format: 'HH:mm',
                        }}
                        format="MMM DD YYYY HH:mm"
                    
                        onChange={selectTimeSlots}
                        disabledDate={(current) => current && current < currentDate}
                        required
                    />
                </div>



                <div className="mt-4">
                    <h2 className='text-lg font-semibold pb-2'>Total Hours : {totalHours}</h2>
                    <h2 className='text-lg font-semibold pb-2'>Rent Per Hour : {truckDetails.rent} TK</h2>
                    <h2 className='text-lg font-semibold pb-2'>Total Rent: {totalAmount} TK</h2>
                </div>
                <div className="my-4">
                    <button onClick={(e) => handleUpdateRequest(e)} className="bg-amber-500 text-bold btn btn-block">Update</button>
                </div>

            </div>

        </div>
        <ToastContainer></ToastContainer>
    </div>
    );
};

export default UpdateRequest;