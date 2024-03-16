import { useState } from 'react';
import emailjs from 'emailjs-com';
import { TiSocialFacebook } from "react-icons/ti";
import { FaLinkedinIn } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

const Contact = () => {

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Use your emailjs template ID, user ID, and service ID
        const templateParams = {
            to_name: 'Your Destination Name',
            from_name: formData.name,
            form_email: formData.email, // Use formData.email for the email field
            message: formData.message,   // Use formData.message for the message field
        };

        console.log(formData.email);

        // Use your emailjs service ID
        emailjs
            .send(
                'service_s7el5y4', // Replace with your service ID
                'template_9conkst', // Replace with your template ID
                templateParams,
                'xAxl8ywPdY2FJQpFD' // Replace with your user ID
            )
            .then((response) => {
                console.log('Email sent successfully:', response);
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
    };


    return (
        <div className="bg-amber-600 min-h-[700px] flex items-center">
            <div className='max-w-6xl mx-auto p-5 drop-shadow '>
            <div className=" grid grid-cols-2 bg-amber-100 ">
                <div className="grid grid-cols-2">
                    <div className="p-10">
                        <h3 className="text-3xl font-bold text-amber-600">Get in Touch</h3>
                        <p className="text-black font-xl py-5 font-bold">We can ensure reliability, lowest cost fares,most importantly <br />safety and security of your product. </p>
                        <p className='py-3'>Our website is very easy to use.You can explore or different categories of trucks and among them you can choose the most suitable one for your purpose. </p>
                    </div>



                    <div className="p-10">
                        <div className="flex flex-col">
                            <h1 className="font-bold text-amber-600 pb-3">Call Us</h1>
                            <p className="text-black"> +880 1793250987</p>
                            <p>+880 1893450087</p>
                        </div>


                        <div>
                            <h1 className="font-bold text-amber-600 py-3">Location</h1>
                            <p>House #20 (3rd Floor) Road # 17,<br /> Nikanjia-2 Dhaka, Bangladesh</p>
                        </div>


                        <div>
                            <h1 className="font-bold text-amber-600 py-3">Top Services</h1>

                            <div className='flex justify-start items-center'>
                                <IoCheckmarkDoneSharp></IoCheckmarkDoneSharp>
                                <p>Rent according your time</p>
                            </div>
                            <div className='flex justify-start items-center'>
                                <IoCheckmarkDoneSharp></IoCheckmarkDoneSharp>
                                <p>Time maintenance</p>
                            </div >

                            <div className='flex justify-start items-center'>
                                <IoCheckmarkDoneSharp></IoCheckmarkDoneSharp>
                                <p>User Support</p>
                            </div>

                        </div>



                    </div>
                </div>


                <div className='p-10'>
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="name"
                                className="input input-bordered mb-3"
                                required
                            />
                        </div>
                        <div className="form-control">

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email"
                                className="input input-bordered mb-3"
                                required
                            />
                        </div>
                        <div className="form-control">

                            {/* <textarea  type="text"  
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="message"
                 
                  required className="textarea textarea-bordered textarea-md w-full max-w-xs" ></textarea> */}
                            <input
                                type="text"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="message"
                                className="input input-bordered h-24"
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn text-black bg-amber-600">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>


    );
};

export default Contact;