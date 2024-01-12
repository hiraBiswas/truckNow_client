import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    duration: 2500,
  });

const Review = () => {
 
    return (
        <div className="container mx-auto mt-20 ">
            <h1 className="text-2xl font-bold text-center pb-8 text-black lg:text-4xl">User Experience</h1>
            <div  className="grid grid-cols-1 gap-5 lg:grid-cols-4">
                 <div data-aos="fade-up" className="py-5">
                    <div className="rounded-xl bg-amber-100 drop-shadow h-80 w-72 shadow-xl">
                   <div className="p-5 ">
                 <div className="flex justify-center">
                 <img className="h-20 w-20 rounded-full top-5" src="https://i.ibb.co/6nmBh69/1623165744578.jpg" alt="" />
                 </div>

                   <h3>Excellent service! The process of renting a truck was seamless, and the staff was incredibly helpful. The truck was clean and well-maintained. Will definitely use this service again.</h3>
                            <p className="font-bold">-Kumar Atonu</p>
                            <div className="rating flex justify-center">
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            </div>
                   </div>
                    </div>
                  
            </div>

       


            <div data-aos="fade-up" className="py-5">
                    <div className="rounded-xl bg-amber-100 drop-shadow h-80 w-72 shadow-xl">
                   <div className="p-5 ">
                 <div className="flex justify-center">
                 <img className="h-20 w-20 rounded-full top-5" src="https://i.ibb.co/Yb6YS8Y/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands.jpg" alt="" />
                 </div>

                   <h3>The booking process was straightforward, and the truck was in good condition. The only downside was the limited availability of larger trucks during peak hours.</h3>
                            <p className="font-bold">-Zara Ali</p>
                            <div className="rating flex justify-center">
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            </div>
                   </div>
                    </div>
                  
            </div>


            <div data-aos="fade-up" className="py-5">
                    <div className="rounded-xl bg-amber-100 drop-shadow h-80 w-72 shadow-xl">
                   <div className="p-5 ">
                 <div className="flex justify-center">
                 <img className="h-20 w-20 rounded-full top-5" src="https://i.ibb.co/10QNSq3/f88e8509c6cde2017fd2ff368d2d89d0.jpg" alt="" />
                 </div>

                   <h3>Reliable service for moving purposes. The staff was friendly, and they assisted with loading and unloading. The truck was on time, and the pricing was reasonable. </h3>
                            <p className="font-bold">-Sumon Saha</p>
                            <div className="rating flex justify-center">
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            </div>
                   </div>
                    </div>
                  
            </div>

            <div data-aos="fade-up" className="py-5">
                    <div className="rounded-xl bg-amber-100 drop-shadow h-80 w-72 shadow-xl">
                   <div className="p-5 ">
                 <div className="flex justify-center">
                 <img className="h-20 w-20 rounded-full top-5" src="https://i.ibb.co/nznqkWT/agent-face-happy-business-man-260nw-2279115435.jpg" alt="" />
                 </div>

                   <h3>Decent service for the price. The truck was functional, but there were a few scratches on the exterior. The drop-off location was a bit inconvenient. Good for those on a budget.</h3>
                            <p className="font-bold">-Enayet Khan</p>
                            <div className="rating flex justify-center">
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"  />
                                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            </div>
                   </div>
                    </div>
                  
            </div>
            </div>
        </div>
    )
    }
        

export default Review;