import { Index } from "solid-js";

import { useCarouselProvider } from "~/providers/CarouselProvider";

export default function AnimatedTitle() {
  const ctx = useCarouselProvider();

  return (
    <div class="h-14 w-full flex flex-col justify-center items-center mx-4">
      <Index each={ctx.songs}>
        {(song, index) => {
          return (
            <span
              class="absolute w-full md:w-1/2 flex flex-col text-white text-center transition-all duration-500 truncate"
              style={{
                opacity: index === ctx.selectedIndex() ? 1 : 0,
                transform:
                  index === ctx.selectedIndex()
                    ? `translateY(0)`
                    : `translateY(3.5rem)`,
              }}
            >
              <span class="block text-2xl md:text-4xl font-bold uppercase">
                {song().track_name}
              </span>
              <span class="block uppercase">{song().track_artists}</span>
            </span>
          );
        }}
      </Index>
    </div>
  );
}
