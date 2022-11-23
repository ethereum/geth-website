export const getReleaseCommitHash = (filename: string) => {
  return filename.includes('alltools')
    ? filename.split('-').reverse()[0].split('.')[0]
    : filename.split('-').reverse()[1];
};
