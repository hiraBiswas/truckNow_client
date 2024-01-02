import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTruck from "../../../hooks/useTruck";



const ManageTruck = () => {

    const { truck, loading, refetch } = useTruck(); 
    const axiosSecure = useAxiosSecure();
    console.log(truck)
    const handleDeleteTruck = (truck) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/truck/${truck._id}`);
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    refetch();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${truck.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            }
        });
    }

    return (
        <div className="max-w-6xl  mx-auto mt-10">
       <h1 className="text-2xl font-bold text-center text-amber-500 lg:text-3xl pb-8">All Trucks</h1>
        < div >
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Capacity</th>
                            <th>Rent</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            truck.map((truck, index) => <tr key={truck._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={truck.img} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {truck.name}
                                </td>
                               
                                <td className="text-right">{truck.category}</td>
                                <td className="text-right">{truck.capacity}</td>
                                <td className="text-right">{truck.rent}</td>
                                <td>
                                    <Link to={`/dashboard/updateTruck/${truck._id}`}>
                                        <button
                                            className="btn btn-ghost text-black bg-orange-500">
                                            Update
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteTruck(truck)}
                                        className="btn btn-ghost bg-red-500 text-white">
                                       Delete
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    </div>
);
};

export default ManageTruck;