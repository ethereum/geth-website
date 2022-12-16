import { Button, Flex, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';
import NextLink from 'next/link';

import { GopherHomeFront } from '../components/UI/svgs';
import { PageMetadata } from '../components/UI';

import { METADATA} from '../constants';

const Page404NotFound: NextPage = ({}) => {
  return (
    <>
      <PageMetadata title={METADATA.PAGE_404_TITLE} description={METADATA.PAGE_404_DESCRIPTION} />

      <main id='main-content'>
        <Flex direction='column' alignItems='center' py={{ base: 12, md: 20 }} border="2px" borderColor="primary">
          <GopherHomeFront />
          <Text fontSize={{ base: "8xl", md: "9xl" }} lineHeight='120%' fontFamily="heading" fontWeight="bold" textAlign="center">404</Text>
          <Text fontSize="2xl" fontFamily="heading" fontWeight="bold" textAlign="center" mb={{ base: 6, md: 12 }}>page not found</Text>
          <NextLink href='/' passHref legacyBehavior>
            <Button variant='primary' as='a' mb={1} data-group>
              <Text textStyle='homepage-primary-label'>Go to homepage</Text>
            </Button>
          </NextLink>
        </Flex>
      </main>
    </>
  );
};

export default Page404NotFound;
