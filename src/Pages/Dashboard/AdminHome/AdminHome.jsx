import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import CountUp from "react-countup";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const [truckCount, setTruckCount] = useState(0);
  const [bookedCount, setBookedCount] = useState(0);
  const [bookedPieCount, setBookedPieCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [chartDataByDate, setChartDataByDate] = useState([]);

  const [chartData, setChartData] = useState({
    series: [approvedCount, pendingCount, rejectedCount], // Default values, will be replaced by actual data
    options: {
      chart: {
        width: '500',
        type: 'pie',
      },
      labels: ["Approved", "Pending", "Rejected"],
      theme: {
        monochrome: {
          enabled: false,
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5,
          },
        },
      },
      title: {
        text: "Booking Status",
      },
      dataLabels: {
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex];
          return [name, val.toFixed(1) + '%'];
        },
      },
      legend: {
        show: false,
      },
      colors: ["#fb923c", "#ea580c", "#f97316"], 
    },
  });


  const [chartOptionsByDate, setChartOptionsByDate] = useState({
    chart: {
      id: "bookings-chart-by-date",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return Math.round(val); // Display integer values on the y-axis
        },
      },
    },
    fill: {
      colors: ["#f59e0b"], 
    },
  });

  

  const { data: userData = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get('/users');
        // Filter users by type === 'user'
        const filteredUsers = response.data.filter(user => user.type === 'user');
        return filteredUsers;
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    },
  });

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/rent");
        const rentData = response.data;
  
        // Filter data based on status
        const approvedBookings = rentData.filter((booking) => booking.status === 'Approved');
        const pendingBookings = rentData.filter((booking) => booking.status === 'pending');
  
        const totalBookings = rentData.length;
        const approvedCount = approvedBookings.length;
        const pendingCount = pendingBookings.length;
        const rejectedCount = totalBookings - (approvedCount + pendingCount);
  
        setApprovedCount(approvedCount);
        setPendingCount(pendingCount);
        setRejectedCount(rejectedCount);
  
        const totalCount = approvedCount + pendingCount + rejectedCount;
  
        // Calculate percentages
        const approvedPercentage = (approvedCount / totalCount) * 100;
        const pendingPercentage = (pendingCount / totalCount) * 100;
        const rejectedPercentage = (rejectedCount / totalCount) * 100;
  

        console.log(approvedPercentage)
        // Update the series with the calculated percentages
        setChartData((prevChartData) => ({
          ...prevChartData,
          series: [approvedPercentage, pendingPercentage, rejectedPercentage],
        }));
        console.log(chartData);
        
  
        const approvedBookingsByDate = {};
        const currentDate = new Date(); // Get the current date
  
        rentData.forEach((booking) => {
          const bookingDate = new Date(booking.bookedTimeSlot.from);
  
          // Check if the booking date is greater than or equal to the start of the current day
          if (bookingDate >= new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) {
            const dateTimestamp = new Date(
              bookingDate.getFullYear(),
              bookingDate.getMonth(),
              bookingDate.getDate()
            ).getTime();
  
            if (approvedBookingsByDate[dateTimestamp]) {
              // If there's already a booking on this date, change the color
              approvedBookingsByDate[dateTimestamp].color = "#d97706";
              approvedBookingsByDate[dateTimestamp].count++;
            } else {
              // If it's the first booking on this date, set the color to the default
              approvedBookingsByDate[dateTimestamp] = {
                count: 1,
                color: "#d97706", // Default color
              };
            }
          }
        });
  
        const processedChartDataByDate = Object.keys(approvedBookingsByDate).map(
          (timestamp) => ({
            x: Number(timestamp),
            y: approvedBookingsByDate[timestamp].count,
            fillColor: approvedBookingsByDate[timestamp].color,
          })
        );
  
        console.log(processedChartDataByDate);
  
        setChartDataByDate(processedChartDataByDate);
      } catch (error) {
        console.error("Error fetching rented data:", error);
      }
    };
  
    const fetchTruckData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/truck");
        setTruckCount(response.data.length);
      } catch (error) {
        console.error("Error fetching truck data:", error);
      }
    };

    const fetchBookedData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/booked');
        setBookedCount(response.data.length);
      } catch (error) {
        console.error("Error fetching booked data:", error);
      }
    };

  
    const fetchUserData = async () => {
      try {
        const response = await axiosSecure.get('/users');
        // Filter users by type === 'user'
        const filteredUsers = response.data.filter(user => user.type === 'user');
        setUserData(filteredUsers);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchData();
    fetchTruckData();
    fetchUserData();
    fetchBookedData();
  }, []);
  

  return (
    <div className="mt-16">
      <div className="flex gap-12">
        <div className="card drop-shadow w-80 bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="text-2xl font-bold flex flex-col items-center">
              <CountUp className="text-2xl font-bold text-center" start={0} end={truckCount} duration={1} />
              <h2 className="card-title text-center">Total Truck</h2>
            </div>
          </div>
        </div>
        <div className="card drop-shadow w-80 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Card title!</h2>
            <div className="text-2xl font-bold">
              <CountUp className="text-2xl font-bold" start={0} end={userData.length} duration={3} />
            </div>
          </div>
        </div>
        <div className="card drop-shadow w-80 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Card title!</h2>
            <div className="text-2xl font-bold">
              <CountUp className="text-2xl font-bold" start={0} end={bookedCount} duration={3} />
            </div>
          </div>
        </div>
      </div>

  <div className="flex justify-center items-center">
  <div className="h-[300px] max-w-2xl mt-20 ">
        <h2 className="text-xl font-bold mb-8">Bookings by Date</h2>
        <ReactApexChart
          options={chartOptionsByDate}
          series={[{ name: "Bookings", data: chartDataByDate }]}
          type="bar"
          height="100%"
        />
      </div>

      <div>
      <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={500} />
    </div>
      </div>
  </div>
    </div>
  );
};

export default AdminHome;