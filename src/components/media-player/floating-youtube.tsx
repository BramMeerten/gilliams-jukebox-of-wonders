'use client';

import { useEffect, useState } from 'react';
import YouTube, { YouTubeEvent, YouTubePlayer } from 'react-youtube';
import { MediaState, useMedia } from './media-context';

export const FloatingYoutube = () => {
  const { state } = useMedia();
  const [player, setPlayer] = useState<YouTubePlayer | undefined>();
  const [playerState, setPlayerState] = useState<MediaState>({ playing: false, volume: 100 });

  useEffect(() => {
    if (state.source !== playerState.source) {
      setPlayer(null);
      setPlayerState((playerState) => ({ ...playerState, source: state.source, playing: true }));
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
            setPlayerState((playerState) => ({
              ...playerState,
              playing: state.playing,
              volume: state.volume,
            }));
          }

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e: unknown) {
          // Player not ready
        }
      }
    }
  }, [state, playerState, player]);

  const onReady = (event: YouTubeEvent) => {
    setPlayer(event.target);
  };

  return (
    <div className="absolute bottom-0 right-0 lg:w-[325px] lg:h-[183px] md:w-[250px] md:h-[140px] w-[150px] h-[85px] lg:opacity-75 opacity-50 z-0">
      {playerState.source && (
        <YouTube
          className="w-full h-full"
          iframeClassName="w-full h-full"
          videoId={playerState.source.videoId}
          opts={{
            playerVars: {
              autoplay: 1,
              loop: 1,
            },
          }}
          onReady={onReady}
        />
      )}
    </div>
  );
};
