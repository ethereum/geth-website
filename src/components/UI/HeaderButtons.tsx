import { FC, MouseEventHandler } from 'react';
import { Flex, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import { BORDER_WIDTH, DOCS_PAGE, DOWNLOADS_PAGE } from '../../constants';

interface Props {
  close?: MouseEventHandler<HTMLAnchorElement>
}

export const HeaderButtons: FC<Props> = ({
  close
}) => {
  const menuItemStyles = {
    p: { base: 8, md: 4 },
    justifyContent: 'center',
    borderBottom: { base: BORDER_WIDTH, md: 'none' },
    borderRight: { base: 'none', md: BORDER_WIDTH },
    borderColor: {base: 'bg', md: 'primary' }, 
    color: {base: 'bg', md: 'primary' }, 
    _hover: {
      textDecoration: 'none',
      bg: 'primary',
      color: 'bg !important'
    }
  }
  return (
    <Flex direction={{base: 'column', md: 'row'}}>
     {/* DOWNLOADS */}
     <Stack {...menuItemStyles}>
        <NextLink href={DOWNLOADS_PAGE} passHref>
          <Link _hover={{ textDecoration: 'none' }} onClick={close}>
            <Text textStyle={{ base: 'header-mobile-button', md: 'header-button' }}>
              downloads
            </Text>
          </Link>
        </NextLink>
      </Stack>

      {/* DOCUMENTATION */}
      <Stack {...menuItemStyles}>
        <NextLink href={DOCS_PAGE} passHref>
          <Link _hover={{ textDecoration: 'none' }} onClick={close}>
            <Text textStyle={{ base: 'header-mobile-button', md: 'header-button' }}>
              documentation
            </Text>
          </Link>
        </NextLink>
      </Stack>
    </Flex>
  );
};
