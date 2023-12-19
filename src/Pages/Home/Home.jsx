
import About from "../About/About";
import Banner from "../Banner/Banner";
import FeaturedTruck from "../FeaturedTruck/FeaturedTruck";
import Services from "../Services/Services";
import TruckCard from "../TruckCard/TruckCard";
import { useEffect, useState } from "react";
import FaqSection from "./FaqSection";
import Review from "./Review";



const Home = () => {
    const [trucks, setTrucks] = useState(null);

    useEffect(() => {
      fetch('http://localhost:5000/truck')
        .then(response => response.json())
        .then(data => {
          setTrucks(data); 
        })
        .catch(error => console.error('Error fetching featured Truck:', error));
    }, []);
  
    return (
        <div>
           <Banner></Banner> 
           <div className="mt-10 container mx-auto lg:mt-16 ">
            <h1 className="text-2xl font-bold text-center lg:text-3xl ">𝓜𝓸𝓼𝓽 <span className="text-amber-600">𝓟𝓸𝓹𝓾𝓵𝓪𝓻</span> 𝓑𝓻𝓪𝓷𝓭</h1>
           <div data-aos="fade-up"  className=" mt-3  grid gap-8 grid-cols-1  lg:grid-cols-3 container mx-auto">
           {trucks && trucks.map(truck =>
            <TruckCard truck={truck} key={truck._id}></TruckCard>
          )}
           </div>
           </div>


          <Services></Services>
       <FaqSection></FaqSection>
       <Review></Review>
          
        </div>
    );
};

export default Home;