import { useState } from "react";

const Thumbnail = ({ product, setSelectedImg }) => {
  const [active, setActive] = useState(0);
  const { images } = product;

  const handleFocus = (index) => {
    setActive(index);
    setSelectedImg(index);
  };

  return (
    <>
      {images.map((image, index) => (
        <img
          key={index}
          src={image?.thumbnail}
          alt={`Product ${index}`}
          className={`${index === active ? "active" : ""}`}
          onMouseOver={() => {
            setActive(index);
            setSelectedImg(index);
          }}
          onFocus={() => handleFocus(index)}
        />
      ))}
    </>
  );
};

export default Thumbnail;
