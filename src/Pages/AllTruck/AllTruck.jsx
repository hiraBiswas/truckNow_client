import { useEffect, useState } from "react";
import TruckCard from "../TruckCard/TruckCard";

const ITEMS_PER_PAGE = 6;

const AllTruck = () => {
  const [trucks, setTrucks] = useState(null);
  const [filteredTruck, setFilteredTruck] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('https://car-doctor-server-v1-sigma.vercel.app/truck')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTrucks(data);
        setFilteredTruck(data); // Initialize filteredTruck with the fetched data
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Display only the items for the current page
  const currentTruckPage = filteredTruck.slice(startIndex, endIndex);

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const search = formData.get('search');
    console.log(search);

    // Search
    const filteredResult = search
      ? trucks.filter((truck) =>
        truck.name.toLowerCase().includes(search.toLowerCase())
      )
      : trucks;
    setCurrentPage(1);
    setFilteredTruck(filteredResult);
  };

  return (
    <div className="max-w-7xl mx-auto min-h-[600px]">
      <form className="p-5" onSubmit={handleSearch}>
        <input className="p-2 border-2  text-black max-w-4xl" type="text" name="search" placeholder="search by name" />
        <input type="submit" value="Search" className="btn bg-amber-500 text-black " />
      </form>
      <div className=" py-2 lg:py-10 px-10 shadow-drop rounded-xl my-2 lg:my-5 ">
        {currentTruckPage.map((truck) => (
          <TruckCard key={truck._id} truck={truck}></TruckCard>
        ))}
      </div>

      <div className="flex justify-center my-4">
        {Array.from({ length: Math.ceil(filteredTruck.length / ITEMS_PER_PAGE) }, (_, index) => (
          <button
            key={index + 1}
            className={`mx-2 px-4 py-2 rounded-full bg-amber-500 text-white${
              index + 1 === currentPage ? 'bg-white ' : ''
              }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllTruck;
