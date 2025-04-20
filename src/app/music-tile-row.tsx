import { AddMediaForm } from "@/components/add-media-form";
import { Music } from "@/model/music";
import { DragEvent, useRef } from "react";
import { DRAG_KEY_CATEGORY, DRAG_KEY_MUSIC, MusicTile } from "./music-tile";
import { motion } from "motion/react";

interface Props {
  tiles: Music[];
  name: string;
  mediaAdded: (media: Music) => void;
  mediaRemoved: (media: Music) => void;
  mediaMoved: (arg: {
    from: {media: Music, category: string}, 
    to: { index: number, category: string}
  }) => void;
  removed: () => void;
}

export const MusicTileRow = (props: Props) => {
  const rowRef = useRef<HTMLDivElement | null>(null);
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
    try {
      const category = e.dataTransfer.getData(DRAG_KEY_CATEGORY);
      const media = JSON.parse(e.dataTransfer.getData(DRAG_KEY_MUSIC));

      const tileElems = getTileElements();
      tileElems.forEach(clearHighlightTile);

      const nearest = getNearestTileElement(e, tileElems);
      if (!nearest) {
        return;
      }

      for (let i=0; i<tileElems.length; i++) {
        if (tileElems[i] === nearest.elem) {
          props.mediaMoved({
            from: {
              media,
              category,
            },
            to: {
              index: nearest.side === Side.LEFT ? i : i + 1,
              category: props.name
            }
          });
          break;
        }
      }

    } catch (e: unknown) {
      console.log('No valid data found in drag event', e);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    // Preventing default behaviour indicates that the element is a "draggable" location
    // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#specifying_drop_targets
    e.preventDefault();

    const elements = getTileElements();
    const element = getNearestTileElement(e, elements);
    highlightTileElement(element, elements);
  };

  const handleDragLeave = (e: DragEvent) => {
    // Still in row, leave event should not have triggered
    if (e.relatedTarget && rowRef.current && rowRef.current.contains(e.relatedTarget as Node)) {
      return;
    }
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
    allTiles.forEach(clearHighlightTile);

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
    <motion.div
      ref={rowRef}
      className="flex"
      style={{ width: "1000px" }}
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      layout
      layoutId={props.name}
    >
      <div
        className="h-40 uppercase text-xl font-semibold text-center z-1 group flex justify-center items-center"
        style={{ writingMode: "sideways-lr" }}
      >
        <span 
          className="overflow-hidden text-nowrap max-h-8/10">
          {props.name}
        </span>
        <button className="inline z-20 w-6 h-6 mb-2 ml-1 rounded-full bg-black/50 hover:bg-black/70 hover:text-gray-400 
                           flex items-center justify-center text-white text-sm
                           cursor-pointer duration-300 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-1"
          onClick={(e) => {
            e.stopPropagation();
            props.removed();
          }}>
          ✕
        </button>
      </div>
      <div className="relative overflow-x-auto whitespace-nowrap py-2 ml-4">
        <div className="flex flex-nowrap py-2">
          {props.tiles.map((tile) => (
            <MusicTile
              key={tile.id}
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
    </motion.div>
  );
};

const enum Side {
  LEFT, RIGHT
}
