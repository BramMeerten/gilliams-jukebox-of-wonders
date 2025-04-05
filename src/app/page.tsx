import { MUSIC_DATA } from "@/components/data";
import { MusicTileRow } from "@/components/music-tile-row";

export default function Home() {
  return (
    <div className="grid justify-items-center p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main>
        { MUSIC_DATA.map(cat => <MusicTileRow key={cat.category} name={cat.category} tiles={cat.music} />) }
      </main>
    </div>
  );
}
