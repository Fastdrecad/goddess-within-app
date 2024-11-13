import { Alert } from "react-bootstrap";

const Message = ({ variant = "secondary", children }) => {
  return (
    <Alert variant={variant} className="rounded-0">
      {children}
    </Alert>
  );
};

export default Message;
