import { AMOUNT_OF_RELEASES_PER_WINDOWS } from '../constants';
import { OS, ReleaseData } from '../types';

export const isWindowsPrimaryRelease = (r: ReleaseData, os: OS, data: ReleaseData[]) =>
  os === 'windows' &&
  data
    .slice(0, AMOUNT_OF_RELEASES_PER_WINDOWS) // get latest build to filter on
    .filter((e: ReleaseData) => e.kind === 'Installer' && e.arch === '64-bit')
    .includes(r);
