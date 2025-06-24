import React, { useContext, useState, useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom"; // Import useNavigate
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../Providers/AuthProvider";
import Rating from "../../Components/Rating/Rating";
import axios from "axios";

const Details = () => {
  const { user } = useContext(AuthContext);
  const productDetails = useLoaderData();
  const { name, rating, price, category, description, image, _id, offer } = productDetails;
  const [offerTitle, setOfferTitle] = useState('');
  const [quantity, setQuantity] = useState(1); // State to manage quantity
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const fetchOfferTitle = async () => {
      if (offer && offer !== "") {
        try {
          const response = await axios.get('https://car-doctor-server-v1-sigma.vercel.app/offers');
          const offers = response.data;
          const matchedOffer = offers.find((offerItem) => offerItem.code === offer);
          if (matchedOffer) {
            setOfferTitle(matchedOffer.title);
          } else {
            console.log('No matching offer found for the product');
          }
        } catch (error) {
          console.error('Error fetching offers:', error);
        }
      }
    };
    fetchOfferTitle();
  }, [offer]);

  const addToCart = () => {
    if (user) {
      const cartItem = {
        userId: user.email,
        productDetails: productDetails,
        quantity: quantity // Include quantity in cartItem
      };

      fetch("https://car-doctor-server-v1-sigma.vercel.app/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to add product to cart");
          }
        })
        .then((data) => {
          toast.success("Product added to cart");
          navigate("/mycart"); // Redirect to MyCart page
        })
        .catch((error) => {
          toast.error("Failed to add product to cart");
        });
    }
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="p-5 lg:p-12 flex flex-col flex-1 gap-40 lg:flex-row lg:items-center ">
        <div>
          <img className="mt-20" src={image} alt="" />
        </div>
        <div className="text-start flex-1 ">
          <h1 className="text-xl py-4 font-semibold lg:text-2xl ">
            <span>Product Name : </span> {name}
          </h1>
          <h3 className="text-lg">Type : {category}</h3>
          <h3 className="text-lg">Price : {price}</h3>
          <div className="text-start lg:text-lg py-2 font-medium">
            Rating:
            <Rating rating={rating}></Rating>
            <span className="ml-2"></span>
          </div>

          {offerTitle && (
            <div className="text-red-500 text-lg font-bold  py-1 rounded-full">
              {offerTitle}
            </div>
          )}
          <h3 className="text-xl text-start ">
            <span className="text-lg "> Description:</span> {description}
          </h3>

          <div className="quantity-controls flex items-center gap-3">
            <button onClick={decreaseQuantity} className="quantity-btn">-</button>
            <span className="quantity">{quantity}</span>
            <button onClick={increaseQuantity} className="quantity-btn">+</button>
          </div>

          <div className="flex justify-center items-center gap-5">
            <button className="btn btn-grad" onClick={addToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Details;
