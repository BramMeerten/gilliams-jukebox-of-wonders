import { MediaEventType, useMedia } from "@/components/media-player/media-context";
import { Music } from "@/model/music";
import { useState } from "react";

interface Props {
  music: Music;
  removeClicked: () => void;
  className: string;
}

export const MusicTile = ({music, removeClicked, className}: Props) => {
  const {dispatch} = useMedia();
  const [isBeingRemoved, setIsBeingRemoved] = useState(false);

  const handleClick = () => {
    dispatch({type: MediaEventType.CHANGE_SOURCE, payload: music});
  };

  return (
    <div className={`relative h-40 rounded-2xl overflow-hidden shadow-lg bg-cover bg-center group cursor-pointer
                     transition-all duration-300 ease-in-out
                     ${isBeingRemoved ? 'opacity-0 scale-90 w-0 ml-0' : 'w-72 ' + className}`}
         style={{ backgroundImage: `url(${music.image})`}}
         onClick={handleClick}
         onTransitionEnd={() => isBeingRemoved && removeClicked()}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

      <button className="absolute top-2 right-2 z-20 w-6 h-6 rounded-full bg-black/50 hover:bg-black/70 hover:text-gray-400 flex items-center justify-center text-white text-sm
                         cursor-pointer duration-300 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-1"
      onClick={(e) => {
        e.stopPropagation();
        setIsBeingRemoved(true);
      }}>
        ✕
      </button>

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
