import { Link, Table, Thead, Tr, Th, TableContainer, Text, Tbody, Td } from '@chakra-ui/react';
import { FC } from 'react';
import { ReleaseData } from '../../types';

interface Props {
  columnHeaders: string[];
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
          {data.map((release: ReleaseData, idx: number) => {
            return (
              <Tr
                key={idx}
                // TODO: Get new background color from nuno for hover
                transition={'all 0.5s'}
                _hover={{ background: 'button-bg', transition: 'all 0.5s' }}
              >
                {Object.entries(release).map(item => {
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
