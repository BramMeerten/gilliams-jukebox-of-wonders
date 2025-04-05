'use client';

import { useMedia } from './media-context';
import styles from './media-controls.module.css';

export const MediaControls = () => {

  const {dispatch} = useMedia();

  return <div className={styles.mediaControlsContainer}>
    <input type="button" value="Play" onClick={() => dispatch({type: 'PLAY'})} />
    <input type="button" value="Pause" onClick={() => dispatch({type: 'PAUSE'})} />
  </div>;
}
