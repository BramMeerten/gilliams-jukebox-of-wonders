'use client';

import { Pause, Play, Volume2 } from 'lucide-react';
import { MediaEventType, useMedia } from './media-context';
import styles from './media-controls.module.css';
import react, { useCallback, useEffect, useRef, useState } from 'react';

export const MediaControls = () => {

  const {state, dispatch} = useMedia();

  // Dragging
  const [position, setPosition] = useState({ left: 0, bottom: 50 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const boxRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLInputElement>(null);

  // Keyboard controls
  const togglePlay = useCallback(() => {
    if (state.playing) {
      dispatch({type: MediaEventType.PAUSE});
    } else {
      dispatch({type: MediaEventType.PLAY});
    }
  }, [dispatch, state]);

  const keyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space' || e.code === 'KeyK') {
      if (!(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        togglePlay();
      }
    }
  }, [togglePlay]);

  useEffect(() => {
    document.addEventListener("keydown", keyDown, false);
    return () => document.removeEventListener("keydown", keyDown, false);
  }, [keyDown]);

  // Dragging
  const onMouseDown = useCallback((e: react.MouseEvent) => {
    if (!volumeRef.current || !volumeRef.current.contains(e.target as Node)) {
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) {
      return;
    }

    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    if (boxRef.current) {
      const box = boxRef.current;
      const newLeft = parseInt(box.style.left || '0', 10) + dx;
      const newBottom = parseInt(box.style.bottom || '0', 10) - dy;
      
      setPosition({
        left: newLeft,
        bottom: newBottom,
      });

      dragStart.current = { x: e.clientX, y: e.clientY };
    }
  }, [setPosition, boxRef, dragStart]);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
  }, [isDragging]);

  useEffect(() => {
      setPosition(pos => ({...pos, left: window.innerWidth / 2}));
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div 
      className={styles.mediaControlsContainer + " bg-gray-800 backdrop-blur-md shadow-2xl rounded-2xl p-4 flex items-center justify-center gap-4 z-50 cursor-grab"}
      ref={boxRef}
      onMouseDown={onMouseDown}
      style={{
        left: `${position.left}px`,
        bottom: `${position.bottom}px`,
      }}>
      <button
        onClick={togglePlay}
        className="p-2 bg-indigo-500 hover:bg-indigo-600 rounded-full transition cursor-pointer"
      >
        {state.playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </button>

      <div className="flex items-center gap-2">
        <Volume2 className="w-5 h-5 text-gray-400" />
        <input
          ref={volumeRef}
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

