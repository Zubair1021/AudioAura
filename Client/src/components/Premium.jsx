import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Premium = () => {
  const navigate = useNavigate();

  const [monthlyPrice] = useState(12.99); // Monthly Price
  const [yearlyPrice] = useState(30.99); // Yearly Price

  const handleBack = () => {
    navigate(-1);
  };

  const MakePayment = async (price, interval) => {
    const stripe = await loadStripe(
      "pk_test_51QM8InGrY1JqG9Bl9huwlyiEbRMfBJ1L53aH513B5LKQkT6hFBlrswOpltUyXzn3jZyRpwG633LQHMdbegVFiRui00rtF0Slhe"
    );

    if (!stripe) {
      console.error("Stripe failed to load.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/payement/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
         
          },
          body: JSON.stringify({
            username: "premium_user",
            price: price,
            interval: interval,
          }),
        }
      );

      const session = await response.json();

      if (session.error) {
        console.error("Error creating session:", session.error);
        return;
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error("Error redirecting to checkout:", result.error.message);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const updatePremiumPrice = async (subscription) => {
    try {
      const response = await fetch("http://localhost:3000/purchasepremium", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          subscriptionType: subscription,
        }),
      });

      const data = await response.json();
      if(data.success){
        alert(msg);
      }
      else if (!data.success) {
        alert(data.msg);
      }
      console.log(data);
    } catch (error) {
      console.error("Error updating premium price:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white p-8 relative">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 bg-[#121212] text-white px-4 py-2 rounded-full hover:bg-[#2A2A2A] transition duration-300 shadow-md"
      >
        <b>← Back</b>
      </button>

      {/* Header Section */}
      <div className="text-center mb-8 mt-10 sm:mt-10">
        <h1 className="text-4xl font-extrabold text-[#00ABE4] mb-4">
          Explore Premium Plans
        </h1>
        <p className="text-lg text-gray-400">
          Upgrade to enjoy more benefits and better sound quality!
        </p>
      </div>
      {/* Card Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 sm:mx-20 lg:mx-40 gap-8">
        {/* Premium Card 1 (Monthly) */}
        <div className="bg-[#2C2C2C] border border-[#383838] rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#00ABE4]">
            Monthly Pack
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Enjoy unlimited music and exclusive features every month!
          </p>
          <p className="text-4xl font-bold text-[#00ABE4] mb-6">
            ${monthlyPrice}/month
          </p>
          <ul className="text-sm mb-6 space-y-2">
            <li>✓ Unlimited skips</li>
            <li>✓ Offline listening</li>
            <li>✓ No ads</li>
            <li>✓ High-quality audio</li>
          </ul>
          <button
            className="bg-[#00ABE4] text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-[#0086b3] transition duration-300 mt-auto shadow-md hover:shadow-lg"
            onClick={() => {
              updatePremiumPrice("monthly");
              MakePayment(monthlyPrice, "month");
            }}
          >
            Get Premium
          </button>
        </div>
        {/* Premium Card 2 (Yearly) */}
        <div className="bg-[#2C2C2C] border border-[#383838] rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#00ABE4]">
            Yearly Pack
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Get the ultimate music experience all year long, without
            interruptions!
          </p>
          <p className="text-4xl font-bold text-[#00ABE4] mb-6">
            ${yearlyPrice}/year
          </p>
          <ul className="text-sm mb-6 space-y-2">
            <li>✓ Priority customer support</li>
            <li>✓ Shared playlists</li>
            <li>✓ No ads</li>
            <li>✓ High-quality audio</li>
          </ul>
          <button
            onClick={() => {
              updatePremiumPrice("yearly");
              MakePayment(yearlyPrice, "year");
            }}
            className="bg-[#00ABE4] text-white font-bold py-2 px-4 rounded-lg w-full hover:bg-[#0086b3] transition duration-300 mt-auto shadow-md hover:shadow-lg"
          >
            Get Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
