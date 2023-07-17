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
      fill="#FF4545"
      d="M2 20V10h2v10zM13 2v10h-2V2zM22 20V10h-2v10zM4 22v-2h16v2zM13 14v2h-2v-2zM15 12v2h-2v-2zM17 10v2h-2v-2zM11 12v2H9v-2zM9 10v2H7v-2z"
    />
  </svg>
);
const Memo = memo(SvgComponent);
export default Memo;
