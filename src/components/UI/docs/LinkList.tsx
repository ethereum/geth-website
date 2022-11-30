import { FC } from 'react';
import {
  Link,
  Stack,
  Text
} from '@chakra-ui/react';
import NextLink from 'next/link';

interface LinksListProps {
  links: any[];
}

export const LinksList: FC<LinksListProps> = ({ links }) => {
  return (
    <Stack px={4}>
      {links.map(link => {
        return link.to ? (
          <Stack key={link.id}>
              <NextLink href={link.to} passHref key={link.id}>
              <Link>
                  <Text textStyle='docs-nav-links' color={link.items ? 'primary' : 'body'}>
                    {link.id}
                  </Text>
              </Link>
              </NextLink>
              {link.items && <LinksList links={link.items} />}
          </Stack>
          ) : (
          <Stack key={link.id}>
              <Text textStyle='docs-nav-links' color={link.items ? 'primary' : 'body'}>
                {link.id}
              </Text>
              {link.items && <LinksList links={link.items} />}
          </Stack>
        );
      })}
    </Stack>
  );
};