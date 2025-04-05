'use client';

import { createContext, useContext, useReducer, ReactNode } from "react";

const MediaContext = createContext({state: {playSignal: false}, dispatch: (unused) => {}});

export const MediaProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer((state, action) => {
     switch (action.type) {
      case 'PLAY':
        return { ...state, playSignal: true };
      case 'PAUSE':
        return { ...state, playSignal: false };
      default:
        return state;
    }

  }, {playSignal: false});

  return (
    <MediaContext.Provider value={{state, dispatch}}>
      {children}
    </MediaContext.Provider>
  )

}

export const useMedia = () => useContext(MediaContext);
