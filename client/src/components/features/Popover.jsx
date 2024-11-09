import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";

const Popover = ({ target, placement, popoverTitle, children }) => {
  return (
    <UncontrolledPopover placement={placement} target={target} trigger="legacy">
      {popoverTitle && <PopoverHeader>{popoverTitle}</PopoverHeader>}
      <PopoverBody>{children}</PopoverBody>
    </UncontrolledPopover>
  );
};

export default Popover;
