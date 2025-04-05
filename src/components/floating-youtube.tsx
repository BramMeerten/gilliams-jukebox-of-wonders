'use client';

import { useEffect, useState } from 'react';
import styles from './floating-youtube.module.css';
import { useMedia } from './media-context';
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';

export const FloatingYoutube = () => {
  const {state} = useMedia();
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);

  const videoId = "ddMSMwKQkKI";
  const id = "2dc7GWDIE1pHgoc4";

  useEffect(() => {
    if (state.playSignal) {
      player?.playVideo();
    } else {
      player?.pauseVideo();
    }
  }, [state.playSignal]);

  const onReady = (event: YouTubeEvent) => {
    setPlayer(event.target);
  };

  return (<div className={styles.floatingYoutube}>
          <YouTube 
              className={styles.floatingYoutubeIframe}
              iframeClassName={styles.floatingYoutubeIframe}
              videoId={videoId}
              id={id}
              opts={{
                playerVars: {
                  autoplay: true,
                }
              }}
              onReady={onReady}
            />
  </div>);
}
