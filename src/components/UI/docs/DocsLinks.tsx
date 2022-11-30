import { FC } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Center,
  Link,
  Stack,
  Text
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { LinksList } from './';

interface NavLink {
  id: string
  to?: string
  items?: NavLink[]
}

interface Props {
  navLinks: NavLink[];
}

export const DocsLinks: FC<Props> = ({ navLinks }) => {
  return (
    <Stack border='2px' borderColor='primary'>
      {navLinks.map((links, idx) => {
        return (
          <Accordion key={links.id} allowToggle mt='0 !important' defaultIndex={[0]}>
            <AccordionItem>
              <AccordionButton
                borderBottom={navLinks.length - 1 === idx ? 'none' : '2px'}
                p={0}
                borderColor='primary'
                display='flex'
                justifyContent='space-between'
              >
                <Stack p={4}>
                  {links.to ? (
                    <NextLink href={links.to} passHref>
                      <Link>
                        <Text textStyle='docs-nav-dropdown'>{links.id}</Text>
                      </Link>
                    </NextLink>
                  ) : (
                    <Text textStyle='docs-nav-dropdown'>{links.id}</Text>
                  )}
                </Stack>

                {links.items && (
                  <Center
                    minW='61px'
                    h='61px'
                    bg='button-bg'
                    borderLeft='2px'
                    borderColor='primary'
                  >
                    <AccordionIcon color='primary' />
                  </Center>
                )}
              </AccordionButton>
              {links.items && (
                <AccordionPanel borderBottom='2px solid' borderColor='primary' px={0} py={4}>
                  <LinksList links={links.items} />
                </AccordionPanel>
              )}
            </AccordionItem>
          </Accordion>
        );
      })}
    </Stack>
  );
};