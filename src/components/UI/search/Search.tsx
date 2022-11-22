import { FC } from 'react';
import { Input, InputGroup, Stack } from '@chakra-ui/react'

import { LensIcon } from '../icons';

const BORDER_WIDTH = '2px';

export const Search: FC = () => {
  return (
    <Stack
      borderBottom={{ base: BORDER_WIDTH, md: 'none' }}
      borderRight={{ base: 'none', md: BORDER_WIDTH }}
      borderColor={{ base: 'bg', md: 'primary' }}
      p={{ base: 8, md: 4 }}
      _hover={{ bg: 'primary'}}
    >
      <InputGroup>
        <Input
          variant='unstyled'
          placeholder='search'
          size='md'
          _placeholder={{ color: {base: 'bg', md: 'primary'}, fontStyle: 'italic' }}
        />
        <Stack pl={4} justifyContent='center' alignItems='center'>
          <LensIcon color={{ base: 'bg', md: 'primary' }} fontSize={{ base: '2xl', md: 'md' }} />
        </Stack>
      </InputGroup>
    </Stack>
  );
};