import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

import Input from "@/components/ui/Input";

const SearchBar = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isInFocus, setIsInFocus] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    if (searchTerm.length >= 3) {
      const filtered = data?.products?.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Debugging: Log filtered results
      console.log("Filtered items:", filtered);

      setFilteredItems(filtered);
    } else {
      setFilteredItems([]); // Clear filtered items if search term is less than 3 characters
    }
  }, [data?.products, searchTerm]);

  // Close dropdown when clicking outside the input
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsInFocus(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isInFocus]);

  return (
    <div className="input-wrapper" ref={inputRef}>
      {/* Search Input */}
      <Input
        id="search"
        placeholder="Search..."
        type="text"
        value={searchTerm}
        onInputFocus={() => setIsInFocus(true)}
        onInputChange={handleInputChange}
      />

      {/* Search Results */}
      {filteredItems?.length > 0 && isInFocus && (
        <div className="search-container active">
          <ul>
            {filteredItems.slice(0, 10).map((item) => (
              <NavLink
                key={item._id}
                to={`/product/${item._id}`}
                onClick={() => {
                  setIsInFocus(false);
                  setFilteredItems([]);
                  setSearchTerm("");
                }}
              >
                <li className="d-flex">
                  <img
                    src={item.images[0].url}
                    alt="product thumbnail"
                    className="search-thumbnail"
                  />
                  <div className="product-thumbnail-content ms-4">
                    <h6>{item.name}</h6>
                    <p>${item.price}</p>
                  </div>
                </li>
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
