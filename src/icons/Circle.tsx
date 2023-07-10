import * as React from "react";
import { SVGProps, memo } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 80 80"
    {...props}
    fill="none"
  >
    <path
      fill={props.fill || "#ffffff"}
      d="M30 12h20v4H30zM30 64h20v4H30zM24 18h4v4h-4zM24 62h4v-4h-4zM56 62h-4v-4h4zM18 24h4v4h-4zM18 56h4v-4h-4zM62 56h-4v-4h4zM12 30h4v20h-4zM52 18h4v4h-4zM58 24h4v4h-4zM64 30h4v20h-4z"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
