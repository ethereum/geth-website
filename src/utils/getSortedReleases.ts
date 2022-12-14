import { ReleaseData } from './../types';
import { compareReleasesFn } from './compareReleasesFn';
import { chunkReleases } from './chunkReleases';

export const getSortedReleases = (releases: ReleaseData[], moreReleases: ReleaseData[] = []) => {
  const sortedReleasesByRelease = releases.concat(moreReleases).sort(compareReleasesFn);

  const releaseVersions = sortedReleasesByRelease
    .map(release => {
      const splitLabel = release.release.label.split(' ');
      const releaseVersion = splitLabel[splitLabel.length - 1];

      return releaseVersion;
    })
    .filter((version, i, self) => self.indexOf(version) == i);

  const chunkedReleases = chunkReleases(sortedReleasesByRelease, releaseVersions);

  return chunkedReleases
    .map(chunk => {
      return chunk
        .sort((a, b) => {
          return a.arch.localeCompare(b.arch);
        })
        .sort((a, b) => {
          return b.release.label.localeCompare(a.release.label);
        });
    })
    .flat();
};
