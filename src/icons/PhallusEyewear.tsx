import * as React from "react";
import { SVGProps, memo } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M2 7h9v2H2zM13 7h9v2h-9zM4 9h2v6H4zM6 15h5v2H6zM13 15h5v2h-5zM18 9h2v6h-2zM11 9h2v6h-2z"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
