'use client';

import { useEffect, useState } from 'react';
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';
import styles from './floating-youtube.module.css';
import { MediaState, useMedia } from './media-context';

export const FloatingYoutube = () => {
  const {state} = useMedia();
  const [player, setPlayer] = useState<YouTubePlayer | undefined>();
  const [playerState, setPlayerState] = useState<MediaState>({playing: false, volume: 100});

  useEffect(() => {
    if (state.source !== playerState.source) {
      setPlayer(null);
      setPlayerState(playerState => ({...playerState, source: state.source, playing: true}));
    } else {
      if (player) {
        try {
          let changed = false;
          if (state.playing !== playerState.playing) {
            changed = true;
            if (state.playing) {
              player.playVideo();
            } else {
              player.pauseVideo();
            }
          }

          if (state.volume !== playerState.volume) {
            changed = true;
            player.setVolume(state.volume);
          }

          if (changed) {
            setPlayerState(playerState => ({...playerState, playing: state.playing, volume: state.volume}));
          }
        } catch(e: any) {
          // Player not ready
        }
      }
    }
  }, [state, playerState, player]);

  const onReady = (event: YouTubeEvent) => {
    setPlayer(event.target);
  };

  return (<div className={styles.floatingYoutube}>
          {playerState.source && <YouTube 
              className={styles.floatingYoutubeIframe}
              iframeClassName={styles.floatingYoutubeIframe}
              videoId={playerState.source.videoId}
              opts={{
                playerVars: {
                  autoplay: 1,
                  loop: 1,
                }
              }}
              onReady={onReady}
            />}
  </div>);
}
