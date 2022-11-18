import { useState, useEffect, useRef } from 'react';
import { Box, Flex, Input, InputGroup, Link, Stack, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

import { HamburgerIcon, LensIcon } from '../UI/icons';
import { DOCS_PAGE, DOWNLOADS_PAGE } from '../../constants';

const BORDER_WIDTH = '2px';

export const MobileMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null)
  
  const handleMenuToggle = () => {
    setIsMenuOpen(prev => !prev);
  }


  // Event listening for keydown or click
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    }
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setIsMenuOpen(false);
    }
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('mouseup', handleClick);
    document.addEventListener('touchend', handleClick);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('mouseup', handleClick);
      document.removeEventListener('touchend', handleClick);
      
    }
  }, [setIsMenuOpen])
  
  const mobileMenuItemStyles = {
    justifyContent: 'center',
    borderBottom: BORDER_WIDTH,
    borderColor: 'bg',
    color: 'primary',
    p: 8,
    _hover: {
      textDecoration: 'none',
      bg: 'primary',
      color: 'bg !important'
    }
  }

  return (
    <>
      {/* HAMBURGER MENU ICON */}
      <Box
        as='button'
        p={4}
        display={{ base: 'block', md: 'none' }}
        color='primary'
        _hover={{
          bg: isMenuOpen ? 'secondary' : 'primary',
          color: 'bg'
        }}
        onClick={handleMenuToggle}
        ml={isMenuOpen ? 'auto' : 'none'}
      >
        <HamburgerIcon />
      </Box>

      {/* MOBILE MENU */}
      <Flex
        position='absolute'
        top={`-${BORDER_WIDTH}`}
        insetInline={`-${BORDER_WIDTH}`}
        color='bg'
        bg='secondary'
        border={BORDER_WIDTH}
        borderColor='bg'
        ref={containerRef}
        zIndex={99}
        overflow='hidden'
        direction='column'
        transform={`translateY(${!isMenuOpen ? '-150%' : '0'})`}
        h='100vh'
        transition='all 0.25s ease-in-out'
      >
        <Flex borderBottom='2px' borderColor='bg' justify='flex-end'>
          {/* CLOSE ICON */}
          <Box
            as='button'
            p={4}
            borderLeft={BORDER_WIDTH}
            borderColor='bg'
            _hover={{ bg: 'primary' }}
            onClick={() => setIsMenuOpen(false)}
            ml='auto'
          >
            <CloseIcon boxSize={5} color='bg' />
          </Box>
        </Flex>

        <Flex position="relative" direction='column' w='full'/*  sx={{ '&>div': { p: 8 }}} */>
          {/* DOWNLOADS */}
          <Stack {...mobileMenuItemStyles}>
            <NextLink href={DOWNLOADS_PAGE} passHref>
              <Link _hover={{ textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>
                <Text textStyle='downloads-button-label' fontSize="2xl">
                  downloads
                </Text>
              </Link>
            </NextLink>
          </Stack>

          {/* DOCUMENTATION */}
          <Stack {...mobileMenuItemStyles}>
            <NextLink href={DOCS_PAGE} passHref>
              <Link _hover={{ textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>
                <Text textStyle='downloads-button-label' fontSize="2xl">
                  documentation
                </Text>
              </Link>
            </NextLink>
          </Stack>

          {/* SEARCH */}
          <Stack borderBottom={BORDER_WIDTH} borderColor='bg' p={8} _hover={{ bg: 'primary'}}>
            <InputGroup>
              <Input
                variant='unstyled'
                placeholder='search'
                size='md'
                _placeholder={{ color: 'bg', fontStyle: 'italic' }}
              />
              <Stack pl={4} justifyContent='center' alignItems='center'>
                <LensIcon color='bg' fontSize='2xl' />
              </Stack>
            </InputGroup>
          </Stack>
        </Flex>

      </Flex>
    </>
  );
};
