import { Card, CardBody, CardHeader } from "reactstrap";
import Dropdown from "@/components/ui/Dropdown";

const sizes = [
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" }
];

const FilterSize = ({ size, setSize }) => {
  return (
    <Card className="mb-4 rounded-0">
      <CardHeader tag="h3" className="bg-white">
        Size
      </CardHeader>
      <CardBody className="p-0">
        <Dropdown
          options={sizes}
          value={size}
          onChange={setSize}
          title="Filter by size"
        />
      </CardBody>
    </Card>
  );
};

export default FilterSize;
