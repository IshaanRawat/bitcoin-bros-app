import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      fill={props.fill || "#CFFF50"}
      d="M8 2h8v2H8zM8 22h8v-2H8zM2 8h2v8H2zM20 8h2v8h-2zM4 6h2v2H4zM6 4h2v2H6zM4 18h2v-2H4zM6 20h2v-2H6zM18 6h2v2h-2zM16 4h2v2h-2zM18 18h2v-2h-2zM16 20h2v-2h-2zM8 11h2v2H8zM10 13h2v2h-2zM12 11h2v2h-2zM14 9h2v2h-2z"
    />
  </svg>
);
export default SvgComponent;
