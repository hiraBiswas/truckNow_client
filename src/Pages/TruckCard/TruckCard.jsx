import { Link } from "react-router-dom";
import PropTypes from 'prop-types'; // ES6

const TruckCard = ({truck}) => {
  const {name,_id, category, rent, capacity,  img, brand} = truck;
        return (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <img className="h-32 w-36" src={img}alt="" />

        <div>
          <h3 className="font-bold text-xl">{name}</h3>
          <h3>Category :{category}</h3>
          <h3>Maximum capacity :{capacity}</h3>
          <h3>Rent per hour :{rent}</h3>
        </div>

        <div className="flex justify-center gap-3 items-center">
        <div>
        <Link to={`/details/${_id}`}><button className="btn btn-block bg-amber-500">Details</button></Link>

        </div>
           <div>
           <Link to={`/truck/rentForm/${_id}`}><button className="btn btn-outline border-2 border-amber-500">Request to Rent</button></Link>
            </div>  
        
        </div>
      </div>
               
        );
    };

    TruckCard.propTypes = {
      truck:PropTypes.object
     }
export default TruckCard;