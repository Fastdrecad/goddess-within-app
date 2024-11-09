import { useState } from "react";
import { toast } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetFilteredProductsQuery
} from "@/redux/slices/productsApiSlice";
import { useGetCategoriesQuery } from "@/redux/slices/categoryApiSlice";
import { useGetBrandsListQuery } from "@/redux/slices/brandApiSlice";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Message from "@/components/features/Message";
import Meta from "@/components/features/Meta";
import Button from "@/components/ui/Button";
import TableProducts from "@/components/tables/TableProducts";
import Pagination from "@/components/navigation/Pagination";

// Limit for the number of products per page
const limit = 12;

const ProductListPage = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);

  // Fetch products with pagination
  const {
    data: products,
    isLoading: loadingProducts,
    error: productsError,
    refetch
  } = useGetFilteredProductsQuery({ page: pageNumber, limit });

  // Determine if pagination should be displayed
  const displayPagination = products?.totalPages > 1;

  // Calculate the range of displayed products
  const left = limit * (products?.currentPage - 1) + 1;
  const totalProducts = products?.products.length;
  const right = totalProducts + left - 1;

  // Navigate to create product page
  const handleCreateProduct = () => {
    navigate("/admin/create-product");
  };

  // Update page and refetch products on page change
  const handlePagination = (pageNumber) => {
    setPageNumber(pageNumber);
    refetch();
  };

  // Fetch categories and brands data
  const {
    data: categoriesData,
    isLoading: loadingCategories,
    error: categoriesError
  } = useGetCategoriesQuery();

  const {
    data: brandsData,
    isLoading: loadingBrands,
    error: brandsError
  } = useGetBrandsListQuery();

  // Mutation to delete a product
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  // Handle product deletion with a confirmation prompt
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted!");
        refetch(); // Refresh products list after deletion
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // Combine product data with category and brand names for display
  const combinedData = products?.products.map((product) => {
    const category = categoriesData?.categories.find(
      (cat) => cat._id === product.category
    );
    const brand = brandsData?.brands.find(
      (brand) => brand._id === product.brand
    );

    return {
      ...product,
      category: category?.name,
      brand: brand?.name
    };
  });

  // Show loading spinner if any data is loading
  if (loadingDelete || loadingProducts || loadingCategories || loadingBrands) {
    return <LoadingSpinner />;
  }

  // Show error message if there's an error in fetching data
  if (productsError || categoriesError || brandsError) {
    return (
      <Message variant="danger">
        {productsError?.data?.message ||
          categoriesError?.data?.message ||
          brandsError?.data?.message ||
          "An error occurred"}
      </Message>
    );
  }

  return (
    <>
      {/* Page header with title and "Create Product" button */}
      <Row className="align-items-baseline">
        <Meta title="Goddess within product list" />
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button
            onClick={handleCreateProduct}
            className="create-product-btn"
            variant="primary"
            text="Create Product"
            size="md"
          />
        </Col>
      </Row>

      {/* Display current range and total product count */}
      <Row className="mx-0 text-end">
        <Col className="pe-0 pb-2 pt-3 fw-bolder">
          <span>Showing: </span>
          {totalProducts > 0
            ? `${left}-${right} products of ${products?.totalProducts} products`
            : `${products?.totalProducts} products`}
        </Col>
      </Row>

      {/* Render table of products */}
      <TableProducts combinedData={combinedData} handleDelete={handleDelete} />

      {/* Display pagination controls if necessary */}
      {displayPagination && (
        <div className="d-flex justify-content-center text-center mt-4">
          <Pagination
            totalPages={products?.totalPages}
            onPagination={handlePagination}
          />
        </div>
      )}
    </>
  );
};

export default ProductListPage;
