// server
import { createServerData$ } from "solid-start/server";
import { getPlaylistRequests$ } from "~/lib/playlist.server";
// client
import { createSignal } from "solid-js";
import { useRouteData } from "solid-start";

import { random } from "~/lib/random";
import SongCarousel from "~/components/SongCarousel";
import MusicControls from "~/components/MusicControls";
import AnimatedTitle from "~/components/AnimatedTitle";

export function routeData() {
  return createServerData$(() => getPlaylistRequests$());
}

export default function Home() {
  const requests = useRouteData<typeof routeData>();

  if (!requests()) return null;

  const songs = requests() || [];

  const songCount = songs.length - 1;

  const [selectedIndex, setSelectedIndex] = createSignal(
    Math.floor(songs.length / 2)
  );

  const album = () => songs[selectedIndex()];

  return (
    <main class="h-full flex flex-col items-center justify-center">
      <AnimatedTitle songs={songs} selectedIndex={selectedIndex()} />

      <SongCarousel
        songs={songs}
        selectedIndex={selectedIndex()}
        onSongSelect={(index) => {
          setSelectedIndex(index);
        }}
      />

      <MusicControls
        previewUrl={album().track_preview_url}
        prevDisabled={selectedIndex() === 0}
        nextDisabled={selectedIndex() === songCount}
        onPrev={() => {
          setSelectedIndex((prev) => Math.max(0, prev - 1));
        }}
        onGoToStart={() => {
          setSelectedIndex(0);
        }}
        onNext={() => {
          setSelectedIndex((prev) => Math.min(prev + 1, songCount));
        }}
        onGoToEnd={() => {
          setSelectedIndex(songCount);
        }}
        onShuffle={() => {
          setSelectedIndex(random(0, songCount));
        }}
      />
    </main>
  );
}
