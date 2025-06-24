import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, Navigate, useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { DatePicker, Space } from 'antd';
import { format, parse, differenceInHours } from 'date-fns'; // Import date-fns functions
import { enUS } from 'date-fns/locale'; // Import locale if needed 
import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';



const RentForm = () => {
    const { user, loading } = useContext(AuthContext);
    const truckDetails = useLoaderData();
    const { name, rent, _id, img, bookedTimeSlots } = truckDetails;
    // console.log(truckDetails, user)
    const { RangePicker } = DatePicker;
    const [from, setForm] = useState();
    const [to, setTo] = useState();
    const [totalHours, setTotalHours] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0)
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const currentDate = new Date();
    const [upcomingBookedTimeSlots, setUpcomingBookedTimeSlots] = useState([]);
    const navigate = useNavigate();

    const showBookedTimeSlotsModal = () => {
        const upcomingSlots = bookedTimeSlots.filter((slot) => {
            const slotDate = new Date(slot.to); // Assuming the 'to' property represents the end time of the time slot
            return slotDate > new Date();
        });
    
        setUpcomingBookedTimeSlots(upcomingSlots);
        document.getElementById('my_modal_5').showModal();
    };


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
        // Calculate the difference in hours after state updates
        if (from && to) {
            console.log(rent)
            const hoursDifference = differenceInHours(to, from);
            setTotalHours(hoursDifference);
            setTotalAmount(hoursDifference * rent);
            console.log(hoursDifference);

        }
    }, [from, to, rent]);


    const handleBookNow = () => {
        // Check if from and to are both defined and not empty strings
        if (!from || !to) {
            toast.error('Please select a valid time slot');
            return;
        }

        // Check for overlapping time slots
        const enteredTimeSlot = { from, to };
        if (bookedTimeSlots && bookedTimeSlots.length > 0) {
            const isOverlapping = bookedTimeSlots.some((bookedSlot) => {
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

        const status = 'pending';
        const renterName = user.displayName;
        const renterEmail = user.email;

        const newRent = {
            renterName,
            renterEmail,
            bookedTimeSlot: enteredTimeSlot,
            truckDetails,
            status,
            totalAmount,
            phoneNumber,
            address,
        };

        console.log(newRent);

        fetch('https://car-doctor-server-v1-sigma.vercel.app/rent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(newRent),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data._id || data.insertedId) {
                    // toast.success('Rent Request is successfully placed');
                    navigate('/dashboard/pendingRequest');
                } else {
                    toast.error('Failed to rent');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Failed to rent');
            });
    };



    return (
        <div className='container mx-auto'>
            <div className='flex justify-center gap-40 items-center mt-16'>

                <div>
                    <img className='h-[500px] w-[480px] my-4' src={img} alt="" />
                </div>

                <div className="flex flex-col justify-end">
                    <div>
                        <h2 className='text-lg font-semibold pb-2'>Phone Number: </h2>
                        <Input placeholder="Phone Number" type='text' size='large' required onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>

                    <div className="my-4">
                        <h2 className='text-lg font-semibold pb-2'>Address: </h2>
                        <Input placeholder="Address" type='text' size='large' required onChange={(e) => setAddress(e.target.value)} />
                    </div>
    

                    <div>

                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-lg font-semibold pb-2'>Time Slot: </h2>
                            {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <button className="btn btn-outline border-2 border-amber-500" onClick={() => showBookedTimeSlotsModal()}>See Booked Time slot</button>
                            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Booked Time Slots</h3>
                                    {upcomingBookedTimeSlots && upcomingBookedTimeSlots.length > 0 ? (
            <ul>
                {upcomingBookedTimeSlots.map((slot, index) => (
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
                        <h2 className='text-lg font-semibold pb-1'>Total Hours : {totalHours}</h2>
                        <h2 className="my-2 text-lg font-semibold pb-1">Rent Per Hour : {rent} TK</h2>
                        <h2 className='text-lg font-semibold pb-1'> Total Rent: {totalAmount} TK</h2>
                    </div>
                    <div className="my-4 mb-4">
                        <button onClick={handleBookNow} className="bg-amber-500 text-bold btn btn-block">Book Now</button>
                    </div>

                </div>

            </div>
            <ToastContainer></ToastContainer>
        </div>

    );
};

export default RentForm;