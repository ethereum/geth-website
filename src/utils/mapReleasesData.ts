import {
  getChecksum,
  getParsedDate,
  getReleaseArch,
  getReleaseCommitHash,
  getReleaseCommitURL,
  getReleaseKind,
  getReleaseName,
  getReleaseSize,
  getReleaseURL,
  getSignature,
  getSignatureURL
} from '.';

import { ReleaseData, ReleaseParams } from '../types';

export const mapReleasesData = ({ blobsList, isStableRelease }: ReleaseParams): ReleaseData[] => {
  return blobsList
    .filter(({ Name }: any) => !Name.endsWith('.asc') && !Name.endsWith('.sig')) // skip blobs we don't need to list
    .filter(({ Name }: any) =>
      isStableRelease ? !Name.includes('unstable') : Name.includes('unstable')
    ) // filter by stable/dev builds
    .map(({ Name, Properties }: any) => {
      const commitHash = getReleaseCommitHash(Name);
      const sig = getSignature(Name);

      return {
        release: {
          label: getReleaseName(Name),
          url: getReleaseURL(Name)
        },
        commit: {
          label: commitHash,
          url: getReleaseCommitURL(commitHash)
        },
        kind: getReleaseKind(Name),
        arch: getReleaseArch(Name),
        size: getReleaseSize(Properties['Content-Length']),
        published: getParsedDate(Properties['Last-Modified']),
        signature: {
          label: sig,
          url: getSignatureURL(sig)
        },
        checksum: getChecksum(Properties['Content-MD5'])
      };
    });
};
