
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const ServiceCard = ({service}) => {
    const {_id,title,img, price}= service
    return (
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
  <figure><img className='h-52 w-full' src={img} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    
    <div className="card-actions justify-end items-ce">
    <p className='text-xl font-medium text-orange-500'>Price : {price}</p>
  <Link to= {`/bookService/${_id}`}  ><button className="btn text-xl font-medium text-orange-500 bg-transparent border-none"> <AiOutlineArrowRight></AiOutlineArrowRight>  </button></Link>
    </div>
  </div>
</div>
        </div>
    );
};

export default ServiceCard;