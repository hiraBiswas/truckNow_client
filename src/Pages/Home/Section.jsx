import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
    duration: 2500,
  });
const Section = () => {
    return (
        <div data-aos = "fade-up" className="relative overflow-hidden bg-white container mx-auto">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
                <h2 className="font-bold text-4xl text-start pb-10">How can you rent truck?</h2>
            <div className="collapse collapse-arrow bg-amber-100 mb-3">
  <input type="radio" name="my-accordion-2" checked="checked" /> 
  <div className="collapse-title text-xl font-medium">
  You must register to rent car from us.
  </div>
  <div className="collapse-content"> 
    <p>You can simply register with your name, email, image and password.</p>
  </div>
</div>
<div className="collapse collapse-arrow bg-amber-100 mb-3">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl font-medium">
  You can explore our collection of trucks.
  </div>
  <div className="collapse-content"> 
    <p>Trucks are displayed with relevant information like category, rent per day, capacity etc.</p>
  </div>
</div>
<div className="collapse collapse-arrow bg-amber-100 mb-3">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl font-medium">
  Choose suitable truck for your purpose.
  </div>
  <div className="collapse-content"> 
    <p>We have variety of collection of trucks particularly suitable for some purpose. You can choose according to your purpose.</p>
  </div>
</div>

<div className="collapse collapse-arrow bg-amber-100 mb-3">
  <input type="radio" name="my-accordion-2" /> 
  <div className="collapse-title text-xl font-medium">
  Fill up the rent form.
  </div>
  <div className="collapse-content"> 
    <p>Finally fill up the rent from with your desired time and date, address and other additional information to request for rent.</p>
  </div>
</div>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src="https://i.ibb.co/ZcS5gvL/Screenshot-267.png"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://i.ibb.co/J5yzbwj/Screenshot-268.png"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                     
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://i.ibb.co/QvrMRzx/Screenshot-273.png"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        {/* <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src=""
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div> */}
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://i.ibb.co/Rz50Pr2/Screenshot-270.png"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://i.ibb.co/w05CqmB/Screenshot-269.png"
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default Section;