import { createSignal } from "solid-js";
import { createContextProvider } from "@solid-primitives/context";

import { clamp } from "~/lib/math";

import type { PlaylistRequest } from "~/types";

const [CarouselProvider, useCarouselProvider] = createContextProvider(
  (props: { initial: number; songs: PlaylistRequest[] }) => {
    let carouselItems: Map<number, HTMLElement> = new Map();

    const songCount = props.songs.length - 1;

    const [selectedIndex, setSelectedIndex] = createSignal(props.initial);

    const selectedSong = () => props.songs[selectedIndex()];

    const selectItem = (index: number) => {
      setSelectedIndex(clamp(index, 0, songCount));
    };

    const registerItem = (index: number, el: HTMLElement) => {
      carouselItems.set(index, el);
    };

    const scrollToItem = (index: number) => {
      const item = carouselItems.get(clamp(index, 0, songCount));
      item?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    };

    return {
      songs: props.songs,
      carouselItems,
      selectedSong,
      selectedIndex,
      selectItem,
      registerItem,
      scrollToItem,
    };
  },
  {
    songs: [],
    carouselItems: new Map(),
    selectedIndex: () => 0,
    // @ts-ignore
    selectedSong: () => undefined,
    selectItem: () => {},
    registerItem: () => {},
    scrollToItem: () => {},
  }
);

export { CarouselProvider, useCarouselProvider };
