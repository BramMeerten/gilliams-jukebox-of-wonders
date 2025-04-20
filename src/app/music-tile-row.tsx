import { Music } from "@/model/music";
import { MusicTile } from "./music-tile";
import { AddMediaForm } from "@/components/add-media-form";
import { DragEvent } from "react";

interface Props {
  tiles: Music[];
  name: string;
  mediaAdded: (media: Music) => void;
  mediaRemoved: (media: Music) => void;
}

export const MusicTileRow = (props: Props) => {
  const addMediaClicked = (
    value: Music,
    callback: (error?: unknown) => void,
  ) => {
    try {
      props.mediaAdded(value);
      callback();
    } catch (e: unknown) {
      callback(e);
    }
  };

  const handleDragEnd = (e: DragEvent) => {
    console.log( "stop", e.dataTransfer.getData("category"), e.dataTransfer.getData("music"));
  };

  const handleDragOver = (e: DragEvent) => {
    // Preventing default behaviour indicates that the element is a "draggable" location
    // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#specifying_drop_targets
    e.preventDefault();

    const elements = getTileElements();
    const element = getNearestTileElement(e, elements);
    highlightTileElement(element, elements);
  };

  const handleDragLeave = () => {
    getTileElements().forEach(clearHighlightTile);
  };

  const getTileElements = (): HTMLElement[] => {
    return Array.from(
      document.querySelectorAll(`[data-column="${props.name}"]`),
    );
  }

  const getNearestTileElement = (e: DragEvent, allTileElements: HTMLElement[]): { elem: HTMLElement, side: Side } | undefined  => {
    const result = allTileElements.reduce(
      (closest, tile) => {
        const box = tile.getBoundingClientRect();
        // Inside
        if (e.clientX >= box.left && e.clientX <= box.right) {
          const side = e.clientX <= (box.left + box.right) / 2 ? Side.LEFT : Side.RIGHT;
          return { elem: tile, distance: 0, side };

        // Left
        } else if (e.clientX < box.left) {
          const distance = box.left - e.clientX;
          return distance < closest.distance ? { elem: tile, distance, side: Side.LEFT } : closest;

        // Right
        } else {
          const distance = e.clientX - box.right;
          return distance < closest.distance ? { elem: tile, distance, side: Side.RIGHT } : closest;
        }
      },
      {
        elem: null as HTMLElement | null,
        side: Side.LEFT,
        distance: Number.POSITIVE_INFINITY,
      },
    );

    return result.elem ? { elem: result.elem, side: result.side } : undefined;
  };

  const highlightTileElement = (tile: { side: Side, elem: HTMLElement } | undefined, allTiles: HTMLElement[]) => {
    allTiles
      .filter(t => t !== tile?.elem) // Don't clear tile, otherwise CSS transitions get reset
      .forEach(clearHighlightTile);

    if (tile?.side === Side.LEFT) {
      tile.elem.style.marginLeft = "1rem";
      tile.elem.style.marginRight = "";

    } else if (tile?.side === Side.RIGHT) {
      tile.elem.style.marginLeft = "";
      tile.elem.style.marginRight = "2rem";
    }
  }

  const clearHighlightTile = (elem: HTMLElement) => {
    elem.style.marginLeft = "";
    elem.style.marginRight = "";
  }

  return (
    <div
      className="flex"
      style={{ width: "1000px" }}
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div
        className="uppercase text-xl font-semibold text-center z-1"
        style={{ writingMode: "sideways-lr" }}
      >
        {props.name}
      </div>
      <div className="relative overflow-x-auto whitespace-nowrap py-2 ml-4">
        <div className="flex flex-nowrap py-2">
          {props.tiles.map((tile) => (
            <MusicTile
              key={tile.videoId + "-" + props.name}
              music={tile}
              category={props.name}
              removeClicked={() => props.mediaRemoved(tile)}
              className="flex-shrink-0 mr-4"
            />
          ))}

          <div className="flex-shrink-0">
            <AddMediaForm addMediaClicked={addMediaClicked} />
          </div>
        </div>
      </div>
    </div>
  );
};

const enum Side {
  LEFT, RIGHT
}
