'use client';

import { Pause, Play, Volume2 } from 'lucide-react';
import { MediaEventType, useMedia } from './media-context';
import styles from './media-controls.module.css';

export const MediaControls = () => {

  const {state, dispatch} = useMedia();

  /*return <div className={styles.mediaControlsContainer}>
    <input type="button" value="Play" onClick={() => dispatch({type: MediaEventType.PLAY})} />
    <input type="button" value="Pause" onClick={() => dispatch({type: MediaEventType.PAUSE})} />
  </div>;*/
  return (
    <div className={styles.mediaControlsContainer + " bg-gray-800 backdrop-blur-md shadow-2xl rounded-2xl p-4 flex items-center justify-center gap-4 z-50"}>
      <button
        onClick={() => state.playing ? dispatch({type: MediaEventType.PAUSE}) : dispatch({type: MediaEventType.PLAY}) }
        className="p-2 bg-indigo-500 hover:bg-indigo-600 rounded-full transition cursor-pointer"
      >
        {state.playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </button>

      <div className="flex items-center gap-2">
        <Volume2 className="w-5 h-5 text-gray-400" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={0.5}
          onChange={() => {}}
          className="w-28 h-2 bg-blue-500 accent-indigo-500 cursor-pointer"
        />
      </div>
    </div>
  )
}

