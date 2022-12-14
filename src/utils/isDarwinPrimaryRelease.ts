import { AMOUNT_OF_RELEASES_PER_DARWIN } from '../constants';
import { OS, ReleaseData } from '../types';

export const isDarwinPrimaryRelease = (r: ReleaseData, os: OS, data: ReleaseData[]) =>
  os === 'darwin' &&
  data
    .slice(0, AMOUNT_OF_RELEASES_PER_DARWIN) // get latest build to filter on
    .filter((e: ReleaseData) => e.arch === '64-bit')
    .includes(r);
