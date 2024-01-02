import {FaWhatsapp } from 'react-icons/fa';
// import {HiReceiptRefund } from 'react-icons/hi';
import { TbTruckDelivery } from 'react-icons/tb'
import { MdLocalOffer} from 'react-icons/md'
// import {SiOrigin, } from 'react-icons/si'
import {GrUserWorker } from 'react-icons/gr'
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    duration: 2500,
  });

const Services = () => {
    
           

    return (
      <div data-aos="fade-down">
        <h1 className='text-2xl  mt-10 text-center font-bold lg:text-3xl lg:mt-20 text-black pb-8 '>Why Choose TruckNow </h1>
        <div  className="mt-5 container bg-amber-500  rounded-lg flex flex-col lg:mx-w-full lg:mx-auto   gap-6 lg:flex-row lg:justify-center items-center">
       
            <div className="p-5 bg-white text-center  w-2/5">
            <img className=''  src="https://i.ibb.co/fqLpGdw/professional-moving-services-malaysia.jpg" alt="" />
            </div>


          
            <div className='w-3/5   drop-shadow-lg grid grid-cols-1 lg:grid-cols-2 lg:py-8 lg:pr-4'>
                {/* <div className='border-2 bg-white border-amber-400 py-8'>
                  <div className=' flex justify-center'>
                  <FaRegHandshake className='text-7xl text-amber-700'></FaRegHandshake>
                  </div>
                    <h1 className='text-2xl font-semibold text-center text-amber-700'>Friendly Team</h1>
                    <p className='text-center text-amber-700'>More than 20 team</p>  
                </div> */}

                <div className='border-2 py-8 bg-white  border-amber-400 lg:border-x-0 hover:bg-amber-100'>
                  <div className=' flex justify-center'>
                  <TbTruckDelivery className='text-7xl '></TbTruckDelivery>
                  </div>
                    <h1 className='text-2xl font-semibold text-center '>Verified Truck</h1>
                    <p className='text-center '>All has legal documents.</p>
                </div>


                <div className='border-2 py-8 bg-white  border-amber-400 hover:bg-amber-100'>
                  <div className=' flex justify-center'>
                  <GrUserWorker className='text-7xl text-amber-600'></GrUserWorker>
                  </div>
                    <h1 className='text-2xl font-semibold text-center '>Trained Stuff</h1>
                    <p className='text-center '>Trained stuff for specific work.</p>   
                </div>


                <div className='border-2 py-8 bg-white  border-amber-400 lg:border-t-0 hover:bg-amber-100'>
                  <div className=' flex justify-center'>
                  <FaWhatsapp className='text-7xl '></FaWhatsapp>
                  </div>
                    <h1 className='text-2xl font-semibold text-center '>24/7 Hours Support</h1>
                    <p className='text-center '>Anytime anywhere</p>
                     </div>


                     <div className='border-2 bg-white  py-8  border-amber-400 lg:border-t-0 lg:border-x-0 hover:bg-amber-100'>
                  <div className=' flex justify-center'>
                  <MdLocalOffer className='text-7xl '></MdLocalOffer>
                  </div>
                    <h1 className='text-2xl font-semibold text-center '>Amazing Offers</h1>
                    <p className='text-center '>We are giving offer on purchase</p>
                  
                </div>

{/* 
                <div className='border-2 py-8 bg-white  border-amber-400 lg:border-t-0'>
                  <div className=' flex justify-center'>
                  <SiOrigin className='text-7xl text-amber-700'></SiOrigin>
                  </div>
                    <h1 className='text-2xl font-semibold text-center text-amber-700'>Original Product</h1>
                    <p className='text-center text-amber-700'>We ship products from overseas.</p>
                  
                </div> */}

            </div>
            
        </div>
        </div>

    );
};

export default Services;