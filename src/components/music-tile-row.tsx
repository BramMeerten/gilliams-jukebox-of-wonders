import { CSSProperties } from "react";
import { Music } from "./music";
import { MusicTile } from "./music-tile";

export const MusicTileRow = (props: {tiles: Music[], style: CSSProperties | undefined}) => {
  return (
    <div className="relative overflow-x-auto whitespace-nowrap px-4 py-2" style={props.style}>
        <div className="flex flex-nowrap gap-4 px-4 py-2">
            {props.tiles.map(tile => (
                <div className="flex-shrink-0">
                    <MusicTile key={tile.title} music={tile} />
                </div>
            ))}
        </div>
    </div>);
}
