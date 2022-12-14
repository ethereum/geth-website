import { ReleaseData } from './../types';
import { compareReleasesFn } from './compareReleasesFn';

export const getSortedReleases = (releases: ReleaseData[], moreReleases: ReleaseData[] = [], releaseChunkSize: number) => {
  // function that takes an array and breaks it up into chunks of the specified size.
  const chunkArray = (arr: ReleaseData[], releaseChunkSize: number) => {
    const chunked_arr = [];
    let index = 0;
    while (index < arr.length) {
      chunked_arr.push(arr.slice(index, releaseChunkSize + index));
      index += releaseChunkSize;
    }
    return chunked_arr;
  };

  const sortedReleasesByRelease = releases.concat(moreReleases).sort(compareReleasesFn);

  const chunkedReleases = chunkArray(sortedReleasesByRelease, releaseChunkSize);
  
  return chunkedReleases.map((chunk) => {
    return chunk.sort((a, b) => {
      return a.arch.localeCompare(b.arch);
    }).sort((a, b) => {
      return b.release.label.localeCompare(a.release.label);
    });
  }).flat();;
};
