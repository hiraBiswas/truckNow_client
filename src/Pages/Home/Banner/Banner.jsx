import img1 from '../../../assets/images/banner/1.jpg'
import img2 from '../../../assets/images/banner/2.jpg'
import img3 from '../../../assets/images/banner/3.jpg'
import img4 from '../../../assets/images/banner/4.jpg'
import img5 from '../../../assets/images/banner/5.jpg'
import img6 from '../../../assets/images/banner/6.jpg'

const Banner = () => {
    return (
        <div>
            <div className="carousel w-full lg:h-[600px]">
  <div id="slide1" className="carousel-item relative w-full ">
    <img src={img1} className="w-full rounded-xl" />
    <div className="h-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)] absolute flex flex-col text-white   ">
      <div className=' pl-24 pt-24 pb-24'>
      <h1 className='text-2xl font-bold lg:text-6xl'>Affordable <br />Price For Car <br />Servicing</h1>
      <p className='py-8'>There are many variations of passages of  available, but <br />the majority have suffered alteration in some form</p>
      <div className='text-white flex gap-6 '>
        <button className='btn text-white bg-orange-500'>Discover More</button>
        <button className='btn text-white btn-outline border-2 border-orange-500' > Latest Project</button>
      </div>
      </div>
    </div>
    <div className="absolute flex  transform -translate-y-1/2 gap-3 right-5 bottom-3">
      <a href="#slide6" className="btn btn-circle border-none ">❮</a> 
      <a href="#slide2" className="btn btn-circle border-none bg-orange-500">❯</a>
    </div>
  </div> 


  <div id="slide2" className="carousel-item relative w-full ">
    <img src={img2} className="w-full rounded-xl" />
    <div className="h-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)] absolute flex flex-col text-white   ">
      <div className=' pl-24 pt-24 pb-24'>
      <h1 className='text-2xl font-bold lg:text-6xl'>Affordable <br />Price For Car <br />Servicing</h1>
      <p className='py-8'>There are many variations of passages of  available, but <br />the majority have suffered alteration in some form</p>
      <div className='text-white flex gap-6 '>
        <button className='btn text-white bg-orange-500'>Discover More</button>
        <button className='btn text-white btn-outline border-2 border-orange-500' > Latest Project</button>
      </div>
      </div>
    </div>
    <div className="absolute flex  transform -translate-y-1/2 gap-3 right-5 bottom-3">
      <a href="#slide1" className="btn btn-circle border-none ">❮</a> 
      <a href="#slide3" className="btn btn-circle border-none bg-orange-500">❯</a>
    </div>
  </div> 
  

  <div id="slide3" className="carousel-item relative w-full ">
    <img src={img3} className="w-full rounded-xl" />
    <div className="h-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)] absolute flex flex-col text-white   ">
      <div className=' pl-24 pt-24 pb-24'>
      <h1 className='text-2xl font-bold lg:text-6xl'>Affordable <br />Price For Car <br />Servicing</h1>
      <p className='py-8'>There are many variations of passages of  available, but <br />the majority have suffered alteration in some form</p>
      <div className='text-white flex gap-6 '>
        <button className='btn text-white bg-orange-500'>Discover More</button>
        <button className='btn text-white btn-outline border-2 border-orange-500' > Latest Project</button>
      </div>
      </div>
    </div>
    <div className="absolute flex  transform -translate-y-1/2 gap-3 right-5 bottom-3">
      <a href="#slide2" className="btn btn-circle border-none ">❮</a> 
      <a href="#slide4" className="btn btn-circle border-none bg-orange-500">❯</a>
    </div>
  </div> 

  <div id="slide4" className="carousel-item relative w-full ">
    <img src={img4} className="w-full rounded-xl" />
    <div className="h-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)] absolute flex flex-col text-white   ">
      <div className=' pl-24 pt-24 pb-24'>
      <h1 className='text-2xl font-bold lg:text-6xl'>Affordable <br />Price For Car <br />Servicing</h1>
      <p className='py-8'>There are many variations of passages of  available, but <br />the majority have suffered alteration in some form</p>
      <div className='text-white flex gap-6 '>
        <button className='btn text-white bg-orange-500'>Discover More</button>
        <button className='btn text-white btn-outline border-2 border-orange-500' > Latest Project</button>
      </div>
      </div>
    </div>
    <div className="absolute flex  transform -translate-y-1/2 gap-3 right-5 bottom-3">
      <a href="#slide3" className="btn btn-circle border-none ">❮</a> 
      <a href="#slide5" className="btn btn-circle border-none bg-orange-500">❯</a>
    </div>
  </div> 

  <div id="slide5" className="carousel-item relative w-full ">
    <img src={img5} className="w-full rounded-xl" />
    <div className="h-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)] absolute flex flex-col text-white   ">
      <div className=' pl-24 pt-24 pb-24'>
      <h1 className='text-2xl font-bold lg:text-6xl'>Affordable <br />Price For Car <br />Servicing</h1>
      <p className='py-8'>There are many variations of passages of  available, but <br />the majority have suffered alteration in some form</p>
      <div className='text-white flex gap-6 '>
        <button className='btn text-white bg-orange-500'>Discover More</button>
        <button className='btn text-white btn-outline border-2 border-orange-500' > Latest Project</button>
      </div>
      </div>
    </div>
    <div className="absolute flex  transform -translate-y-1/2 gap-3 right-5 bottom-3">
      <a href="#slide4" className="btn btn-circle border-none ">❮</a> 
      <a href="#slide6" className="btn btn-circle border-none bg-orange-500">❯</a>
    </div>
  </div> 

  <div id="slide6" className="carousel-item relative w-full ">
    <img src={img6} className="w-full rounded-xl" />
    <div className="h-full bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0.00)] absolute flex flex-col text-white   ">
      <div className=' pl-24 pt-24 pb-24'>
      <h1 className='text-2xl font-bold lg:text-6xl'>Affordable <br />Price For Car <br />Servicing</h1>
      <p className='py-8'>There are many variations of passages of  available, but <br />the majority have suffered alteration in some form</p>
      <div className='text-white flex gap-6 '>
        <button className='btn text-white bg-orange-500'>Discover More</button>
        <button className='btn text-white btn-outline border-2 border-orange-500' > Latest Project</button>
      </div>
      </div>
    </div>
    <div className="absolute flex  transform -translate-y-1/2 gap-3 right-5 bottom-3">
      <a href="#slide5" className="btn btn-circle border-none ">❮</a> 
      <a href="#slide1" className="btn btn-circle border-none bg-orange-500">❯</a>
    </div>
  </div> 
</div>
        </div>
    );
};

export default Banner;