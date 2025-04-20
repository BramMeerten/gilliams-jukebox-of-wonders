"use client";

import { MusicLibrary } from "@/model/library";
import { MusicTileRow } from "./music-tile-row";
import { useEffect, useState } from "react";
import { loadLibrary, saveLibrary } from "./settings/storage";
import { DEFAULT_LIBRARY } from "@/model/default-library";
import { Music } from "@/model/music";
import { AddCategoryForm } from "@/components/add-category-form";

export default function Home() {
  const [library, setLibrary] = useState<MusicLibrary>();

  useEffect(() => {
    setLibrary(loadLibrary() || DEFAULT_LIBRARY);
  }, []);

  const mediaAdded = (category: string, music: Music) => {
    const newLibrary = library!.map(cat => {
      if (cat.category === category) {
        return { category: cat.category, music: [...cat.music, music] };
      } else {
        return { category: cat.category, music: [...cat.music] };
      }
    });

    saveLibrary(newLibrary);
    setLibrary(newLibrary);
  };

  const mediaRemoved = (category: string, music: Music) => {
    const newLibrary = library!.map(cat => {
      if (cat.category === category) {
        return { category: cat.category, music: [...cat.music.filter(m => m.id !== music.id)] };
      } else {
        return { category: cat.category, music: [...cat.music] };
      }
    });

    saveLibrary(newLibrary);
    setLibrary(newLibrary);
  };

  const mediaMoved = (from: {media: Music, category: string}, to: {index: number, category: string}) => {
    // If tile is moved to a new place in the *same* row AND the new place is to the right of the old place,
    // then offset the index by -1 because by removing the tile from the old place, all indexes shift by 1.
    let indexOffset = 0; 
    if (from.category === to.category) {
      const row = library?.find(r => r.category === to.category);
      if (row) {
        const index = row.music.findIndex(m => m.id === from.media.id);
        if (index < to.index) {
          indexOffset = -1;
        }
      }
    }

    const newLibrary = library!
      // Remove FROM
      .map(cat => ({
        ...cat, 
        music: cat.music.filter(m => cat.category !== from.category || m.id !== from.media.id)
      }))

      // Add TO
      .map(cat => {
        const music = cat.category === to.category ? cat.music.toSpliced(to.index + indexOffset, 0, from.media) : cat.music;
        return {
          ...cat,
          music
        };
      });

    saveLibrary(newLibrary);
    setLibrary(newLibrary);
  };

  const categoryAdded = (category: string, callback: (error?: unknown) => void) => {
    try {
      if (library!.some(row => row.category.toUpperCase() === category.toUpperCase())) {
        throw new Error(`Category ${category} already exists.`);
      }

      const newLibrary: MusicLibrary = [...library!, { category, music: [] }];
      saveLibrary(newLibrary);
      setLibrary(newLibrary);
      callback();
    } catch (e: unknown) {
      callback(e);
    }
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
              mediaRemoved={music => mediaRemoved(cat.category, music)}
              mediaMoved={({from, to}) => mediaMoved(from, to)}
            />
          ))}
        {library && <AddCategoryForm addClicked={categoryAdded} />}
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
