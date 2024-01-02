import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const AdminHome = () => {
    const [bookingData, setBookingData] = useState([]);
    const [chartDataByDate, setChartDataByDate] = useState([]);
    const [chartOptionsByDate, setChartOptionsByDate] = useState({
      chart: {
        id: "bookings-chart-by-date",
      },
      xaxis: {
        type: "datetime",
      },
      colors: ["#1e1b4b"], // Set the color to indigo-950
    });
  
    const [chartDataByCategory, setChartDataByCategory] = useState([]);
    const [chartOptionsByCategory, setChartOptionsByCategory] = useState({
      chart: {
        id: "bookings-chart-by-category",
      },
      labels: ["Medium", "Large", "Small"],
      colors: ["#34d399", "#1e1b4b", "#ff5a5f"], // Set colors for Medium, Large, Small
    });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:5000/rent");
          setBookingData(response.data);
        } catch (error) {
          console.error("Error fetching booking data:", error);
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
      const processChartDataByDate = () => {
        const approvedBookingsByDate = {};
  
        // Filter and process only approved bookings
        const approvedBookings = bookingData.filter(
          (booking) => booking.status === "Approved"
        );
  
        // Process approved booking data and count bookings for each date
        approvedBookings.forEach((booking) => {
          const bookingDate = new Date(booking.startDate);
          // Extract only the date part and convert it to a timestamp
          const dateTimestamp = new Date(
            bookingDate.getFullYear(),
            bookingDate.getMonth(),
            bookingDate.getDate()
          ).getTime();
  
          if (approvedBookingsByDate[dateTimestamp]) {
            approvedBookingsByDate[dateTimestamp]++;
          } else {
            approvedBookingsByDate[dateTimestamp] = 1;
          }
        });
  
        // Convert data to ApexCharts format
        const chartDataByDate = Object.keys(approvedBookingsByDate).map(
          (timestamp) => ({
            x: Number(timestamp),
            y: approvedBookingsByDate[timestamp],
          })
        );
  
        setChartDataByDate(chartDataByDate);
  
        setChartOptionsByDate((options) => ({
          ...options,
          xaxis: {
            type: "datetime",
            labels: {
              formatter: function (value) {
                // Format date without time
                const date = new Date(value);
                return `${date.toLocaleDateString()}`;
              },
            },
          },
        }));
      };
  
      const processChartDataByCategory = () => {
        const rentCollectionByCategory = {
          Medium: 0,
          Large: 0,
          Small: 0,
        };
    
        // Process rent collection data by category
        bookingData.forEach((booking) => {
          const category = booking.category ? booking.category : null;
    
          if (booking.totalRent && category) {
            rentCollectionByCategory[category] += booking.totalRent;
          }
        });
    
        // Convert data to ApexCharts format
        const chartDataByCategory = Object.values(rentCollectionByCategory);
    
        setChartDataByCategory(chartDataByCategory);
      };
    
      processChartDataByCategory();
    }, [bookingData]);
  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="h-[300px]">
        <h2 className="text-xl font-bold mb-4">Rent Collection by Date</h2>
        <ReactApexChart
          options={chartOptionsByDate}
          series={[{ name: "Approved Bookings", data: chartDataByDate }]}
          type="bar"
          height="100%"
        />
      </div>

      <div className="h-[300px]">
        <h2 className="text-xl font-bold mb-4">Rent Collection by Category</h2>
        <ReactApexChart
          options={chartOptionsByCategory}
          series={chartDataByCategory}
          type="donut"
          height="100%"
        />
      </div>
    </div>
  );
};


export default AdminHome;
