import { FC } from 'react';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

interface Props {
  paths: string[];
}

const makeTree = (paths: string[]) => {
  // TODO: typing
  const base: { children: any[] } = { children: [] };

  for (const path of paths) {
    const slugs = path.match(/\/[^\/]+/g);
    let curr = base;

    for (let idx in slugs) {
      const currPath = slugs.slice(0, Number(idx) + 1).join('');
      const child = curr.children.find(node => node.path === currPath);

      if (child) {
        curr = child;
      } else {
        curr.children.push({
          path: currPath,
          children: [],
          title: slugs[Number(idx)].substring(1)
        });
        curr = curr.children[curr.children.length - 1];
      }
    }
  }

  return base.children;
};

export const DocsLinks: FC<Props> = ({ paths }) => {
  const tree = makeTree(paths)
  const test = tree[0].children

  return (
    <Stack
      border='2px'
      borderColor='primary'
    >
      {test.map((child) => {
        return (
          <Accordion key={child.title} allowToggle defaultIndex={[0]}>
            <AccordionItem>
              <AccordionButton>
                {
                  paths[paths.indexOf(child.path)] ? (
                    <NextLink href={child.path} passHref>
                      <Link>
                        <Text textStyle='docs-nav-dropdown'>
                          {child.title}
                        </Text>
                      </Link>
                    </NextLink>
                  ) : (
                    <Text textStyle='docs-nav-dropdown'>
                        {child.title}
                      </Text>
                  )
                }
                <Stack>
                  <AccordionIcon />
                </Stack>
              </AccordionButton>
            <AccordionPanel borderBottom='2px solid'
            borderColor='primary'>
              <Text>test</Text>
            </AccordionPanel>
          </AccordionItem>
          </Accordion>
        )
      })}
    </Stack>
  );
};