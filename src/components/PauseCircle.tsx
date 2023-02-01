import type { JSX } from "solid-js";

export default function PauseCircle(
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
        d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
