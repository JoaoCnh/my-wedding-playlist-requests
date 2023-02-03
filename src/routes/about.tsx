import SolidIcon from "~/components/SolidIcon";

export default function About() {
  return (
    <main class="h-full flex flex-col items-center justify-center">
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
        <SolidIcon
          class="w-10 h-10 mb-2 text-[#2C4F7C]"
          aria-hidden="true"
          fill="currentColor"
        />
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
          Developed with{" "}
          <a
            href="https://www.solidjs.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="underline"
          >
            Solid.js
          </a>
        </h5>
        <p class="mb-3 font-normal text-gray-500">
          Using their framework (in beta){" "}
          <a
            href="https://start.solidjs.com/getting-started/what-is-solidstart"
            target="_blank"
            rel="noopener noreferrer"
            class="underline"
          >
            Solid Start
          </a>
          !
        </p>
        <a
          href="/"
          class="inline-flex items-center text-rose-600 hover:underline"
        >
          Get back to listening!
          <svg
            class="w-5 h-5 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
          </svg>
        </a>
      </div>
    </main>
  );
}
