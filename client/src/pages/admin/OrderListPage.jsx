import { useState } from "react";
import { Col, Row } from "react-bootstrap";

import { useGetOrdersQuery } from "@/redux/slices/ordersApiSlice";

import Message from "@/components/features/Message";
import Pagination from "@/components/navigation/Pagination";
import TableOrders from "@/components/tables/TableOrders";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Sets the maximum number of orders displayed per page
const limit = 5;

const OrderListPage = () => {
  // State to manage the current page for pagination
  const [pageNumber, setPageNumber] = useState(1);

  // Fetch orders with pagination, tracking loading and error states
  const { data, isLoading, error, refetch } = useGetOrdersQuery({
    page: pageNumber,
    limit
  });

  // Check if pagination controls should be displayed
  const displayPagination = data?.totalPages > 1;

  // Calculate the range of displayed orders
  const left = limit * (data?.currentPage - 1) + 1;
  const totalOrders = data?.orders.length;
  const right = totalOrders + left - 1;

  // Update page and refetch orders when pagination changes
  const handlePagination = (pageNumber) => {
    setPageNumber(pageNumber);
    refetch();
  };

  // Display a message if there's an error fetching orders
  if (error) {
    return <Message variant="danger">No orders found.</Message>;
  }

  return (
    <>
      <h1>Orders</h1>
      {/* Display loading spinner if data is still loading */}
      {isLoading ? (
        <Row className="align-items-center justify-content-center">
          <LoadingSpinner />
        </Row>
      ) : (
        <>
          {/* Display current range and total order count */}
          <Row className="mx-0 text-end">
            <Col className="pe-0 pb-2 pt-3 fw-bolder">
              <span>Showing: </span>
              {data?.totalOrders > 0
                ? `${left}-${right} orders of ${data?.totalOrders} orders`
                : `${data?.totalOrders} orders`}
            </Col>
          </Row>

          {/* Render table of orders */}
          <TableOrders orders={data?.orders} />

          {/* Show pagination controls if there are multiple pages */}
          {displayPagination && (
            <div className="d-flex justify-content-center text-center mt-4">
              <Pagination
                totalPages={data?.totalPages}
                onPagination={handlePagination}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default OrderListPage;
