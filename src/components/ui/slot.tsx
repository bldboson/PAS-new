import * as React from "react";

export interface SlotProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const Slot = React.forwardRef<HTMLButtonElement, SlotProps>(
  ({ children, className, ...props }, ref) => {
    if (React.isValidElement(children)) {
      const childProps = children.props as Record<string, any>;
      return React.cloneElement(children as React.ReactElement<any>, {
        ...props,
        ref,
        className: [className, childProps?.className].filter(Boolean).join(" "),
      });
    }
    return (
      <button ref={ref} className={className} {...props}>
        {children}
      </button>
    );
  }
);

Slot.displayName = "Slot";

