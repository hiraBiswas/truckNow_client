
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLoaderData } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from 'date-fns';
import { useContext } from "react";



const RentForm = () => {
    const { user, signIn, loading } = useContext(AuthContext);
    const truckDetails = useLoaderData();
    const { _id, img, quantity, category, brand, name, rent } = truckDetails;
    console.log(truckDetails, user)


    const [selectedDate, setSelectedDate] = useState(null);
    const today = new Date();
    const minimumDate = addDays(today, 0);


    const handleRent = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const orderQuantity = parseInt(form.orderQuantity.value, 10);
        const rent = form.rent.value;
        const date = form.date.value;
        const buyerName = form.buyerName.value;
        const buyerEmail = form.buyerEmail.value;
        const truck_id = truckDetails._id;
        const truckQuantity = parseInt(quantity, 10);



        if (truckQuantity === 0) {
            toast.error('Food is not available')
        }
        else if (orderQuantity > truckQuantity) {
            console.log('orderQuantity is large');
            toast.error('Quantity is not available');
            return;
        } else {
            console.log('quantity is larger');
            const newRent = { name, img, buyerName, buyerEmail, rent, date, orderQuantity, truck_id };
            console.log(newRent);

            fetch('http://localhost:5000/rent', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(newRent),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if (data._id || data.insertedId) {
                        toast.success('Rent Request is successfully placed');
                        form.reset();
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                    toast.error('Failed to rent ');
                });
        }


    };



    return (
        <div>
            <div className=" p-12">
                <h2 className="text-3xl font-extrabold text-center py-5 text-black">Rent Form</h2>
                <form onSubmit={handleRent} className="px-10 max-w-3xl mx-auto shadow-2xl rounded-3xl">
                    <div className="md:flex gap-8 px-5">
                        <div className="form-control  md:w-1/2 pt-8">
                            <label className="label">
                                <span className="label-text text-white">Name</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={name} type="text" name="name" className="input input-bordered  w-full max-w-xs" />
                            </label>
                        </div>
                        <div className="form-control md:w-1/2 lg:pt-8">
                            <label className="label">
                                <span className="label-text text-white">Quantity</span>
                            </label>
                            <label className="input-group">
                                <input required type="number" name="orderQuantity" placeholder="quantity" className="input input-bordered  w-full max-w-xs" />
                            </label>
                        </div>
                    </div>


                    <div className="md:flex px-5 gap-8 mb-2">
                        <div className="form-control md:w-1/2 ">
                            <label className="label">
                                <span className="label-text text-white">Rent</span>
                            </label>
                            <label className="input-group">
                                <input defaultValue={rent} type="number" name="rent" placeholder="rent" className="input input-bordered  w-full max-w-xs" />
                            </label>
                        </div>

                        <div className="form-control flex-1 md:w-1/2 ">
                            <label className="label">
                                <span className="label-text text-white"> Date</span>
                            </label>
                            <label className="input-group">

                                <DatePicker
                                    required
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    name="date"
                                    placeholderText="Select a date"
                                    minDate={minimumDate}
                                    className="input input-bordered w-full "
                                    wrapperClassName="w-full"
                                />
                            </label>

                        </div>
                    </div>

                    <div className="md:flex gap-8 px-5 mb-2">
                        <div className="form-control md:w-1/2 ">
                            <label className="label">
                                <span className="label-text text-white">Buyer Name</span>
                            </label>
                            <label className="input-group">
                                <input readOnly defaultValue={user.displayName} type="text" name="buyerName" placeholder="buyer name" className="input input-bordered  w-full max-w-xs" />
                            </label>
                        </div>

                        <div className="form-control md:w-1/2 ">
                            <label className="label">
                                <span className="label-text text-white">Buyer Email</span>
                            </label>
                            <label className="input-group">
                                <input readOnly defaultValue={user.email} type="text" name="buyerEmail" placeholder="buyer email" className="input input-bordered  w-full max-w-xs" />
                            </label>
                        </div>
                    </div>


                    <div className="flex justify-center">
                        <input type="submit" value="Submit" className="btn w-3/4 bg-amber-600 text-white my-4 " />
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default RentForm;