import type { JSX } from "solid-js";

export default function DoubleRightChevron(
  props: JSX.SvgSVGAttributes<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width={1.5}
      stroke="currentColor"
      class="w-6 h-6"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-line-join="round"
        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
}
