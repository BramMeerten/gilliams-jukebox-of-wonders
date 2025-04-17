"use client";

import { MusicLibrary } from "@/model/library";
import { MusicTileRow } from "./music-tile-row";
import { useEffect, useState } from "react";
import { loadLibrary, saveLibrary } from "./settings/storage";
import { DEFAULT_LIBRARY } from "@/model/default-library";
import { Music } from "@/model/music";

export default function Home() {
  const [library, setLibrary] = useState<MusicLibrary>();

  useEffect(() => {
    setLibrary(loadLibrary() || DEFAULT_LIBRARY);
  }, []);

  const mediaAdded = (category: string, music: Music) => {
    if (!library) {
      return;
    }

    const newLibrary = library.map(cat => {
      if (cat.category === category) {
        if (cat.music.some(m => m.videoId === music.videoId)) {
          throw new Error('Video already exists in category');
        }
        return { category: cat.category, music: [...cat.music, music] };
      } else {
        return { category: cat.category, music: [...cat.music] };
      }
    });

    saveLibrary(newLibrary);
    setLibrary(newLibrary);
  };

  return (
    <div className="grid justify-items-center p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main>
        {!library && <LoadingLibrary />}
        {library &&
          library.map((cat) => (
            <MusicTileRow
              key={cat.category}
              name={cat.category}
              tiles={cat.music}
              mediaAdded={music => mediaAdded(cat.category, music)}
            />
          ))}
      </main>
    </div>
  );
}

const LoadingLibrary = () => {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      <div className="pl-2">Loading Library</div>
    </div>
  );
};
