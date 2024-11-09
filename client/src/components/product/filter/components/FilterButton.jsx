import { Card, CardBody, CardHeader } from "reactstrap";

import Button from "@/components/ui/Button";

const FilterButton = ({ onReset }) => {
  return (
    <Card className="rounded-0">
      <CardHeader tag="h3" className="bg-white">
        Filters
      </CardHeader>
      <CardBody className="mx-2">
        <Button
          type="submit"
          variant="primary"
          text="CLEAR FILTERS"
          size="lg"
          onClick={onReset}
        />
      </CardBody>
    </Card>
  );
};

export default FilterButton;
