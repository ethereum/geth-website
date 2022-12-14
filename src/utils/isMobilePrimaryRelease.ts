import { AMOUNT_OF_RELEASES_PER_MOBILE } from '../constants';
import { OS, ReleaseData } from '../types';

export const isMobilePrimaryRelease = (r: ReleaseData, os: OS, data: ReleaseData[]) =>
  os === 'mobile' &&
  data
    .filter((e: ReleaseData) => e.arch === 'all')
    .slice(0, AMOUNT_OF_RELEASES_PER_MOBILE) // get latest build
    .includes(r);
