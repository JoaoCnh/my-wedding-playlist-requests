import { Index } from "solid-js";
import { debounce } from "@solid-primitives/scheduled";

import { useCarouselProvider } from "~/providers/CarouselProvider";

type ScrollEvent = UIEvent & { currentTarget: HTMLDivElement; target: Element };

function getElementWidth(el: Element) {
  return el.getBoundingClientRect().width;
}

export default function SongCarousel() {
  const ctx = useCarouselProvider();

  let carousel: HTMLDivElement | undefined;

  const selectSong = debounce((songIndex: number) => {
    ctx.selectItem(songIndex);
  }, 50);

  const handleScroll = (e: ScrollEvent) => {
    if (!carousel || !carousel.firstElementChild) return;

    const childWidth = getElementWidth(carousel.firstElementChild);
    const songIndex = Math.floor(e.target.scrollLeft / childWidth);

    ctx.highlightItem(songIndex);
    selectSong(songIndex);
  };

  return (
    <div class="w-full relative overflow-hidden">
      <div
        ref={carousel}
        class="relative flex gap-1 overflow-x-scroll scroll-smooth snap-x snap-mandatory touch-pan-x z-0 overscroll-contain scrollbar-hide md:scrollbar-default"
        onScroll={(e) => handleScroll(e)}
      >
        <Index each={ctx.songs}>
          {(song, index) => (
            <button
              ref={(el) => ctx.registerItem(index, el)}
              class="w-64 h-64 p-4 md:w-96 md:h-96 relative snap-center shrink-0 duration-500 transition-opacity first-of-type:ml-[50vw] last-of-type:mr-[50vw] hover:opacity-100"
              style={{
                opacity:
                  index === ctx.opacityIndex()
                    ? 1
                    : 0.7 - 0.2 * Math.abs(ctx.opacityIndex() - index),
              }}
              tabIndex={-1}
              onClick={() => {
                ctx.scrollToItem(index);
              }}
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
