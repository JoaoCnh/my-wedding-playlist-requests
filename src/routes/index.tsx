// server
import { createServerData$ } from "solid-start/server";
import { getPlaylistRequests$ } from "~/lib/playlist.server";
// client
import { useRouteData } from "solid-start";

import SongCarousel from "~/components/SongCarousel";
import MusicControls from "~/components/MusicControls";
import AnimatedTitle from "~/components/AnimatedTitle";
import { CarouselProvider } from "~/providers/CarouselProvider";

export function routeData() {
  return createServerData$(() => getPlaylistRequests$());
}

export default function Home() {
  const requests = useRouteData<typeof routeData>();

  if (!requests()) return null;

  return (
    <main class="h-full flex flex-col items-center justify-center">
      <CarouselProvider initial={0} songs={requests() || []}>
        <AnimatedTitle />
        <SongCarousel />
        <MusicControls />
      </CarouselProvider>
    </main>
  );
}
