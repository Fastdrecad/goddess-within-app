import {
  useDeleteUserMutation,
  useGetUsersQuery
} from "@/redux/slices/usersApiSlice";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

import Pagination from "@/components/navigation/Pagination";
import TableUsers from "@/components/tables/TableUsers";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Limit for the number of users displayed per page
const limit = 3;

const UserListPage = () => {
  const [pageNumber, setPageNumber] = useState(1);

  // Fetch users with pagination
  const { data, isLoading, refetch } = useGetUsersQuery({
    page: pageNumber,
    limit
  });

  // Pagination controls: check if pagination is needed
  const displayPagination = data?.totalPages > 1;
  const left = limit * (data?.currentPage - 1) + 1;
  const totalUsers = data?.users.length;
  const right = totalUsers + left - 1;

  // Update page number and refetch data when page changes
  const handlePagination = (pageNumber) => {
    setPageNumber(pageNumber);
    refetch();
  };

  // Mutation for deleting a user
  const [deleteUser] = useDeleteUserMutation();

  // Handle user deletion with confirmation prompt
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        toast.success("User deleted!");
        refetch(); // Refresh user list after deletion
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      {/* Show loading spinner while data is being fetched */}
      {isLoading ? (
        <Row className="align-items-center justify-content-center">
          <LoadingSpinner />
        </Row>
      ) : (
        <>
          {/* Display total user count and current range */}
          <Row className="mx-0 text-end">
            <Col className="pe-0 pb-2 pt-2 fw-bolder">
              <span>Showing: </span>
              {data?.totalUsers > 0
                ? `${left}-${right} users of ${data?.totalUsers}`
                : `${data?.totalUsers} users`}
            </Col>
          </Row>

          {/* User table */}
          <TableUsers users={data?.users} handleDelete={handleDelete} />

          {/* Display pagination if there are multiple pages */}
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

export default UserListPage;
