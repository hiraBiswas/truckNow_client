import { Link, useLoaderData } from "react-router-dom";

import { useContext} from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const Details = () => {
    const { user, signIn, loading } = useContext(AuthContext);
    const truckDetails = useLoaderData();
    console.log(truckDetails)
    const {name,_id, category, rent,  img, brand, description} = truckDetails;
 


    return (
        <div className="mt-5 container mx-auto ">
           <div className="p-5 lg:p-12 flex flex-col  lg:flex-row lg:items-center ">
            <div className="w-2/3">
                <div className="p-5">
                <img src={img} alt="" />
                </div>
            </div>
            <div className="text-start w-1/3">
                <h1 className="text-xl py-4 font-semibold lg:text-2xl " >{name}</h1>
                <h3 className="text-lg">Brand : {brand}</h3>  
                <h3 className="text-lg">Category : {category}</h3>    
                <h3 className="text-lg">Rent per day: {rent} Tk</h3>
              
                <Link to={`/truck/${_id}`}><button className="btn bg-amber-500" >Request to Rent</button></Link>
            </div>
           </div>
         
            <h3 className="text-xl text-start p-5">
           <span className="font-bold text-xl "> Description:</span> {description}
           </h3>
         
           </div>
       
    );
};

   

export default Details;