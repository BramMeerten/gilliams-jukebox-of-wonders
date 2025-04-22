import { MediaEventType, useMedia } from '@/components/media-player/media-context';
import { Music } from '@/model/music';
import { motion } from 'motion/react';

interface Props {
  music: Music;
  category: string;
  removeClicked: () => void;
  className: string;
}

export const DRAG_KEY_MUSIC = 'music';
export const DRAG_KEY_CATEGORY = 'category';

export const MusicTile = ({ music, category, removeClicked, className }: Props) => {
  const { dispatch } = useMedia();

  const handleClick = () => {
    dispatch({ type: MediaEventType.CHANGE_SOURCE, payload: music });
  };

  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData(DRAG_KEY_CATEGORY, category);
    e.dataTransfer.setData(DRAG_KEY_MUSIC, JSON.stringify(music));
  };

  return (
    <motion.div
      className={`relative sm:w-72 sm:h-40 w-63 h-35 rounded-2xl overflow-hidden shadow-lg bg-cover bg-center group cursor-pointer z-2 ${className}`}
      draggable="true"
      onDragStart={onDragStart as any /*eslint-disable-line @typescript-eslint/no-explicit-any*/}
      layout
      layoutId={music.id}
      data-column={category}
      style={{ backgroundImage: `url(${music.image})`, transition: 'margin 300ms' }}
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

      <button
        className="absolute top-2 right-2 z-20 w-6 h-6 rounded-full bg-black/50 hover:bg-black/70 hover:text-gray-400 
                   sm:flex hidden items-center justify-center text-white text-sm
                   cursor-pointer duration-300 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-1"
        onClick={(e) => {
          e.stopPropagation();
          removeClicked();
        }}
      >
        ✕
      </button>

      <div className="relative z-10 flex items-end justify-between h-full p-4 text-white transition-transform duration-300 group-hover:-translate-y-1">
        <div className="overflow-hidden">
          <h2 className="sm:text-xl text-lg font-semibold">{music.title}</h2>
          <p className="text-sm text-gray-300">{music.subtitle}</p>
        </div>
        <div className="flex items-center justify-center w-8 h-8 min-w-8 rounded-full bg-white/20 group-hover:bg-white/30 transition duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 fill-white"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
