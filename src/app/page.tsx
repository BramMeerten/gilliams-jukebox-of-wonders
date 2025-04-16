import { MUSIC_DATA } from "./data";
import { MusicTileRow } from "./music-tile-row";

export default function Home() {

  return (
    <div className="grid justify-items-center p-8 gap-16 font-[family-name:var(--font-geist-sans)]">
    <div className="bg-testblue text-white p-4">Hello Tailwind</div>
      <main>
        {MUSIC_DATA.map((cat) => (
          <MusicTileRow
            key={cat.category}
            name={cat.category}
            tiles={cat.music}
          />
        ))}
      </main>
    </div>
  );
}
