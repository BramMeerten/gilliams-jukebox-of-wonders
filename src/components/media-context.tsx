'use client';

import { createContext, useContext, useReducer, ReactNode } from "react";
import { Music } from "./music";

const MediaContext = createContext<{state: MediaState, dispatch: (action: MediaEvent) => void}>({state: {playing: false}, dispatch: _ => {}});

export enum MediaEventType {
  PLAY, PAUSE, CHANGE_SOURCE,
}

export interface MediaEvent {
  type: MediaEventType;
  payload?: any;
}

export interface MediaState {
  playing: boolean;
  source?: Music;
}

export const MediaProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer((state, action: MediaEvent) => {
     switch (action.type) {
      case MediaEventType.PLAY:
        return { ...state, playing: true };
      case MediaEventType.PAUSE:
        return { ...state, playing: false };
      case MediaEventType.CHANGE_SOURCE:
        return { ...state, playing: true, source: action.payload as Music };
      default:
        return state;
    }

  }, {playing: false});

  return (
    <MediaContext.Provider value={{state, dispatch}}>
      {children}
    </MediaContext.Provider>
  )

}

export const useMedia = () => useContext(MediaContext);
