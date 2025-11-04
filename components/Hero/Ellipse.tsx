import { forwardRef, SVGProps } from "react";

const Ellipse = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 412 413"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="206"
        cy="206.401"
        r="204.5"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="18 36 54 72"
      />
    </svg>
  )
);

Ellipse.displayName = "Ellipse";

export default Ellipse;
