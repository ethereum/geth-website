import { Link, Table, Thead, Tr, Th, TableContainer, Text, Tbody, Td } from '@chakra-ui/react';
import { FC } from 'react';
import { ReleaseData } from '../../types';
import { getParsedDate } from '../../utils';

interface Props {
  columnHeaders: string[];
  // TODO: update data type
  data: any;
}

export const DataTable: FC<Props> = ({ columnHeaders, data }) => {
  return (
    <TableContainer
      // Note: This wont work on firefox, we are ok with this.
      css={{
        '&::-webkit-scrollbar': {
          borderTop: '2px solid var(--chakra-colors-primary)',
          height: 18
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'var(--chakra-colors-primary)'
        }
      }}
      pt={4}
      pb={4}
    >
      <Table variant='unstyled'>
        <Thead>
          <Tr>
            {columnHeaders.map((columnHeader, idx) => {
              return (
                <Th key={idx} textTransform='none' minW={'130.5px'} px={4}>
                  <Text
                    fontFamily='"JetBrains Mono", monospace'
                    fontWeight={700}
                    fontSize='md'
                    color='#868b87' //? Use theme color? Or add to theme?
                  >
                    {columnHeader}
                  </Text>
                </Th>
              );
            })}
          </Tr>
        </Thead>

        <Tbody>
          {data.map((r: ReleaseData, idx: number) => {
            // TODO: move to utils
            // linux, macOS
            const _64bitReleases: ReleaseData[] = data.filter(
              (r: ReleaseData) => r.arch === '64-bit' && !r.release.url.includes('windows')
            );
            // windows
            const windowsReleases: ReleaseData[] = _64bitReleases.filter(
              (r: ReleaseData) => r.kind === 'Installer'
            );
            // android
            const androidReleases: ReleaseData[] = data.filter(
              (r: ReleaseData) => r.arch === 'all' && r.release.url.includes('android')
            );
            // iOS
            const iOSReleases: ReleaseData[] = data.filter(
              (r: ReleaseData) => r.arch === 'all' && r.release.url.includes('ios')
            );

            const latest64bitRelease = _64bitReleases.slice(0, 2).includes(r, 0);
            const latestWindowsRelease = windowsReleases.slice(0, 1).includes(r, 0);
            const latestAndroidRelease = androidReleases.slice(0, 1).includes(r, 0);
            const latestiOSRelease = iOSReleases.slice(0, 1).includes(r, 0);

            const isPrimaryRelease =
              latest64bitRelease ||
              latestWindowsRelease ||
              latestAndroidRelease ||
              latestiOSRelease;

            return (
              <Tr
                key={idx}
                // TODO: Get new background color from nuno for hover
                transition={'all 0.5s'}
                _hover={{ background: 'button-bg', transition: 'all 0.5s' }}
                fontWeight={latest64bitRelease ? 700 : 400}
              >
                {Object.entries(r).map((item, idx) => {
                  // TODO: Make the font size smaller (refer to design system)
                  const objectItems = ['release', 'commit', 'signature'];

                  if (objectItems.includes(item[0])) {
                    const label = item[1].label;
                    const url = item[1].url;

                    return (
                      <Td key={idx} px={4} fontSize='13px'>
                        <Link _hover={{ textDecoration: 'none' }} href={url} isExternal>
                          <Text color='primary'>
                            {item[0] === 'commit' ? `${label}...` : label}
                          </Text>
                        </Link>
                      </Td>
                    );
                  }

                  if (item[0] === 'published') {
                    return (
                      <Td key={idx} px={4} fontSize='13px'>
                        <Text>{getParsedDate(item[1])}</Text>
                      </Td>
                    );
                  }

                  return (
                    <Td key={idx} px={4} fontSize='13px'>
                      <Text>{item[1]}</Text>
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
