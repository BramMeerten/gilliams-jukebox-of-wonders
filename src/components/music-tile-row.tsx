import { Music } from "./music";
import { MusicTile } from "./music-tile";

export const MusicTileRow = (props: {tiles: Music[], name: string}) => {
  return (
    <div className="flex" style={{width: '1000px'}}>
      <div className="uppercase text-xl font-semibold text-center" style={{writingMode: 'sideways-lr'}}>
        {props.name}
      </div>
      <div className="relative overflow-x-auto whitespace-nowrap py-2 ml-4">
        <div className="flex flex-nowrap py-2">
            {props.tiles.map(tile => (
                <div key={tile.videoId + '-' + props.name} className="flex-shrink-0 ml-4 first:ml-0">
                    <MusicTile key={tile.videoId + '-' + props.name} music={tile} />
                </div>
            ))}
        </div>
      </div>
    </div>);
}
