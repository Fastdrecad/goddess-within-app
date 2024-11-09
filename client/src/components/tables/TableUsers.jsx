import { Fragment } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";

import Button from "@/components/ui/Button";
import SortableTable from "@/components/tables/SortableTable";

const TableUsers = (props) => {
  const { users, handleDelete } = props;

  // Configuration of columns
  const config = [
    { label: "ID", render: (user) => user._id },
    {
      label: "NAME",
      render: (user) => `${user.firstName + ` ` + user.lastName}`,
      sortValue: (user) => `${user.firstName + ` ` + user.lastName}`
    },
    {
      label: "EMAIL",
      render: (user) => user.email,
      sortValue: (user) => user.email
    },
    {
      label: "ADMIN",
      render: (user) =>
        user.role === "ROLE ADMIN" ? (
          <FaCheck style={{ color: "green" }} />
        ) : (
          <FaTimes style={{ color: "red" }} />
        ),
      sortValue: (user) => user.role === "ROLE ADMIN"
    },

    {
      label: "",
      render: (
        user // Changed parameter name from product to user
      ) => (
        <Fragment>
          <LinkContainer
            to={`/admin/user/${user._id}/edit`} // Changed route to user edit
            className="mx-2"
          >
            <Button
              variant="primary"
              size="lg"
              icon={
                <FaEdit
                  style={{ fontSize: "16px", color: "#fff" }}
                  className="mx-2"
                />
              }
            />
          </LinkContainer>

          <Button
            onClick={() => handleDelete(user._id)} // Changed parameter from product to user
            variant="danger"
            size="lg"
            icon={
              <FaTrash
                style={{ fontSize: "16px", color: "#fff" }}
                className="mx-2"
              />
            }
          />
        </Fragment>
      )
    }
  ];

  const keyFn = (user) => {
    return user._id;
  };
  return (
    <div className="border-black border-1 border">
      <SortableTable data={users} config={config} keyFn={keyFn} />
    </div>
  );
};

export default TableUsers;
