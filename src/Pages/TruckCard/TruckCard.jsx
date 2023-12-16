import { Link } from "react-router-dom";
import PropTypes from 'prop-types'; // ES6

const TruckCard = ({truck}) => {
  const {name,_id, category, rent,  img, brand} = truck;
        return (
          <div className="card card-compact bg-base-100 shadow-xl">
          <figure><img className="h-72 w-full py-2 rounded-2xl" src={img}/></figure>
          <div className="card-body ">
            <h2 className="card-title lg:text-xl">{name}</h2>
           <h4 className="text-start font-medium">Brand Name : {brand} </h4>
           <h4 className="text-start  font-medium">Category : {category}</h4>
           <h4 className="text-start font-medium pb-2">Rent per Day : {rent} </h4>
          
            <div className=" justify-between">
              <Link to={`/details/${_id}`}><button className="btn btn-block  bg-amber-600">Details</button></Link>
             
            </div>
            
          </div>
        </div>
               
        );
    };

    TruckCard.propTypes = {
      truck:PropTypes.object
     }
export default TruckCard;