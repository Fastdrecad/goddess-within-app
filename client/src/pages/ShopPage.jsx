import { useGetFilteredProductsQuery } from "@/redux/slices/productsApiSlice";
import { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";

import Meta from "@/components/features/Meta";
import Dropdown from "@/components/ui/Dropdown";
import Pagination from "@/components/navigation/Pagination";
import ProductFilter from "@/components/product/filter/ProductFilter";
import ProductsShop from "@/components/product/shop/ProductsShop";

// Sorting options for the dropdown
const sortByPrice = [
  { label: "Newest First", value: "createdAt" },
  { label: "PRICE (ASC)", value: "asc" },
  { label: "PRICE (DESC)", value: "desc" }
];

// Limit of products per page
const limit = 12;

const ShopPage = () => {
  // State for filter criteria and pagination
  const [value, setValue] = useState(null);
  const [size, setSize] = useState(null);
  const [price, setPrice] = useState(null);
  const [rating, setRating] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  // Fetch filtered products based on criteria and pagination
  const { data, error, isLoading, refetch } = useGetFilteredProductsQuery({
    size: size?.value,
    sort: value?.value,
    rating,
    price,
    categories: selectedCategories,
    page: pageNumber,
    limit
  });

  // Calculate pagination display details
  const displayPagination = data?.totalPages > 1;
  const left = limit * (data?.currentPage - 1) + 1;
  const totalProducts = data?.products.length;
  const right = totalProducts + left - 1;

  // Update sort criteria
  const handleChangePrice = (option) => {
    setValue(option);
  };

  // Add class for shop-specific styles
  useEffect(() => {
    document.body.classList.add("shop-page");
    return () => document.body.classList.remove("shop-page");
  }, []);

  // Handle pagination changes
  const handlePagination = (pageNumber) => {
    window.scrollTo(0, 0);
    setPageNumber(pageNumber);
    refetch();
  };

  return (
    <div className="shop">
      {/* Set page metadata for SEO */}
      <Meta title="Goddess within" />
      <h1>Women&apos;s Products</h1>

      <Row xs="12">
        {/* Sidebar for product filters */}
        <Col
          xs={{ size: 12, order: 1 }}
          sm={{ size: 12, order: 1 }}
          md={{ size: 12, order: 1 }}
          lg={{ size: 3, order: 1 }}
        >
          <ProductFilter
            size={size}
            setSize={setSize}
            price={price}
            setPrice={setPrice}
            rating={rating}
            setRating={setRating}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            refetch={refetch}
          />
        </Col>

        {/* Main content area for product list and sorting options */}
        <Col
          xs={{ size: 12, order: 2 }}
          sm={{ size: 12, order: 2 }}
          md={{ size: 12, order: 2 }}
          lg={{ size: 9, order: 2 }}
        >
          {/* Toolbar with pagination info and sort dropdown */}
          <Row className="align-items-center mx-0 mb-4 mt-4 mt-lg-0 py-3 py-lg-0 shop-toolbar">
            <Col
              xs={{ size: 12, order: 1 }}
              sm={{ size: 12, order: 1 }}
              md={{ size: 5, order: 1 }}
              lg={{ size: 6, order: 1 }}
              className="text-center text-md-start mt-3 mt-md-0 mb-1 mb-md-0"
            >
              <span>Showing: </span>
              {totalProducts > 0
                ? `${left}-${right} products of ${data?.totalProducts} products`
                : `${data?.totalProducts} products`}
            </Col>

            {/* Sort dropdown */}
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 2, order: 2 }}
              lg={{ size: 2, order: 2 }}
              className="text-end pr-0 d-none d-md-block"
            >
              <span>Sort by</span>
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 5, order: 2 }}
              lg={{ size: 4, order: 2 }}
              className="my-2"
            >
              <Dropdown
                style={{ margin: 0 }}
                options={sortByPrice}
                value={value}
                onChange={handleChangePrice}
                title={"Newest First"}
              />
            </Col>
          </Row>

          {/* Product listing */}
          <ProductsShop
            products={data?.products}
            isLoading={isLoading}
            error={error}
          />

          {/* Pagination control */}
          {displayPagination && (
            <div className="d-flex justify-content-center text-center mt-4">
              <Pagination
                totalPages={data?.totalPages}
                onPagination={handlePagination}
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ShopPage;
