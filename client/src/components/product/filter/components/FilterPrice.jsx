import { Card, CardBody, CardHeader } from "reactstrap";
import RangeSlider from "@/components/widgets/RangeSlider";

const priceMarks = {
  1: { label: <p className="fw-normal text-black">$1</p> },
  5000: { label: <p className="fw-normal text-black">$5000</p> }
};

const FilterPrice = ({ setPrice }) => {
  const handlePriceChange = (value) => {
    setPrice(value.join("-"));
  };

  return (
    <Card className="mb-4 rounded-0">
      <CardHeader tag="h3" className="bg-white">
        Price
      </CardHeader>
      <CardBody className="mx-2 mb-3">
        <RangeSlider
          marks={priceMarks}
          defaultValue={[1, 2500]}
          max={5000}
          onChange={handlePriceChange}
        />
      </CardBody>
    </Card>
  );
};

export default FilterPrice;
