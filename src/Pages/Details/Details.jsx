import { Link, useLoaderData } from "react-router-dom";

import { useContext} from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const Details = () => {
    const { user, signIn, loading } = useContext(AuthContext);
    const truckDetails = useLoaderData();
    console.log(truckDetails)
    const {name,_id, category, rent,  img, brand, description} = truckDetails;
 


    return (
        <div className="mt-3 lg:mt-5 container mx-auto ">
           <div className="p-2 lg:p-12 flex flex-col  lg:flex-row lg:items-center ">
            <div className="flex-1 sm:flex sm:items-baseline">
               
                <img  className="h-40 mx-16 w-48 lg:h-80 lg:w-80 flex justify-center" src={img} alt="" />
               
            </div>
            <div className="text-start flex-1">
                <h1 className="text-xl py-2 lg:py-4 font-semibold lg:text-2xl " >{name}</h1>
                <h3 className="text-sm lg:text-lg">Brand : {brand}</h3>  
                <h3 className="text-sm lg:text-lg">Category : {category}</h3>    
                <h3 className="text-sm lg:text-lg">Rent per day: {rent} Tk</h3>
                <h3 className="text-sm lg:text-lg text-start py-3">
           <span className="font-bold text-sm lg:text-xl "> Description:</span> {description}
           </h3>
                <Link to={`/truck/rentForm/${_id}`}><button className="btn bg-amber-500 my-4" >Request to Rent</button></Link>
            </div>
           </div>
         
           
         
           </div>
       
    );
};

   

export default Details;