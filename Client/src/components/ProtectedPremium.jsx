import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedPremium = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Corrected the destructuring
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3000/getuserwithid", {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });
        const data = await response.json();
        console.log(data);
        const { success, message, user } = data;
        console.log(user);

        if (success) {
          setUserData(user);
          setLoading(false);
        } else {
          alert(message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("An error occurred while fetching user data.");
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [token]);

  // Ensure userData is available and loading is done
  if (loading) {
    return <div>Loading...</div>; // You can show a loader while the data is being fetched
  }

  // Check if the user is premium, based on the `premium` field (monthly or yearly)
  if (!userData || (userData.premium !== "monthly" && userData.premium !== "yearly")) {
    return <Navigate to="/spotify/premium" />; // Redirect if user is not premium
  }

  return children; // User is premium, render the protected content
};

export default ProtectedPremium;
