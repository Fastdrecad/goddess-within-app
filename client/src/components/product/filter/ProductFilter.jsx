import { useState } from "react";

import { useGetCategoriesListQuery } from "@/redux/slices/categoryApiSlice";

import {
  FilterCategory,
  FilterSize,
  FilterPrice,
  FilterRating,
  FilterButton
} from "./components";

const ProductFilter = ({
  size,
  setSize,
  setPrice,
  setRating,
  selectedCategories,
  setSelectedCategories,
  refetch
}) => {
  const { data: categoryData } = useGetCategoriesListQuery();
  const [priceKey, setPriceKey] = useState("price-0"); // Changed initial value
  const [ratingKey, setRatingKey] = useState("rating-0"); // Changed initial value

  const handleResetFilters = () => {
    setSize(null);
    setSelectedCategories([]);
    setPriceKey((prevKey) => `price-${parseInt(prevKey.split("-")[1]) + 1}`);
    setRatingKey((prevKey) => `rating-${parseInt(prevKey.split("-")[1]) + 1}`);
    refetch();
  };

  return (
    <div className="product-filter">
      <FilterCategory
        categoryData={categoryData}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        refetch={refetch}
      />
      <FilterSize size={size} setSize={setSize} />
      <FilterPrice key={priceKey} setPrice={setPrice} />
      <FilterRating key={ratingKey} setRating={setRating} />
      <FilterButton onReset={handleResetFilters} />
    </div>
  );
};

export default ProductFilter;
