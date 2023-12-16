
const Banner = () => {
  return (
    <div>
      <div className="carousel h-[500px] w-full">
  <div id="slide1" className="carousel-item relative w-full">
  <div className="hero h-[500px]" style={{backgroundImage: 'url(https://i.ibb.co/z8L7rsr/container-truck-ship-port-ai-generated-image.jpg)'}}>
  <div className="hero-overlay bg-black bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md lg:max-w-2xl">
      <h1 className="mb-2 text-2xl font-bold text-white lg:text-4xl lg:mb-2">Embark on Your Journey with <span className="text-amber-500 text-5xl italic">TruckNow</span></h1>
      <p className="mb-2 text-sm font-bold lg:text-lg lg:mb-5">- Renting Simplified, Moving Amplified.</p>
      <button className="btn bg-amber-700 py-3 px-6 text-white">Get Started</button>
    </div>
  </div>
</div>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative h-[500px] w-full">
  <div className="hero h-[500px]" style={{backgroundImage: 'url(https://i.ibb.co/52jqBt2/1505363227.jpg)', height:"500px"}}>
  <div className="hero-overlay bg-black bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md lg:max-w-xl">
      <h1 className="mb-2 text-2xl font-bold text-white lg:text-4xl lg:mb-2">Your Journey, Our Trucks</h1>
      <p className="mb-5 text-sm font-bold lg:text-lg">- Seamless Rentals Every Time</p>
      <p className="mb-2">Experience a smooth ride with our dedicated truck rentals. Your journey is made effortless as our trucks deliver reliable and seamless rentals, ensuring your satisfaction every time.</p>
      <button className="btn bg-amber-600 text-white py-3 px-6">Get Started</button>
    </div>
  </div>
</div>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item h-[500px] relative w-full">
  <div className="hero h-[500px]" style={{backgroundImage: 'url(https://i.ibb.co/Vj7dfDH/pexels-alexandre-saraiva-carniato-1364415.jpg)'}}>
  <div className="hero-overlay bg-black opacity-70 "></div>
  <div className="hero-content text-start text-neutral-content">
    <div className="max-w-md lg:max-w-xl mr-72">
      <h1 className="mb-2 text-2xl font-bold text-white lg:mb-2 lg:text-5xl">More Than Trucks </h1>
      <p className="mb-2 text-sm lg:mb-5 font-bold lg:text-lg">- It is Your Move, Your Way</p>
      <p className="mb-2">We offer more than just trucks; we offer a move tailored to your way. Your journey is uniquely yours, and our trucks are here to make it exceptional.</p>
      <button className="btn bg-amber-600 py-3 px-6 text-white">Get Started</button>
    </div>
  </div>
</div>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div> 

</div>
    </div>
  );
};

export default Banner;