import LRUCache from "lru-cache";
import {
  cachified,
  CacheEntry,
  lruCacheAdapter,
  verboseReporter,
} from "cachified";

import { supabase } from "~/lib/supabase.server";

import type { PlaylistRequest } from "~/types";

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
