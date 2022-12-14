import { ReleaseData } from './../types';

export const chunkReleases = (arr: ReleaseData[], releaseVersions: string[]) => {
  // loop through release versions and chunk arr based on release version
  const chunkedReleases = releaseVersions.map((releaseVersion) => {
    return arr.filter((release) => {
      return release.release.label.includes(releaseVersion)
    })
  }) 
  return chunkedReleases
};