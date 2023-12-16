import { useEffect, useState } from "react";
import TruckCard from "../TruckCard/TruckCard";

const ITEMS_PER_PAGE = 6;

const AllTruck = () => {
  const [trucks, setTrucks] = useState(null);
  const [filteredTruck, setFilteredTruck] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('http://localhost:5000/truck')
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
    <div>
      <form className="p-5" onSubmit={handleSearch}>
        <input className="p-2 border-2 rounded-xl text-black" type="text" name="search" />
        <input type="submit" value="Search" className="btn bg-amber-500 text-black" />
      </form>
      <div className="shadow-2xl py-10 px-5 drop-shadow rounded-xl grid gap-12 grid-cols-1 lg:grid-cols-3">
        {currentTruckPage.map((truck) => (
          <TruckCard key={truck._id} truck={truck}></TruckCard>
        ))}
      </div>

      <div className="flex justify-center mt-4">
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
