import img1 from '../../../assets/images/about_us/person.jpg'
import img2 from '../../../assets/images/about_us/parts.jpg'

const About = () => {
    return (
        <div>
            <div className="hero min-h-screen ">
  <div className="hero-content flex-col items-center justify-center lg:flex-row ">
    <div className='lg:max-w-1/2 relative'>
    <img  src={img1} className="rounded-lg  flex-1 shadow-2xl  w-3/4 " />
    <img className='w-1/2 absolute border-8 border-white top-60 right-20' src={img2} alt="" />
    </div>
    <div className="lg:max-w-1/2">
        <p className='text-orange-500 font-semibold'>About Us</p>
        <h1 className='text-black text-6xl font-bold py-5'>We are qualified <br />& of experience <br />in this field</h1>
     <p className="py-5 text-gray-500">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
      <p className='text-gray-500'>the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. </p>
      <button className="btn bg-orange-500 text-white mt-5">Get More Info</button>
    </div>
  </div>
</div>
        </div>
    );
};

export default About;