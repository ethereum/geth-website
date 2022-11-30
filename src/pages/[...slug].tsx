import fs from 'fs';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';
import { Flex, Heading, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import gfm from 'remark-gfm';
import { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import MDXComponents from '../components/';
import { Breadcrumbs, DocsNav, DocumentNav } from '../components/UI/docs';
import { PageMetadata } from '../components/UI';

import { NavLink } from '../types';

import { getFileList } from '../utils/getFileList';

const MATTER_OPTIONS = {
  engines: {
    yaml: (s: any) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object
  }
};

// This method crawls for all valid docs paths
export const getStaticPaths: GetStaticPaths = () => {
  const paths: string[] = getFileList('docs'); // This is folder that get crawled for valid docs paths. Change if this path changes.

  return {
    paths,
    fallback: false
  };
};

// Reads file data for markdown pages
export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params as ParsedUrlQuery;
  const filePath = (slug as string[])!.join('/');
  let file;

  const navLinks = yaml.load(fs.readFileSync('src/data/documentation-links.yaml', 'utf8'));

  try {
    file = fs.readFileSync(`${filePath}.md`, 'utf-8');
  } catch {
    file = fs.readFileSync(`${filePath}/index.md`, 'utf-8');
  }

  const { data: frontmatter, content } = matter(file, MATTER_OPTIONS);

  return {
    props: {
      frontmatter,
      content,
      navLinks
    }
  };
};

interface Props {
  frontmatter: {
    [key: string]: string;
  };
  content: string;
  navLinks: NavLink[];
}

const DocPage: NextPage<Props> = ({ frontmatter, content, navLinks }) => {
  const router = useRouter();

  useEffect(() => {
    const id = router.asPath.split('#')[1];
    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [router.asPath]);

  return (
    <>
      <PageMetadata title={frontmatter.title} description={frontmatter.description} />

      <main>
        <Flex direction={{ base: 'column', lg: 'row' }} gap={{ base: 4, lg: 8 }}>
          <Stack>
            <DocsNav navLinks={navLinks} />
          </Stack>

          <Stack pb={4} width='100%'>
            <Stack mb={16}>
              <Breadcrumbs />
              <Heading as='h1' mt='4 !important' mb={0} textStyle='header1'>
                {frontmatter.title}
              </Heading>
              {/* <Text as='span' mt='0 !important'>last edited {TODO: get last edited date}</Text> */}
            </Stack>

            <Flex width='100%' placeContent='space-between'>
              <Stack maxW='768px'>
                <ReactMarkdown remarkPlugins={[gfm]} components={ChakraUIRenderer(MDXComponents)}>
                  {content}
                </ReactMarkdown>
              </Stack>

              <Stack display={{ base: 'none', xl: 'block' }} w={48}>
                <DocumentNav content={content} />
              </Stack>
            </Flex>
          </Stack>
        </Flex>
      </main>
    </>
  );
};

export default DocPage;
