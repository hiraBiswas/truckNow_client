import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
    const [services, setServices] = useState([])
    useEffect(()=>{
        fetch('http://localhost:5900/services')
        .then(res=>res.json())
        .then(data=>setServices(data))
    }, [])
    return (
        <div className="my-2">
            <div className="flex flex-col items-center">
            <p className="text-orange-500 font-bold">Services</p>
            <h1 className="text-6xl font-bold text-black">Our Service Area</h1>
            <p className="text-gray-500">the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. </p>
            </div>
            <div className="grid mt-4 grid-cols-3 gap-6">
                {
                    services.map(service=> <ServiceCard service={service} key={service._id}></ServiceCard> )
                }
            </div>
        </div>
    );
};

export default Services;