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
    <path fill="#fff" d="M4 4h6v2H4zM8 18h8v2H8zM2 6h2v4H2z" />
    <path
      fill="#fff"
      d="M2 6h2v4H2zM2 10h4v2H2zM18 10h4v2h-4zM20 6h2v4h-2zM6 12h2v6H6zM16 12h2v6h-2zM10 6h4v2h-4zM14 4h6v2h-6z"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
