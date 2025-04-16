import { Music } from "@/model/music";
import { MusicTile } from "./music-tile";
import { AddMediaForm } from "@/components/add-media-form";

export const MusicTileRow = (props: {tiles: Music[], name: string}) => {
  return (
    <div className="flex" style={{width: '1000px'}}>
      <div className="uppercase text-xl font-semibold text-center z-1" style={{writingMode: 'sideways-lr'}}>
        {props.name}
      </div>
      <div className="relative overflow-x-auto whitespace-nowrap py-2 ml-4">
        <div className="flex flex-nowrap py-2">

            {props.tiles.map(tile => (
                <div key={tile.videoId + '-' + props.name} className="flex-shrink-0 ml-4 first:ml-0">
                    <MusicTile key={tile.videoId + '-' + props.name} music={tile} />
                </div>
            ))}

            <div className="flex-shrink-0 ml-4 first:ml-0">
              <AddMediaForm />
            </div>

        </div>
      </div>
    </div>);
}
