import { A } from "solid-start";

export default function Footer() {
  return (
    <footer class="p-4 md:flex md:items-center md:justify-between md:p-6">
      <span class="text-sm text-white sm:text-center">
        © {new Date().getFullYear()}{" "}
        <a
          href="https://joaocnh.dev/"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:underline"
        >
          João Cunha
        </a>
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm text-white sm:mt-0">
        <li>
          <A href="/about" class="mr-4 hover:underline md:mr-6 ">
            About
          </A>
        </li>
      </ul>
    </footer>
  );
}
