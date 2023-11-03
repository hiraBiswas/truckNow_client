import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BookingRow from "./BookingRow";
import axios from "axios";


const Bookings = () => {
    const {user} = useContext(AuthContext)
    const [bookings, setBookings]= useState([])

    const url = `http://localhost:5900/bookings?email=${user?.email}`;
    useEffect(() => {

      axios.get(url, {withCredentials: true})
      .then(res => {
          setBookings(res.data);
      })
      // fetch(url)
      //     .then(res => res.json())
      //     .then(data => setBookings(data))
  }, [url]);

         const handleDelete = id =>{
          const proceed = confirm("Are you sure to delete?")
          if(proceed){
              fetch(`http://localhost:5900/bookings/${id}`, {
                  method : 'DELETE'
              })
              .then(res=>res.json())
              .then(data=>{
                  console.log(data)
                  if (data.deletedCount > 0) {
                    alert('deleted successful');
                    const remaining = bookings.filter(booking => booking._id !== id);
                    setBookings(remaining);
                }
              })
          }
      }

      const handleBookingConfirm = id => {
        fetch(`http://localhost:5900/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    // update state
                    const remaining = bookings.filter(booking => booking._id !== id);
                    const updated = bookings.find(booking => booking._id === id);
                    updated.status = 'confirm'
                    const newBookings = [updated, ...remaining];
                    setBookings(newBookings);
                }
            })
    }
    return (
        <div>
            <h1 className="text-4xl text-center">Your Booking List : {bookings.length}</h1>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
         
          <button className="btn btn-circle bg-orange-600 btn-outline">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
</button>
         
        </th>
        <th>Image</th>
        <th>Service</th>
        <th>Price</th>
        <th>Date</th>
      </tr>
    </thead>
   
    <tbody>
      {
        bookings.map(booking=><BookingRow handleBookingConfirm ={handleBookingConfirm } handleDelete={handleDelete} key={booking._id} booking={booking}></BookingRow>)
      }
    </tbody>
   
    
  </table>
</div>
        </div>
    );
};

export default Bookings;