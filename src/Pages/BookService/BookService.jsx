import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";


const BookService = () => {
    const service = useLoaderData()
    const {title,price,_id, img} = service;
    const {user} = useContext(AuthContext)

    const handleBooking = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const price = form.price.value;
        console.log(price, email, name, date)

        const booking = {
            customerName : name,
            email,
            date,
            service : title,
            service_id: _id,
            price,
            img
        }
        console.log(booking)

        fetch('http://localhost:5900/bookings',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify(booking)
        })
        .then(res=>res.json())
        .then(data=>{
           if(data.insertedId){
            alert('Booked Successfully')
           }
        })

    }
    return (
        <div>
            <h3 className="text-3xl text-center font-bold my-8">Book Service : {title} </h3>
             <form onSubmit={handleBooking}>
                {/* form name and quantity row */}
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                      
                        <label className="input-group">
                            <input type="text" name="name" defaultValue={user?.displayName}placeholder="Name"  className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                    
                        <label className="input-group">
                            <input type="date" name="date"  placeholder="Date" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
              
                <div className="md:flex mb-8">
                    <div className="form-control md:w-1/2">
                       
                        <label className="input-group">
                            <input type="email" defaultValue={user?.email} name="email" placeholder="Email" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                       
                        <label className="input-group">
                            <input type="text" name="price" placeholder="Due price" defaultValue={'$'+price}  className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
               
                <input type="submit" value="Confirm" className="btn btn-block bg-orange-500" />

            </form>
        </div>
    );
};

export default BookService;