import {
  Box,
  Flex,
  Input,
  InputGroup,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  useDisclosure
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons';

import { HamburgerIcon, LensIcon } from '../UI/icons';
import { HeaderButtons } from '../UI'

const BORDER_WIDTH = '2px';

export const MobileMenu: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
      <Modal isOpen={isOpen} onClose={onClose} motionPreset='none'>

        <ModalOverlay />
        <ModalContent>
          {/* MOBILE MENU */}
          <Flex
            position='fixed'
            maxW='min(calc(var(--chakra-sizes-container-sm) - 2rem), 100vw - 2rem)'
            marginInline='auto'
            inset="0"
            top={`calc(2rem - ${BORDER_WIDTH} - ${BORDER_WIDTH})`}
            color='bg'
            bg='secondary'
            border={BORDER_WIDTH}
            overflow='hidden'
            direction='column'
          >
            <Flex borderBottom={BORDER_WIDTH} justify='flex-end'>
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

            <HeaderButtons close={onClose} />

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
