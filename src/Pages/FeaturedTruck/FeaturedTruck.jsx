
import { Link } from "react-router-dom";
import TruckCard from "../TruckCard/TruckCard";
import { useEffect, useState } from "react";

const FeaturedTruck = () => {
    const [trucks, setTrucks] = useState(null);

    useEffect(() => {
       
        fetch('https://car-doctor-server-v1-sigma.vercel.app/truck')
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setTrucks(data);
          })
          .catch(error => console.error('Error fetching top-selling food:', error));
      }, []);
    return (
        <div>
             <div className="mt-10 container mx-auto lg:mt-16 ">
            <h1 className="text-2xl font-bold text-center lg:text-3xl text-amber-600 italic ">Featured Truck</h1>
           <div data-aos="fade-up"  className=" mt-3  grid gap-8 grid-cols-1  lg:grid-cols-3 container mx-auto">
           {Array.isArray(trucks) &&
            trucks.slice(0, 6).map((truck) => (
              <TruckCard truck={truck} key={truck._id}></TruckCard>
            ))}
           </div>
           </div>
           <div className="my-10 flex justify-center">
            <Link to="/allTruck"><button className="btn bg-amber-600">Show All</button></Link>
           </div>
        </div>
    );
};

export default FeaturedTruck;