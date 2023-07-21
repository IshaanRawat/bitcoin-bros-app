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
      d="M4 7h2v12H4zM6 5h5v2H6zM13 5h5v2h-5zM11 7h2v2h-2zM6 13h12v2H6zM18 7h2v12h-2z"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
