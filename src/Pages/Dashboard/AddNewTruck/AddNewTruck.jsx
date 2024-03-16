import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddNewTruck=()=>{
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()
    const handleAddTruck = async (event) => {
        event.preventDefault();
        const form = event.target;
    
        try {
          const imageFile = form.image.files[0];
    
          // Check if an image is selected
          if (!imageFile) {
            toast.error('Please select an image.');
            return;
          }
    
          const formData = new FormData();
          formData.append('image', imageFile);
    
          // Upload image to imgbb
          const imageUploadResponse = await fetch(image_hosting_api, {
            method: 'POST',
            body: formData,
          });
    
          if (!imageUploadResponse.ok) {
            throw new Error(`HTTP error! Status: ${imageUploadResponse.status}`);
          }
    
          const result = await imageUploadResponse.json();
    
          if (!result.success) {
            toast.error('Error during image upload');
            return;
          }
    
          const imageUrl = result.data.display_url;
    
          console.log(imageUrl);
    
          const name = form.name.value;
          const brand = form.brand.value;
          const category = form.category.value;
          const capacity = form.capacity.value;
          const fuel = form.fuel.value;
          const rent= form.rent.value;
          const description = form.description.value;
    
          console.log(name, brand, category, capacity, imageUrl);
    
          const newTruck = {
            name,
            img: imageUrl,
            brand,
            category,
            capacity,
            fuel,
            description,
            rent,
            bookedTimeSlots: [],
          };
    
          // Post the new truck data to your server
          const newTruckResponse = await axiosSecure.post('/truck', newTruck);
          console.log(newTruckResponse.data);
    
          if (newTruckResponse.data.insertedId) {
            // show success popup
            form.reset();
            toast.success('Truck added successfully');
            navigate('/dashboard/manageTruck');

          } else {
            toast.error('Truck could not be added');
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error('Failed to add truck.');
        }
      };
    
  return (
    <div className="mt-10 container mx-auto lg:mt-12  rounded-2xl ">
      <h1 className="mx-auto p-10 text-black font-semibold text-center text-2xl lg:text-4xl">Add New Truck</h1>

      <form onSubmit={handleAddTruck} className="max-w-md lg:max-w-6xl px-10">
                    <div className="flex flex-col gap-6 w-full lg:flex-row">
                    <div className="form-control w-1/2 flex-1">
                            <label className="label">
                                <span className="label-text text-lg font-semibold pb-1">Name:</span>
                            </label>
                            <input type="text" placeholder="name" name="name" className="input input-bordered" required />

                        </div>
                        <div className="form-control w-1/2 flex-1">
                            <label className="label">
                                <span className="label-text text-lg font-semibold pb-1">Image</span>
                            </label>
                            <input type="file" placeholder="image " name="image" className="input input-bordered" required />
                        </div>
                      
                    </div>



                    <div className="flex flex-col gap-6 w-full items-center lg:flex-row">
                    <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text text-lg font-semibold pb-1">Brand</span>
                            </label>
                            <input type="text" placeholder="brand" name="brand" className="input input-bordered" required />

                        </div>


                        <div className="form-control flex-1">
                        <label className="input-group">
                        <span className="label-text bg-transparent -ml-2 my-2 text-lg font-semibold pb-1">Category</span>
                        </label>
                        <label className="input-group">
            <select name="category" className="input input-bordered w-full"  defaultValue="">
                <option value="" disabled>Pick the category.</option>
                <option value="large">Large</option>
                <option value="medium">Medium</option>
                <option value="small">small</option>
               
               
              </select>
            </label>
            </div>
                    </div>



                    <div className="flex flex-col gap-6 w-full lg:flex-row">
                    <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text text-lg font-semibold pb-1">Capacity</span>
                            </label>
                            <input type="text" placeholder="capacity" name="capacity" className="input input-bordered" required />
                        </div>
                        <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text text-lg font-semibold pb-1">Fuel</span>
                            </label>
                            <input type="text" placeholder="fuel" name="fuel" className="input input-bordered" required />
                        </div>
                    
                    </div>

                 <div className="flex gap-6">

                 <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text text-lg font-semibold pb-1">Rent</span>
                        </label>
                        <input type="text" placeholder="rent" name="rent" className="input input-bordered" required />
                    </div>


                 <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text text-lg font-semibold pb-1">Short Description</span>
                        </label>
                        <input type="text" placeholder="description" name="description" className="input input-bordered" required />
                    </div>
                    
                 </div>


                    <div className="form-control mt-6">
                        <button className="btn bg-amber-600 drop-shadow">Add Truck</button>
                    </div>
                </form>
             
      <ToastContainer />
    </div>
  );
};


export default AddNewTruck;