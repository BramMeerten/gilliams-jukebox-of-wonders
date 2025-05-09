'use client';

import { Music } from '@/model/music';
import { createContext, useContext, useReducer, ReactNode } from 'react';

const DEFAULT_STATE: MediaState = { playing: false, volume: 100 };

const MediaContext = createContext<{ state: MediaState; dispatch: (action: MediaEvent) => void }>({
  state: DEFAULT_STATE,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatch: (_) => {},
});

export enum MediaEventType {
  PLAY,
  PAUSE,
  CHANGE_SOURCE,
  CHANGE_VOLUME,
}

export interface MediaEvent {
  type: MediaEventType;
  payload?: unknown;
}

export interface MediaState {
  playing: boolean;
  volume: number;
  source?: Music;
}

export const MediaProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer((state, action: MediaEvent) => {
    switch (action.type) {
      case MediaEventType.PLAY:
        return { ...state, playing: true };
      case MediaEventType.PAUSE:
        return { ...state, playing: false };
      case MediaEventType.CHANGE_SOURCE:
        return { ...state, playing: true, source: action.payload as Music };
      case MediaEventType.CHANGE_VOLUME:
        return { ...state, volume: action.payload as number };
      default:
        return state;
    }
  }, DEFAULT_STATE);

  return <MediaContext.Provider value={{ state, dispatch }}>{children}</MediaContext.Provider>;
};

export const useMedia = () => useContext(MediaContext);
