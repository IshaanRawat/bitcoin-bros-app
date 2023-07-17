import * as React from "react";
import { SVGProps, memo } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    {...props}
  >
    <path
      fill="#FF4545"
      d="M8 2h6v2H8zM8 11h10v2H8zM8 22h6v-2H8zM2 8h2v8H2zM4 6h2v2H4zM20 11h2v2h-2zM18 9h2v2h-2zM16 7h2v2h-2zM18 13h2v2h-2zM16 15h2v2h-2zM6 4h2v2H6zM4 18h2v-2H4zM6 20h2v-2H6z"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
