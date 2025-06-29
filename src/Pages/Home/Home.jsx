
import About from "../About/About";
import Banner from "../Banner/Banner";
import FeaturedTruck from "../FeaturedTruck/FeaturedTruck";
import Services from "../Services/Services";
import TruckCard from "../TruckCard/TruckCard";
import { useEffect, useState } from "react";
import FaqSection from "./FaqSection";
import Review from "./Review";
import Section from "./Section";



const Home = () => {
    const [trucks, setTrucks] = useState(null);

    useEffect(() => {
      fetch('https://car-doctor-server-v1-sigma.vercel.app/truck')
        .then(response => response.json())
        .then(data => {
          setTrucks(data); 
        })
        .catch(error => console.error('Error fetching featured Truck:', error));
    }, []);
  
    return (
        <div>

          
           <Banner></Banner> 
       

           <Section></Section>
          <Services></Services>
     
       <Review></Review>
          
        </div>
    );
};

export default Home;