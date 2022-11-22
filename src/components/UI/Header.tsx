import { FC } from 'react';
import { Box, Flex, Input, InputGroup, Link, Stack, Text, useColorMode } from '@chakra-ui/react';
import NextLink from 'next/link';

import { LensIcon, MoonIcon, SunIcon } from '../UI/icons';
import { HeaderButtons } from './';
import { MobileMenu } from '../layouts';

export const Header: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Flex
      mb={4}
      border='2px'
      borderColor='primary'
      justifyContent='space-between'
      position='relative'
    >
      <Stack
        p={4}
        justifyContent='center'
        alignItems='flex-start'
        borderRight='2px'
        borderColor='primary'
        flexGrow={2}
      >
        <NextLink href={'/'} passHref>
          <Link _hover={{ textDecoration: 'none' }}>
            <Text textStyle='header-font'>go-ethereum</Text>
          </Link>
        </NextLink>
      </Stack>

      <Flex>
        <Stack display={{base: 'none', md: 'block'}}>
          <HeaderButtons />
        </Stack>

        {/* SEARCH */}
        <Stack
          p={4}
          display={{ base: 'none', md: 'block' }}
          borderRight='2px'
          borderColor='primary'
        >
          <InputGroup>
            <Input
              variant='unstyled'
              placeholder='search'
              size='md'
              _placeholder={{ color: 'primary', fontStyle: 'italic' }}
            />

            <Stack pl={4} justifyContent='center' alignItems='center'>
              <LensIcon color='primary' />
            </Stack>
          </InputGroup>
        </Stack>

        {/* DARK MODE SWITCH */}
        <Box
          as='button'
          p={4}
          borderRight={{ base: '2px', md: 'none' }}
          borderColor='primary'
          onClick={toggleColorMode}
          _hover={{
            bg: 'primary',
            svg: { color: 'bg' }
          }}
        >
          {isDark ? <SunIcon color='primary' /> : <MoonIcon color='primary' />}
        </Box>
      </Flex>

      {/* MOBILE MENU */}
      <MobileMenu />

    </Flex>
  );
};
