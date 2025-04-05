'use client';

import { Pause, Play, Volume2 } from 'lucide-react';
import { MediaEventType, useMedia } from './media-context';
import styles from './media-controls.module.css';
import { useCallback, useEffect } from 'react';

export const MediaControls = () => {

  const {state, dispatch} = useMedia();

  const togglePlay = useCallback(() => {
    if (state.playing) {
      dispatch({type: MediaEventType.PAUSE});
    } else {
      dispatch({type: MediaEventType.PLAY});
    }
  }, [dispatch, state]);

  const keyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space' || e.code === 'KeyK') {
      e.preventDefault();
      togglePlay();
    }
  }, [togglePlay]);

  useEffect(() => {
    document.addEventListener("keydown", keyDown, false);

    return () => {
      document.removeEventListener("keydown", keyDown, false);
    }
  }, [keyDown]);

  return (
    <div className={styles.mediaControlsContainer + " bg-gray-800 backdrop-blur-md shadow-2xl rounded-2xl p-4 flex items-center justify-center gap-4 z-50"}>
      <button
        onClick={togglePlay}
        className="p-2 bg-indigo-500 hover:bg-indigo-600 rounded-full transition cursor-pointer"
      >
        {state.playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </button>

      <div className="flex items-center gap-2">
        <Volume2 className="w-5 h-5 text-gray-400" />
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={state.volume}
          onChange={e => dispatch({type: MediaEventType.CHANGE_VOLUME, payload: +e.target.value})}
          className="w-28 h-2 bg-blue-500 accent-indigo-500 cursor-pointer"
        />
      </div>
    </div>
  )
}

