import { ReleaseData } from '../types';

export const compareReleasesFn = (a: ReleaseData, b: ReleaseData) => {
  const aPublished = new Date(a.published)
  const bPublished = new Date(b.published)
  // If aPublished and bPublished are on the same day, sort by version
  // else sort by date
  return aPublished.toDateString() === bPublished.toDateString() ?
    a.release.label.length - b.release.label.length :
    aPublished > bPublished ? -1 : 1
};
