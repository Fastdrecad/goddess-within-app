import { useEffect, useRef, useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useGetProductsByTypeQuery } from "@/redux/slices/productsApiSlice";

import Button from "@/components/ui/Button";
import ProductCard from "@/components/product/card/ProductCard";

const SCROLL_AMOUNT = 800;

const HeaderContent = ({ type }) => {
  const headerText = {
    featured:
      "The Featured Shop Cloth Products app offers a curated selection of stylish and high-quality clothing items for users seeking both trendy and timeless apparel options.",
    trending:
      "As a form of self-expression and cultural identity, clothing holds a significant role beyond mere functionality, shaping individual styles and reflecting diverse cultural narratives.",
    recommended:
      "Recommended products are carefully curated selections tailored to suit individual preferences and needs, offering high-quality options that enhance convenience and satisfaction in shopping experiences."
  };

  return (
    <div
      className="feature-header"
      style={{ color: type === "featured" ? "#ffffff" : "#000000" }}
    >
      <h1 className="fs-2 me-3">{type} products</h1>
      <p>{headerText[type]}</p>
    </div>
  );
};

const ProductList = ({ data, isLoading, error, type, scrollRef }) => {
  if (error) return "Something went wrong!";
  if (isLoading) return "loading";

  return (
    <ul className="feature-list" ref={scrollRef}>
      {data.products?.map((product) => (
        <li className="feature-list-item" key={product._id}>
          <ProductCard product={product} type={type} />
        </li>
      ))}
    </ul>
  );
};

const ScrollButton = ({ direction, onClick, icon: Icon }) => (
  <div className={`slider-${direction}`}>
    <Button
      variant="none"
      className="feature"
      onClick={onClick}
      icon={<Icon />}
      ariaLabel={`Scroll ${direction}`}
      iconClassName="slider-icon"
    />
  </div>
);

const FeaturedProducts = ({ type }) => {
  const { data, isLoading, error } = useGetProductsByTypeQuery({ type });
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  const checkScrollPosition = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    // Only add listener if ref exists
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;

      scrollContainer.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition(); // Initial check
      document.body.classList.add("featured-content");

      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
        document.body.classList.remove("featured-content");
      };
    }
  }, [data]); // Add data as dependency to ensure ref is available after data loads

  return (
    <div
      className="feature-container"
      style={{ backgroundColor: type === "featured" ? "#084D5E" : "#e5b9c7" }}
    >
      <div className="feature-wrapper">
        <HeaderContent type={type} />

        <div className="feature-content">
          <ProductList
            data={data}
            isLoading={isLoading}
            error={error}
            type={type}
            scrollRef={scrollRef}
          />
        </div>

        <div className="slider-content">
          {showLeftArrow && (
            <ScrollButton
              direction="left"
              onClick={() => scroll(-SCROLL_AMOUNT)}
              icon={GoArrowLeft}
            />
          )}
          {showRightArrow && (
            <ScrollButton
              direction="right"
              onClick={() => scroll(SCROLL_AMOUNT)}
              icon={GoArrowRight}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
