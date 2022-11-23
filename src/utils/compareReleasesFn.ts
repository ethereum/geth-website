import { ReleaseData } from '../types';

export const compareReleasesFn = (a: ReleaseData, b: ReleaseData) => {
  if (a.published < b.published) {
    return -1;
  }
  if (a.published > b.published) {
    return 1;
  }

  return 0;
};
