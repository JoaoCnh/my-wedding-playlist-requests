import { Index } from "solid-js";

import type { PlaylistRequest } from "~/types";

export default function AnimatedTitle(props: AnimatedTitleProps) {
  const { albums } = props;

  return (
    <div class="h-14 w-full flex flex-col justify-center items-center mx-4">
      <Index each={albums}>
        {(album, index) => {
          return (
            <span
              class="absolute w-1/2 flex flex-col text-white text-center transition-all duration-500 truncate"
              style={{
                opacity: index === props.selectedIndex ? 1 : 0,
                transform:
                  index === props.selectedIndex
                    ? `translateY(0)`
                    : `translateY(3.5rem)`,
              }}
            >
              <span class="block text-2xl md:text-4xl font-bold uppercase">
                {album().track_name}
              </span>
              <span class="block uppercase">{album().track_artists}</span>
            </span>
          );
        }}
      </Index>
    </div>
  );
}

interface AnimatedTitleProps {
  albums: PlaylistRequest[];
  selectedIndex: number;
}
