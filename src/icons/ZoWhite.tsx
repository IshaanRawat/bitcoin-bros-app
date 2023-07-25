import * as React from "react";
import { SVGProps, memo } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      fill="#fff"
      d="m0 4.875 4.543 14.29H7.06L2.555 4.875H0Zm21.482 0-4.77 14.29h2.556L24 4.875h-2.517ZM8.13 12.408h3.692l-4.013 5.054v1.703h8.025v-2.441h-3.914l4.047-5.054V9.966H8.129v2.442Z"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
