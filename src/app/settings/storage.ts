import { MusicLibrary } from '@/model/library';

export function loadLibrary(): MusicLibrary | null {
  if (typeof window === 'undefined') {
    throw new Error('Cannot load library. This function should be called from client side.');
  }

  try {
    const loadedMedia = localStorage.getItem('media-library');
    if (loadedMedia) {
      return savedDataToLibrary(JSON.parse(loadedMedia));
    }
  } catch (e: unknown) {
    console.log('Failed to load library from local storage', e);
  }

  return null;
}

export function saveLibrary(library: MusicLibrary) {
  if (typeof window === 'undefined') {
    throw new Error('Cannot save library. This function should be called from client side.');
  }

  try {
    const save: SavedMusicLibraryV1 = { version: 1, data: library };
    localStorage.setItem('media-library', JSON.stringify(save));
  } catch (e: unknown) {
    console.log('Failed to save library from local storage', e);
  }
}

function savedDataToLibrary(data: SavedMusicLibrary): MusicLibrary {
  if (data.version === 1) {
    return (data as SavedMusicLibraryV1).data;
  } else {
    throw new Error('Data in local storage is corrupted. ' + JSON.stringify(data));
  }
}

type SavedMusicLibrary = { version: number } & object;

interface SavedMusicLibraryV1 {
  version: 1;
  data: {
    category: string;
    music: {
      title: string;
      subtitle?: string;
      videoId: string;
      image: string;
      id: string;
    }[];
  }[];
}
