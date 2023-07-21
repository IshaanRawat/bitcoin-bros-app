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
      fill="#202020"
      d="M13 14v2h-2v-2zM10 11v2H8v-2zM16 11v2h-2v-2zM7 8v2H5V8zM19 8v2h-2V8z"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
