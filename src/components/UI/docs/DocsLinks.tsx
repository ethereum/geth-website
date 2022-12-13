import { FC } from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Center,
  Link,
  Stack,
  Text
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '../svgs/';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { LinksList } from './';

import { NavLink } from '../../../types';

interface Props {
  navLinks: NavLink[];
  toggleMobileAccordion: () => void;
}

export const DocsLinks: FC<Props> = ({ navLinks, toggleMobileAccordion }) => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <Stack border='2px' borderColor='primary'>
      {navLinks.map(({ id, to, items }, idx) => {
        const split = to?.split('/');
        const isActive = slug && split && split[split.length - 1] === slug[slug.length - 1];
        return (
          <Accordion key={id} allowToggle mt='0 !important'>
            <AccordionItem border='none'>
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    borderBottom={navLinks.length - 1 === idx ? 'none' : '2px'}
                    p={0}
                    borderColor='primary'
                    justifyContent='space-between'
                    placeContent='flex-end'
                    bg='button-bg'
                    data-group
                  >
                    <Stack
                      p={4}
                      borderRight={items ? '2px' : 'none'}
                      borderColor='primary'
                      w='100%'
                      bg='bg'
                      _groupHover={{ background: 'primary', color: 'bg', textDecoration: 'none' }}
                    >
                      {to ? (
                        <NextLink href={to} passHref legacyBehavior>
                          <Link textDecoration='none !important' onClick={toggleMobileAccordion}>
                            <Text
                              textStyle='docs-nav-dropdown'
                              color={isActive ? 'primary' : 'unset'}
                              _before={{
                                content: '"■"',
                                verticalAlign: '-1.25px',
                                marginInlineEnd: 2,
                                fontSize: 'lg',
                                display: isActive ? 'unset' : 'none'
                              }}
                              _groupHover={{ color: 'bg' }}
                            >
                              {id}
                            </Text>
                          </Link>
                        </NextLink>
                      ) : (
                        <Text textStyle='docs-nav-dropdown'>{id}</Text>
                      )}
                    </Stack>

                    {items && (
                      <Stack minW='61px'>
                        <Center>
                          {isExpanded ? (
                            <MinusIcon w='24px' h='24px' color='primary' />
                          ) : (
                            <AddIcon w='24px' h='24px' color='primary' />
                          )}
                        </Center>
                      </Stack>
                    )}
                  </AccordionButton>
                  {items && (
                    <AccordionPanel borderBottom='2px solid' borderColor='primary' px={0} py={4}>
                      <LinksList links={items} toggleMobileAccordion={toggleMobileAccordion} />
                    </AccordionPanel>
                  )}
                </>
              )}
            </AccordionItem>
          </Accordion>
        );
      })}
    </Stack>
  );
};
