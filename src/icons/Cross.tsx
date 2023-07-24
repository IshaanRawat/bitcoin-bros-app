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
      d="M11 11h2v2h-2zM14 8h2v2h-2zM17 5h2v2h-2zM5 5h2v2H5zM14 16h2v-2h-2zM8 8h2v2H8zM8 16h2v-2H8zM5 19h2v-2H5zM17 19h2v-2h-2z"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
