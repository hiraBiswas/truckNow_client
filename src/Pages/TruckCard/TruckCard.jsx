import { Link } from "react-router-dom";
import PropTypes from 'prop-types'; // ES6

const TruckCard = ({truck}) => {
  const {name,_id, category, rent, capacity,  img, brand} = truck;
        return (
      <div className="grid grid-cols-2 gap-2 lg:gap-5 lg:grid-cols-3">
        <img className="h-24 w-32 lg:h-32 lg:w-36" src={img}alt="" />

        <div>
          <h3 className="font-bold text-sm lg:text-xl">{name}</h3>
          <h3 className="text-sm lg:text-base">Category :{category}</h3>
          <h3 className="text-sm lg:text-base">Maximum capacity :{capacity}</h3>
          <h3 className="text-sm lg:text-base">Rent per hour :{rent}</h3>
        </div>

        <div className="flex mx-auto justify-between gap-3 items-center">
        <div>
        <Link to={`/details/${_id}`}><button className="btn  btn-block bg-amber-500 text-xm lg:text-base">Details</button></Link>

        </div>
           <div>
           <Link to={`/truck/rentForm/${_id}`}><button className="btn btn-outline border-2 text-xm lg:text-base border-amber-500">Request to Rent</button></Link>
            </div>  
        
        </div>
      </div>
               
        );
    };

    TruckCard.propTypes = {
      truck:PropTypes.object
     }
export default TruckCard;