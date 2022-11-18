import { useEffect, useRef } from 'react';
import { Box, Flex, FlexProps, Input, InputGroup, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import { CloseIcon } from '@chakra-ui/icons';
import { LensIcon } from '../UI/icons';
import { DOCS_PAGE, DOWNLOADS_PAGE } from '../../constants';

interface Props extends FlexProps {
  setIsMenuOpen: (value: boolean) => void;
}
export const MobileMenu: React.FC<Props> = ({ setIsMenuOpen, ...props }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  
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
    borderBottom: '2px',
    borderColor: 'bg',
    color: 'primary',
    _hover: {
      textDecoration: 'none',
      bg: 'primary',
      color: 'bg !important'
    }
  }

  return (
    <Flex
      position='absolute'
      top="-2px"
      insetInline="-2px"
      color='bg'
      bg='secondary'
      border='2px'
      borderColor='bg'
      ref={containerRef}
      zIndex={99}
      transition='all 0.25s ease-in-out'
      overflow='hidden'
      direction='column'
      {...props}
    >
      {/* HAMBURGER MENU */}
      <Flex borderBottom='2px' borderColor='bg' justify='flex-end'>
        <Box
          as='button'
          p={4}
          color='primary'
          _hover={{ bg: 'secondary', color: 'bg' }}
          onClick={() => setIsMenuOpen(false)}
          ms='auto'
        >
          <CloseIcon boxSize={5} color='bg' _hover={{ color: 'primary' }} />
        </Box>
      </Flex>

      <Flex position="relative" direction='column' w='full' sx={{ '&>div': { p: 8 }}}>
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
        <Stack borderBottom='2px' borderColor='bg' _hover={{ bg: 'primary'}}>
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
  );
};
