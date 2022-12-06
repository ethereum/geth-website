import { FC } from 'react';
import { Divider, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import { parseHeadingId } from '../../../utils/parseHeadingId';
import { useActiveHash } from '../../../hooks/useActiveHash';

interface Props {
  content: string;
}

export const DocumentNav: FC<Props> = ({ content }) => {
  const parsedHeadings = content
    .split('\n\n')
    .map(item => item.replace(/[\n\r]/g, ''))
    .filter(item => item.startsWith('#'))
    .map(item => parseHeadingId([item]))
    .filter(item => item);

  const activeHash = useActiveHash(parsedHeadings.map(heading => heading!.headingId));

  return (
    <Stack position='sticky' top='4'>
      <Text as='h5' textStyle='document-nav-title'>
        on this page
      </Text>
      <Divider borderColor='primary' my={`4 !important`} />
      {parsedHeadings.map((heading, idx) => {
        return (
          <NextLink key={`${idx} ${heading?.title}`} href={`#${heading?.headingId}`}>
            <Link m={0} textDecoration='none !important'>
              <Text
                color={activeHash === heading?.headingId ? 'body' : 'primary'}
                textStyle='document-nav-link'
                _hover={{
                  background: 'primary',
                  boxShadow: '0 0 0 6px var(--chakra-colors-primary)',
                  color: 'bg',
                }}
                _focus={{
                  background: 'primary',
                  boxShadow: '0 0 0 6px var(--chakra-colors-primary) !important',
                  color: 'bg',
                  outline: '2px solid var(--chakra-colors-secondary) !important',
                  outlineOffset: '4px',
                }}
                _active={{
                  background: 'secondary',
                  boxShadow: '0 0 0 6px var(--chakra-colors-secondary)',
                  color: 'bg',
                }}
              >
                {heading?.title}
              </Text>
            </Link>
          </NextLink>
        );
      })}
    </Stack>
  );
};
