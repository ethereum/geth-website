import fs from 'fs';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import ReactMarkdown from 'react-markdown';
import { Grid, Flex, Heading, Stack } from '@chakra-ui/react';
import MDXComponents from '../components/';
import { ParsedUrlQuery } from 'querystring';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { Breadcrumbs } from '../components/docs'

import { PageMetadata } from '../components/UI';

import { DocsNav, DocumentNav } from '../components/UI/docs';

import { getFileList } from '../utils';
import { useEffect } from 'react';

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
  const paths: string[] = getFileList('docs'); // This is folder that get crawled for valid docs paths. Change if this path changes.
  const { slug } = context.params as ParsedUrlQuery;
  const filePath = (slug as string[])!.join('/');
  let file;

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
      paths
    }
  };
};

interface Props {
  frontmatter: {
    [key: string]: string;
  };
  content: string;
  paths: string[];
}

const DocPage: NextPage<Props> = ({ frontmatter, content, paths }) => {
  const router = useRouter()
  useEffect(() => {
    const id = router.asPath.split('#')[1]
    const element = document.getElementById(id)

    if (!element) {
      return
    }

    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [router.asPath])

  return (
    <>
      <PageMetadata
        title={frontmatter.title}
        description={frontmatter.description}
      />

      <main>
        <Flex direction={{base: 'column', lg: 'row'}} gap={{base: 4, lg: 8}}>
          <Stack>
            <DocsNav paths={paths} />
          </Stack>
          
          <Stack py={8} px={4} width='100%'>
            <Breadcrumbs router={router} />

            <Heading as='h1'>{frontmatter.title}</Heading>

            <Flex width='100%' placeContent='space-between'>
              <Stack maxW='768px'>
                <ReactMarkdown components={MDXComponents}>
                  {content}
                </ReactMarkdown>
              </Stack>
              
              <Stack display={{ base: 'none', xl: 'block'}} w={48}>
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
