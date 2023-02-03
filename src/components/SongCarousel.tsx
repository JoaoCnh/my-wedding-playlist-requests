import { createEffect, Index } from "solid-js";
import { PlaylistRequest } from "~/types";

export default function SongCarousel(props: CarouselProps) {
  const { songs, onSongSelect } = props;
  let carouselItems: Map<number, HTMLButtonElement> = new Map();

  createEffect(() => {
    const item = carouselItems.get(props.selectedIndex);
    item?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  });

  return (
    <div class="w-full relative overflow-hidden">
      <div class="relative flex gap-1 overflow-x-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 scrollbar-hide md:scrollbar-default">
        <Index each={songs}>
          {(song, index) => (
            <button
              ref={(el) => carouselItems.set(index, el)}
              class="w-64 h-64 p-4 md:w-96 md:h-96 relative snap-center shrink-0 duration-500 transition-opacity first-of-type:ml-[50vw] last-of-type:mr-[50vw] hover:opacity-100"
              style={{
                opacity:
                  index === props.selectedIndex
                    ? 1
                    : 0.7 - 0.2 * Math.abs(props.selectedIndex - index),
              }}
              tabIndex={-1}
              onClick={() => onSongSelect(index)}
            >
              <img
                src={song().track_large_img}
                alt={song().track_name}
                class="w-full aspect-square object-cover rounded-lg drop-shadow-md z-10"
              />
            </button>
          )}
        </Index>
      </div>
    </div>
  );
}

interface CarouselProps {
  songs: PlaylistRequest[];
  selectedIndex: number;
  onSongSelect: (index: number) => void;
}
