import { FC } from 'react'; 
import { Divider, Stack, Text } from '@chakra-ui/react'

export const DocumentNav: FC = () => {
  return (
    <Stack position='sticky' top='4'>
      <Text as='h5' textStyle='document-nav-title'>on this page</Text>
      <Divider borderColor='primary' mx={4} />
    </Stack>
  )
}