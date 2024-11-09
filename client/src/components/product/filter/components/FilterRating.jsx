import { Card, CardBody, CardHeader } from "reactstrap";
import RangeSlider from "@/components/widgets/RangeSlider";

const rateMarks = {
  0: {
    label: (
      <span>
        <span className="me-1">5</span>
        <i className="fa fa-star fa-1x" aria-hidden="true"></i>
      </span>
    )
  },
  20: {
    label: (
      <span>
        <span className="me-1">4</span>
        <i className="fa fa-star fa-1x" aria-hidden="true"></i>
      </span>
    )
  },
  40: {
    label: (
      <span>
        <span className="me-1">3</span>
        <i className="fa fa-star fa-1x" aria-hidden="true"></i>
      </span>
    )
  },
  60: {
    label: (
      <span>
        <span className="me-1">2</span>
        <i className="fa fa-star fa-1x" aria-hidden="true"></i>
      </span>
    )
  },
  80: {
    label: (
      <span>
        <span className="me-1">1</span>
        <i className="fa fa-star fa-1x" aria-hidden="true"></i>
      </span>
    )
  },
  100: { label: <span>Any</span> }
};

const ratingCase = (v) => {
  switch (v) {
    case 100:
      return 0;
    case 80:
      return 1;
    case 60:
      return 2;
    case 40:
      return 3;
    case 20:
      return 4;
    default:
      return 5;
  }
};

const FilterRating = ({ setRating }) => {
  const handleRatingChange = (value) => {
    setRating(ratingCase(value));
  };

  return (
    <Card className="mb-4 rounded-0">
      <CardHeader tag="h3" className="bg-white">
        Rating
      </CardHeader>
      <CardBody className="mx-2 mb-4">
        <RangeSlider
          type="slider"
          marks={rateMarks}
          step={20}
          onChange={handleRatingChange}
        />
      </CardBody>
    </Card>
  );
};

export default FilterRating;
