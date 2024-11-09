import { NavLink } from "react-router-dom";
import {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

import { sliderItems } from "@/data/sliderItems";
import Button from "@/components/ui/Button";

const Carousel = () => {
  return (
    <section className="carousel">
      <CarouselItems>
        {sliderItems.map((item) => (
          <div className="slide" key={item.id}>
            <div className="slide-container">
              <img src={item.img} alt={item.title} />
            </div>
            <div className="info-content">
              <h1 className="info-title">{item.title}</h1>
              <p>{item.desc}</p>
              <NavLink to={`/shop`}>
                <button className="slide-button">{item.btn}</button>
              </NavLink>
            </div>
          </div>
        ))}
      </CarouselItems>
    </section>
  );
};

const CarouselItems = ({ children }) => {
  const containerRef = useRef();
  const [current, setCurrent] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const intervalRef = useRef(null);
  const TRANSITION_DURATION = 1200;

  const updateSlidePosition = useCallback(
    (newTranslateX, newCurrent, duration = TRANSITION_DURATION) => {
      if (containerRef.current) {
        containerRef.current.style.transitionDuration = `${duration}ms`;
        setTranslateX(newTranslateX);
        setCurrent(newCurrent);
      }
    },
    []
  );

  const goToSlide = useCallback(
    (slideIndex) => {
      if (containerRef.current) {
        updateSlidePosition(
          containerRef.current.clientWidth * slideIndex,
          slideIndex
        );
      }
    },
    [updateSlidePosition]
  );

  const actionHandler = useCallback(
    (mode) => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;

      if (mode === "prev") {
        if (current <= 1) {
          updateSlidePosition(0, children.length);
        } else {
          updateSlidePosition(containerWidth * (current - 1), current - 1);
        }
      } else if (mode === "next") {
        if (current >= children.length) {
          updateSlidePosition(containerWidth * (children.length + 1), 1);
        } else {
          updateSlidePosition(containerWidth * (current + 1), current + 1);
        }
      }
    },
    [children.length, current, updateSlidePosition]
  );

  // Handle infinite scroll effect
  useEffect(() => {
    const handleTransitionEnd = () => {
      if (!containerRef.current) return;

      if (current <= 1 || current >= children.length) {
        updateSlidePosition(
          containerRef.current.clientWidth *
            (current <= 1 ? current : children.length),
          current <= 1 ? current : children.length,
          0
        );
      }
    };

    document.addEventListener("transitionend", handleTransitionEnd);
    return () =>
      document.removeEventListener("transitionend", handleTransitionEnd);
  }, [current, children.length, updateSlidePosition]);

  // Handle autoplay
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      actionHandler("next");
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [actionHandler]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        actionHandler("prev");
      } else if (e.key === "ArrowRight") {
        actionHandler("next");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [actionHandler]);

  // The Keypress Event Handler
  const changeChild = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        // If supposed previous child is < 0 set it to last child
        if (current <= 1) {
          setTranslateX(0);
          setCurrent(children.length);
        } else {
          setTranslateX(containerRef.current.clientWidth * (current - 1));
          setCurrent((prev) => --prev);
        }
      } else if (e.key === "ArrowRight") {
        // If supposed next child is > length - 1 set it to first child
        if (current >= children.length) {
          setTranslateX(
            containerRef.current.clientWidth * (children.length + 1)
          );
          setCurrent(1);
        } else {
          setTranslateX(containerRef.current.clientWidth * (current + 1));
          setCurrent((prev) => ++prev);
        }
      }
    },
    [children, current]
  );

  // Set and cleanup the event listener
  useEffect(() => {
    document.addEventListener("keydown", changeChild);

    return function cleanup() {
      document.removeEventListener("keydown", changeChild);
    };
  });

  // position first element correctly & this will render only once
  useLayoutEffect(() => {
    setTranslateX(containerRef.current.clientWidth * current);
  }, []);

  const slides = useMemo(() => {
    if (children.length <= 1) return <li>{children[0]}</li>;

    return [
      <li key={children.length + 1}>{children[children.length - 1]}</li>,
      ...Children.map(children, (child, i) => <li key={i}>{child}</li>),
      <li key={children.length + 2}>{children[0]}</li>
    ];
  }, [children]);

  return (
    <div className="carousel-items">
      <Button
        variant="none"
        className="arrow btn-left"
        onClick={() => actionHandler("prev")}
        ariaLabel="Previous slide"
        icon={<GoArrowLeft />}
        iconClassName="slider-icon"
      />
      <Button
        variant="none"
        className="arrow btn-right"
        onClick={() => actionHandler("next")}
        ariaLabel="Next slide"
        icon={<GoArrowRight />}
        iconClassName="slider-icon"
      />

      <ul
        className="carousel-list"
        ref={containerRef}
        style={{
          transform: `translate3d(${-translateX}px, 0, 0)`
        }}
        aria-live="polite"
      >
        {slides}
      </ul>

      <div className="dots-container" role="tablist">
        {sliderItems.map((_, slideIndex) => (
          <Button
            key={slideIndex}
            variant="none"
            className={`dot ${current === slideIndex + 1 ? "active" : ""}`}
            onClick={() => goToSlide(slideIndex + 1)}
            ariaLabel={`Go to slide ${slideIndex + 1}`}
            text="&#11044;"
            role="tab"
            ariaExpanded={current === slideIndex + 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
