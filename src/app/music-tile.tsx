'use client';

import { MediaEventType, useMedia } from "@/components/media-player/media-context";
import { Music } from "@/model/music";

export const MusicTile = ({music}: {music: Music}) => {
  const {dispatch} = useMedia();

  const handleClick = () => {
    dispatch({type: MediaEventType.CHANGE_SOURCE, payload: music});
  };

  return (
    <div className="relative w-72 h-40 rounded-2xl overflow-hidden shadow-lg bg-cover bg-center group cursor-pointer"
         style={{ backgroundImage: `url(${music.image})`}}
         onClick={handleClick}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="relative z-10 flex items-end justify-between h-full p-4 text-white transition-transform duration-300 group-hover:-translate-y-1">
        <div>
          <h2 className="text-xl font-semibold">{music.title}</h2>
          <p className="text-sm text-gray-300">{music.subtitle}</p>
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 transition duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
