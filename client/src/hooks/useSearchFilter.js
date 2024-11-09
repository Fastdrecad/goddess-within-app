import { useState, useEffect } from "react";
import { useGetProductsQuery } from "@/redux/slices/productsApiSlice";

const useSearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const { data } = useGetProductsQuery();

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const filtered = data?.products?.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  }, [data, searchTerm]);

  return { searchTerm, setSearchTerm, filteredItems, setFilteredItems };
};

export default useSearchFilter;
