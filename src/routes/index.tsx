// server
import { createServerData$ } from "solid-start/server";
import { getPlaylistRequests } from "~/lib/playlist.server";
// client
import { createSignal } from "solid-js";
import { useRouteData } from "solid-start";

import AlbumCarousel from "~/components/AlbumCarousel";
import MusicControls from "~/components/MusicControls";
import AnimatedTitle from "~/components/AnimatedTitle";

export function routeData() {
  return createServerData$(() => getPlaylistRequests());
}

export default function Home() {
  const { latest } = useRouteData<typeof routeData>();

  if (!latest) return null;

  const [selectedIndex, setSelectedIndex] = createSignal(
    Math.floor(latest.length / 2)
  );

  const album = () => latest[selectedIndex()];

  return (
    <main class="h-full flex flex-col items-center justify-center">
      <AnimatedTitle albums={latest} selectedIndex={selectedIndex()} />

      <AlbumCarousel
        albums={latest}
        selectedIndex={selectedIndex()}
        onAlbumSelect={(index) => {
          setSelectedIndex(index);
        }}
      />

      <MusicControls
        previewUrl={album().track_preview_url}
        prevDisabled={selectedIndex() === 0}
        nextDisabled={selectedIndex() === latest.length - 1}
        onPrev={() => {
          setSelectedIndex((prev) => Math.max(0, prev - 1));
        }}
        onNext={() => {
          setSelectedIndex((prev) => Math.min(prev + 1, latest.length - 1));
        }}
      />
    </main>
  );
}
