const NotFound = ({ message, className, children }) => {
  return (
    <div className={`not-found ${className}`}>
      {message ? message : children}
    </div>
  );
};

export default NotFound;
