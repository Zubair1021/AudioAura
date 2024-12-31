// src/utils/api.js
export const searchSongs = async (query) => {
    if (!query.trim()) return []; // Return an empty array for empty queries
  
    try {
      const response = await fetch(`http://localhost:3000/admin/search?query=${query}`);
      const data = await response.json();
  
      if (data.success) {

        return data.results; // Return the songs if the request is successful
      } else if(!data.success) {
        alert(data.message)
        console.error(data.message);
        return [];
      }
    } catch (error) {
      console.error("Error searching songs:", error);
      return [];
    }
  };
  