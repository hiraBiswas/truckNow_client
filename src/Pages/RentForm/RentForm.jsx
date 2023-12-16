import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
import { useContext } from "react";
import { differenceInHours, parseISO ,parse, format , isValid} from 'date-fns';



const RentForm = () => {
    const { user, signIn, loading } = useContext(AuthContext);
    const truckDetails = useLoaderData();
    const { _id, img, quantity, category, brand, name, rent } = truckDetails;
    console.log(truckDetails, user)
    const buyerName = user?.displayName || '';
    const buyerEmail = user?.email || '';

    
    const today = new Date();
    const minimumDate = addDays(today, 0);
    const maximumDate = addDays(today, 6);

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleRent = (event) => {
        event.preventDefault();
        // const form = event.target;
        // const name = form.name.value;
        // const rent = form.rent.value;
        // const startDate = form.startDate.value;
        // const endDate = form.endDate.value;
        // const renterName = form.renterName.value;
        // const renterEmail = form.renterEmail.value;
        // const address = form.address.value;
        // const truck_id = truckDetails._id;
        event.preventDefault();
        const form = event.target;
        const nameInput = form.querySelector('input[name="name"]');
        const rentInput = form.querySelector('input[name="rent"]');
        const startDateInput = form.querySelector('input[name="startDate"]');
        const endDateInput = form.querySelector('input[name="endDate"]');
        const renterNameInput = form.querySelector('input[name="renterName"]');
        const renterEmailInput = form.querySelector('input[name="renterEmail"]');
        const addressInput = form.querySelector('input[name="address"]');
    
        // Check if the elements are found before accessing their values
        const name = nameInput ? nameInput.value : '';
        const rent = rentInput ? rentInput.value : '';
        const startDateRaw = startDateInput ? startDateInput.value : '';
    const endDateRaw = endDateInput ? endDateInput.value : '';
        const renterName = renterNameInput ? renterNameInput.value : '';
        const renterEmail = renterEmailInput ? renterEmailInput.value : '';
        const address = addressInput ? addressInput.value : '';
        const truck_id = truckDetails._id;

        
console.log('Raw Start Date:', startDate);
console.log('Raw End Date:', endDate);


 // Parse raw start and end dates into Date objects using parse
 const parsedStartDate = parse(startDateRaw, 'yyyy/MM/dd h:mm aa', new Date());
 const parsedEndDate = parse(endDateRaw, 'yyyy/MM/dd h:mm aa', new Date());


 
          // Check if parsing is successful
if (!isValid(parsedStartDate) || !isValid(parsedEndDate)) {
    console.error('Invalid date format');
    return; // or handle the error accordingly
  }
  
      // Format the parsed dates into ISO 8601 format
    const isoFormattedStartDate = format(parsedStartDate, "yyyy-MM-dd'T'HH:mm:ssxxx");
    const isoFormattedEndDate = format(parsedEndDate, "yyyy-MM-dd'T'HH:mm:ssxxx");

    const hoursDifference = differenceInHours(parsedEndDate, parsedStartDate);
    const totalRent = rent * hoursDifference;

    // Log the parsed dates and calculated values for debugging
    console.log('Parsed Start Date:', isoFormattedStartDate);
    console.log('Parsed End Date:', isoFormattedEndDate);
    console.log('Hours Difference:', hoursDifference);
    console.log('Total Rent:', totalRent);

    console.log(name, rent, isoFormattedStartDate, isoFormattedEndDate, renterEmail, renterName, address, hoursDifference, totalRent);
        // if (truckQuantity === 0) {
        //     toast.error('Food is not available')
        // }
        // else if (orderQuantity > truckQuantity) {
        //     console.log('orderQuantity is large');
        //     toast.error('Quantity is not available');
        //     return;
        // } else {
        //     console.log('quantity is larger');
        // const newRent = { name, img, renterName, renterEmail, rent, date, orderQuantity, truck_id };
        // console.log(newRent);

    //     fetch('http://localhost:5000/rent', {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/json',
    //         },
    //         body: JSON.stringify(newRent),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data)
    //             if (data._id || data.insertedId) {
    //                 toast.success('Rent Request is successfully placed');
    //                 form.reset();
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //             toast.error('Failed to rent ');
    //         });
    // }




    }

    return (
        <div>
            <div className=" p-12">
                <h2 className="text-3xl font-extrabold text-center py-5 text-black">Rent Form</h2>
                <form onSubmit={handleRent} className="px-10 max-w-3xl mx-auto shadow-2xl rounded-3xl">
                    <div className="md:flex gap-8 px-5">
                        <div className="form-control md:w-1/2 ">
                            <label className="label">
                                <span className="label-text text-black font-semibold">Renter Name</span>
                            </label>
                            <label className="input-group">
                                <input readOnly defaultValue={user.displayName} type="text" name="buyerName" placeholder="buyer name" className="input input-bordered  w-full max-w-xs" />
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 ">
                            <label className="label">
                                <span className="label-text font-semibold text-black">Phone Number</span>
                            </label>
                            <label className="input-group">
                                <input required type="text" name="phone" placeholder="phone number" className="input input-bordered  w-full max-w-xs" />
                            </label>
                        </div>
                    </div>


                    <div className="md:flex px-5 gap-8 mb-2">
                        <div className="form-control md:w-1/2 ">
                            <label className="label">
                                <span className="label-text font-semibold text-black">Renter Email</span>
                            </label>
                            <label className="input-group">
                                <input readOnly defaultValue={user.email} type="text" name="renterEmail" placeholder="renter email" className="input input-bordered  w-full max-w-xs" />
                            </label>
                        </div>


                       
                        <div className="form-control  md:w-1/2">
                            <label className="label">
                                <span className="label-text text-black font-semibold ">Truck name</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={name} type="text" name="name" className="input input-bordered  w-full max-w-xs" />
                            </label>
                        </div>
                    </div>


                    <div className="md:flex gap-8 px-5">
                   <div  className="form-control md:w-1/2 ">
                   <label className="label">
                                <span className="label-text text-black font-semibold"> Date and Time(start)</span>
                            </label>
                            <label className="input-group" name="startDate">

                            <DatePicker
                            required
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            name="startDate"
                            placeholderText="Select date and time"
                            minDate={today}
                            maxDate={maximumDate}
                            showTimeInput 
                            dateFormat="yyyy/MM/dd h:mm aa"  
                            timeFormat="h:mm aa"
                            className="input input-bordered w-full"
                            wrapperClassName="w-full"
                        />
                            </label>

                   </div>
                       
                       
                        <div  className="form-control md:w-1/2">
                   <label className="label">
                                <span className="label-text text-black font-semibold"> Date and Time(end)</span>
                            </label>
                            <label className="input-group" name="endDate">

                            <DatePicker
                            required
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            name="endDate"
                            placeholderText="Select date and time"
                            minDate={today}
                            maxDate={maximumDate}
                            showTimeInput 
                            dateFormat="yyyy/MM/dd h:mm aa"  
                            timeFormat="h:mm aa"
                            className="input input-bordered w-full"
                            wrapperClassName="w-full"
                        />
                            </label>

                   </div>
                    </div>
                

                    <div className="md:flex gap-8 px-5 mb-2">
                    <div className="form-control md:w-1/2 ">
                            <label className="label">
                                <span className="label-text font-semibold text-black">Address </span>
                            </label>
                            <label className="input-group">
                                <input  type="text" name="address" placeholder="address" className="input input-bordered  w-full max-w-xs" />
                            </label>
                        </div>
                 
                        

                        <div className="form-control md:w-1/2 ">
                            <label className="label">
                                <span className="label-text text-black font-semibold">Total Rent</span>
                            </label>
                            <label className="input-group">
                                <input  type="number" name="rent" placeholder="rent" className="input input-bordered  w-full max-w-xs" />
                            </label>
                        </div>

                    </div>
                   



                    <div className="flex justify-center">
                        <input onSubmit={handleRent} type="submit" value="Submit" className="btn w-3/4 bg-amber-600 text-white my-4 " />
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default RentForm;