import {
  Box,
  Flex,
  Input,
  InputGroup,
  Link,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  Stack,
  useDisclosure
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

import { HamburgerIcon, LensIcon } from '../UI/icons';
import { DOCS_PAGE, DOWNLOADS_PAGE } from '../../constants';

const BORDER_WIDTH = '2px';

export const MobileMenu: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
        _hover={{ bg: 'primary', color: 'bg' }}
        onClick={onOpen}
      >
        <HamburgerIcon />
      </Box>

      {/* MODAL */}
      <Modal isOpen={isOpen} onClose={onClose} motionPreset='scale'>

        <ModalOverlay />
        <ModalContent>
          {/* MOBILE MENU */}
          <Flex
            position='fixed'
            maxW='min(calc(var(--chakra-sizes-container-sm) - 2rem), 100vw - 2rem)'
            marginInline='auto'
            inset='1.5rem 0 0'
            color='bg'
            bg='secondary'
            border={BORDER_WIDTH}
            overflow='hidden'
            direction='column'
            transition='opacity 0.2s ease-in-out'
          >
            <Flex borderBottom='2px' justify='flex-end'>
              {/* CLOSE ICON */}
              <Box
                as='button'
                p={4}
                borderInlineStartWidth={BORDER_WIDTH}
                borderColor='bg'
                color='bg'
                _hover={{ bg: 'primary' }}
                onClick={onClose}
                ms='auto'
              >
                <CloseIcon boxSize={5}  />
              </Box>
            </Flex>

            {/* DOWNLOADS */}
            <Stack {...mobileMenuItemStyles}>
              <NextLink href={DOWNLOADS_PAGE} passHref>
                <Link _hover={{ textDecoration: 'none' }} onClick={onClose}>
                  <Text textStyle='downloads-button-label' fontSize="2xl">
                    downloads
                  </Text>
                </Link>
              </NextLink>
            </Stack>

            {/* DOCUMENTATION */}
            <Stack {...mobileMenuItemStyles}>
              <NextLink href={DOCS_PAGE} passHref>
                <Link _hover={{ textDecoration: 'none' }} onClick={onClose}>
                  <Text textStyle='downloads-button-label' fontSize="2xl">
                    documentation
                  </Text>
                </Link>
              </NextLink>
            </Stack>

            {/* SEARCH */}
            <Stack borderBottom={BORDER_WIDTH} p={8} _hover={{ bg: 'primary'}}>
              <InputGroup>
                <Input
                  variant='unstyled'
                  placeholder='search'
                  size='md'
                  _placeholder={{ color: 'bg', fontStyle: 'italic' }}
                />
                <Stack pl={4} justifyContent='center' alignItems='center'>
                  <LensIcon fontSize='2xl' />
                </Stack>
              </InputGroup>
            </Stack>

          </Flex>
        </ModalContent>
      </Modal>

    </>
  );
};
