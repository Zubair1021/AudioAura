import { createContext } from "react";

const CategoryContext = createContext({
    category: "",
    setCategory: () => {},
});

export default CategoryContext;