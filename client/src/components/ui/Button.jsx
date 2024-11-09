import Popover from "@/components/features/Popover";
import Tooltip from "@/components/ui/Tooltip";

const variants = {
  primary: "custom-btn-primary",
  secondary: "custom-btn-secondary",
  danger: "custom-btn-danger",
  link: "custom-btn-link",
  dark: "custom-btn-dark",
  none: "custom-btn-none",
  empty: ""
};

const Button = ({
  id,
  size,
  variant,
  tabIndex,
  ariaLabel,
  ariaExpanded,
  type,
  disabled,
  className,
  text,
  role,
  icon,
  iconDirection,
  iconClassName,
  borderless,
  round,
  onClick,
  tooltip,
  tooltipContent,
  textColor,
  popover,
  popoverContent,
  popoverTitle
}) => {
  const v = variant ? variants[variant] : "";

  const btnVariant = v;

  const btn =
    icon && text ? "with-icon" : icon && !text ? "icon-only" : "text-only";

  const classNames = `input-btn ${`${className && ` ${className}`}`}${
    btnVariant && ` ${btnVariant}`
  }${` ${size}`} ${btn} ${
    iconDirection === "left" ? "icon-left" : "icon-right"
  } ${borderless ? "border-0" : ""} ${disabled ? "disabled" : ""}`;

  const iconClassNames = `btn-icon${`${iconClassName && ` ${iconClassName}`}`}`;

  const tooltipId = tooltip ? `tooltip-${id}` : id;
  const popoverId = popover ? `popover-${id}` : id;
  const btnId = tooltip ? tooltipId : popoverId;

  const style = round ? { borderRadius: `${round}px` } : {};

  const textClassName = textColor ? `${textColor}` : "btn-text";

  return (
    <button
      id={btnId}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      role={role}
      disabled={disabled}
      className={classNames}
      type={type}
      onClick={onClick}
      style={style}
    >
      {tooltip && <Tooltip target={tooltipId}>{tooltipContent}</Tooltip>}
      {popover && (
        <Popover target={popoverId} popoverTitle={popoverTitle}>
          {popoverContent}
        </Popover>
      )}
      {iconDirection === "left" ? (
        <>
          {icon && <div className={iconClassNames}>{icon}</div>}
          {text && <span className={textClassName}>{text}</span>}
        </>
      ) : (
        <>
          {text && <span className={textClassName}>{text}</span>}
          {icon && <div className={iconClassNames}>{icon}</div>}
        </>
      )}
    </button>
  );
};

export default Button;
