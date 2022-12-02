import { FC } from 'react';
import { Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { NavLink } from '../../../types';

interface LinksListProps {
  links: NavLink[];
}

export const LinksList: FC<LinksListProps> = ({ links }) => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <Stack px={4}>
      {links.map(({ id, to, items }) => {
        const split = to?.split('/')
        const isActive = slug && split && split[split.length - 1] === slug[slug.length - 1];
        return to ? (
          <Stack key={id}>
            <NextLink href={to} passHref key={id}>
              <Link>
                <Text
                  textStyle='docs-nav-links'
                  color={items || isActive ? 'primary' : 'body'}
                  _before={isActive ? {
                    content: '"■"',
                    marginInlineEnd: 2,
                  } : {}}
                >
                  {id}
                </Text>
              </Link>
            </NextLink>
            {items && <LinksList links={items} />}
          </Stack>
        ) : (
          <Stack key={id}>
            <Text textStyle='docs-nav-links' color={items ? 'primary' : 'body'}>
              {id}
            </Text>
            {items && <LinksList links={items} />}
          </Stack>
        );
      })}
    </Stack>
  );
};
