import LRUCache from "lru-cache";
import {
  cachified,
  CacheEntry,
  lruCacheAdapter,
  verboseReporter,
} from "cachified";

import { supabase } from "~/lib/supabase.server";

interface PlaylistRequest {
  spotify_id: string;
  track_name: string;
  track_artists: string;
  track_small_img: string;
  track_large_img: string;
  track_preview_url: string;
  track_requesters: string;
}

const lruCache = new LRUCache<string, CacheEntry<PlaylistRequest[]>>({
  max: 1,
});

const cache = lruCacheAdapter(lruCache);

export async function getPlaylistRequests(): Promise<PlaylistRequest[]> {
  return cachified({
    key: "playlist-requests",
    cache,
    ttl: 1000 * 60 * 60 * 24, // 24 hours,
    reporter: verboseReporter(),
    async getFreshValue() {
      console.log("GETTING FRESH VALUE");
      const { data, error } = await supabase
        .from("playlist_requests")
        .select<"*", PlaylistRequest>();

      if (error) {
        console.error("❌ error querying playlist requests", error);
      }

      return data ?? [];
    },
  });
}
