import {
  Card,
  CardBody,
  CardHeader,
  Input,
  InputGroup,
  Label
} from "reactstrap";

const FilterCategory = ({
  categoryData,
  selectedCategories,
  setSelectedCategories,
  refetch
}) => {
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedCategories(
      isChecked
        ? [...selectedCategories, value]
        : selectedCategories.filter((item) => item !== value)
    );
    refetch();
  };

  return (
    <Card className="mb-3 rounded-0">
      <CardHeader tag="h3" className="bg-white">
        Category
      </CardHeader>
      <CardBody>
        {categoryData?.categories?.map((item) => (
          <InputGroup key={item._id}>
            <Input
              type="checkbox"
              id={item._id}
              value={item._id}
              checked={selectedCategories.includes(item._id)}
              onChange={handleCategoryChange}
            />
            <Label htmlFor={item._id} className="mx-2 user-select-none">
              {item.name}
            </Label>
          </InputGroup>
        ))}
      </CardBody>
    </Card>
  );
};

export default FilterCategory;
