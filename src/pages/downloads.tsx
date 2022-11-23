import { Center, Code, Flex, Link, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react';
import type { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { XMLParser } from 'fast-xml-parser';

import {
  DownloadsHero,
  DownloadsSection,
  DownloadsTable,
  SpecificVersionsSection
} from '../components/UI/downloads';
import { DataTable, PageMetadata } from '../components/UI';

import {
  ALL_ANDROID_GETH_RELEASES_URL,
  ALL_GETH_COMMITS_URL,
  ALL_IOS_GETH_RELEASES_URL,
  ALL_LINUX_ALLTOOLS_GETH_RELEASES_URL,
  ALL_LINUX_GETH_RELEASES_URL,
  ALL_MACOS_ALLTOOLS_GETH_RELEASES_URL,
  ALL_MACOS_GETH_RELEASES_URL,
  ALL_WINDOWS_ALLTOOLS_GETH_RELEASES_URL,
  ALL_WINDOWS_GETH_RELEASES_URL,
  DEFAULT_BUILD_AMOUNT_TO_SHOW,
  DOWNLOADS_OPENPGP_BUILD_HEADERS,
  DOWNLOADS_OPENPGP_DEVELOPER_HEADERS,
  GETH_REPO_URL,
  METADATA,
  LATEST_GETH_RELEASE_URL,
  LATEST_SOURCES_BASE_URL,
  LINUX_BINARY_BASE_URL,
  MACOS_BINARY_BASE_URL,
  RELEASE_NOTES_BASE_URL,
  WINDOWS_BINARY_BASE_URL
} from '../constants';

// TODO: delete test data
import { testDownloadData } from '../data/test/download-testdata';
import { pgpBuildTestData } from '../data/test/pgpbuild-testdata';
import { pgpDeveloperTestData } from '../data/test/pgpdeveloper-testdata';

import { mapReleasesData } from '../utils';
import { LatestReleasesData, ReleaseData } from '../types';
import { compareReleasesFn } from '../utils/compareReleasesFn';

export const getServerSideProps: GetServerSideProps = async () => {
  // ==== LATEST RELEASES DATA ====

  // Latest release name & version number
  const { versionNumber, releaseName } = await fetch(LATEST_GETH_RELEASE_URL)
    .then(response => response.json())
    .then(release => {
      return {
        versionNumber: release.tag_name,
        releaseName: release.name
      };
    });
  // Latest release commit hash
  const commit = await fetch(`${ALL_GETH_COMMITS_URL}/${versionNumber}`)
    .then(response => response.json())
    .then(commit => commit.sha.slice(0, 8));

  // Latest binaries urls
  const LATEST_LINUX_BINARY_URL = `${LINUX_BINARY_BASE_URL}${versionNumber.slice(
    1
  )}-${commit}.tar.gz`;
  const LATEST_MACOS_BINARY_URL = `${MACOS_BINARY_BASE_URL}${versionNumber.slice(
    1
  )}-${commit}.tar.gz`;
  const LATEST_WINDOWS_BINARY_URL = `${WINDOWS_BINARY_BASE_URL}${versionNumber.slice(
    1
  )}-${commit}.exe`;

  // Sources urls
  const LATEST_SOURCES_URL = `${LATEST_SOURCES_BASE_URL}${versionNumber}.tar.gz`;
  const RELEASE_NOTES_URL = `${RELEASE_NOTES_BASE_URL}${versionNumber}`;

  const LATEST_RELEASES_DATA = {
    versionNumber,
    releaseName,
    urls: {
      LATEST_LINUX_BINARY_URL,
      LATEST_MACOS_BINARY_URL,
      LATEST_WINDOWS_BINARY_URL,
      LATEST_SOURCES_URL,
      RELEASE_NOTES_URL
    }
  };

  // ==== ALL RELEASES DATA ====

  // 1) fetch XML data
  // TODO: add try/catch
  const [
    ALL_LINUX_RELEASES_XML_DATA,
    ALL_LINUX_ALL_TOOLS_RELEASES_XML_DATA,
    ALL_MACOS_RELEASES_XML_DATA,
    ALL_MACOS_ALL_TOOLS_RELEASES_XML_DATA,
    ALL_WINDOWS_RELEASES_XML_DATA,
    ALL_WINDOWS_ALL_TOOLS_RELEASES_XML_DATA,
    ALL_ANDROID_RELEASES_XML_DATA,
    ALL_IOS_RELEASES_XML_DATA
  ] = await Promise.all([
    // linux
    fetch(ALL_LINUX_GETH_RELEASES_URL).then(response => response.text()),
    fetch(ALL_LINUX_ALLTOOLS_GETH_RELEASES_URL).then(response => response.text()),
    // macOS
    fetch(ALL_MACOS_GETH_RELEASES_URL).then(response => response.text()),
    fetch(ALL_MACOS_ALLTOOLS_GETH_RELEASES_URL).then(response => response.text()),
    // windows
    fetch(ALL_WINDOWS_GETH_RELEASES_URL).then(response => response.text()),
    fetch(ALL_WINDOWS_ALLTOOLS_GETH_RELEASES_URL).then(response => response.text()),
    // android
    fetch(ALL_ANDROID_GETH_RELEASES_URL).then(response => response.text()),
    // iOS
    fetch(ALL_IOS_GETH_RELEASES_URL).then(response => response.text())
  ]);

  // 2) XML data parsing
  const parser = new XMLParser();

  // linux
  const linuxJson = parser.parse(ALL_LINUX_RELEASES_XML_DATA);
  const ALL_LINUX_BLOBS_JSON_DATA = linuxJson.EnumerationResults.Blobs.Blob;

  const linuxAllToolsJson = parser.parse(ALL_LINUX_ALL_TOOLS_RELEASES_XML_DATA);
  const ALL_LINUX_ALL_TOOLS_BLOBS_JSON_DATA = linuxAllToolsJson.EnumerationResults.Blobs.Blob;

  // macOS
  const macOSJson = parser.parse(ALL_MACOS_RELEASES_XML_DATA);
  const ALL_MACOS_BLOBS_JSON_DATA = macOSJson.EnumerationResults.Blobs.Blob;

  const macOSAllToolsJson = parser.parse(ALL_MACOS_ALL_TOOLS_RELEASES_XML_DATA);
  const ALL_MACOS_ALL_TOOLS_BLOBS_JSON_DATA = linuxAllToolsJson.EnumerationResults.Blobs.Blob;

  // windows
  const windowsJson = parser.parse(ALL_WINDOWS_RELEASES_XML_DATA);
  const ALL_WINDOWS_BLOBS_JSON_DATA = macOSJson.EnumerationResults.Blobs.Blob;

  const windowsAllToolsJson = parser.parse(ALL_WINDOWS_ALL_TOOLS_RELEASES_XML_DATA);
  const ALL_WINDOWS_ALL_TOOLS_BLOBS_JSON_DATA = windowsAllToolsJson.EnumerationResults.Blobs.Blob;

  // android
  const androidJson = parser.parse(ALL_ANDROID_RELEASES_XML_DATA);
  const ALL_ANDROID_BLOBS_JSON_DATA = androidJson.EnumerationResults.Blobs.Blob;

  // iOS
  const iOSJson = parser.parse(ALL_IOS_RELEASES_XML_DATA);
  const ALL_IOS_BLOBS_JSON_DATA = androidJson.EnumerationResults.Blobs.Blob;

  // 3) get blobs
  // linux
  const LINUX_STABLE_RELEASES_DATA = mapReleasesData({
    blobsList: ALL_LINUX_BLOBS_JSON_DATA,
    isStableRelease: true
  });
  const LINUX_ALLTOOLS_STABLE_RELEASES_DATA = mapReleasesData({
    blobsList: ALL_LINUX_ALL_TOOLS_BLOBS_JSON_DATA,
    isStableRelease: true
  });
  const LINUX_DEV_BUILDS_DATA = mapReleasesData({
    blobsList: ALL_LINUX_BLOBS_JSON_DATA,
    isStableRelease: false
  });
  const LINUX_ALLTOOLS_DEV_BUILDS_DATA = mapReleasesData({
    blobsList: ALL_LINUX_ALL_TOOLS_BLOBS_JSON_DATA,
    isStableRelease: false
  });

  // macOS
  const MACOS_STABLE_RELEASES_DATA = mapReleasesData({
    blobsList: ALL_MACOS_BLOBS_JSON_DATA,
    isStableRelease: true
  });
  const MACOS_ALLTOOLS_STABLE_RELEASES_DATA = mapReleasesData({
    blobsList: ALL_MACOS_ALL_TOOLS_BLOBS_JSON_DATA,
    isStableRelease: true
  });
  const MACOS_DEV_BUILDS_DATA = mapReleasesData({
    blobsList: ALL_MACOS_BLOBS_JSON_DATA,
    isStableRelease: false
  });
  const MACOS_ALLTOOLS_DEV_BUILDS_DATA = mapReleasesData({
    blobsList: ALL_MACOS_ALL_TOOLS_BLOBS_JSON_DATA,
    isStableRelease: false
  });

  // windows
  const WINDOWS_STABLE_RELEASES_DATA = mapReleasesData({
    blobsList: ALL_WINDOWS_BLOBS_JSON_DATA,
    isStableRelease: true
  });
  const WINDOWS_ALLTOOLS_STABLE_RELEASES_DATA = mapReleasesData({
    blobsList: ALL_WINDOWS_ALL_TOOLS_BLOBS_JSON_DATA,
    isStableRelease: true
  });
  const WINDOWS_DEV_BUILDS_DATA = mapReleasesData({
    blobsList: ALL_WINDOWS_BLOBS_JSON_DATA,
    isStableRelease: false
  });
  const WINDOWS_ALLTOOLS_DEV_BUILDS_DATA = mapReleasesData({
    blobsList: ALL_WINDOWS_ALL_TOOLS_BLOBS_JSON_DATA,
    isStableRelease: false
  });

  // android
  const ANDROID_STABLE_RELEASES_DATA = mapReleasesData({
    blobsList: ALL_ANDROID_BLOBS_JSON_DATA,
    isStableRelease: true
  });
  const ANDROID_DEV_BUILDS_DATA = mapReleasesData({
    blobsList: ALL_ANDROID_BLOBS_JSON_DATA,
    isStableRelease: false
  });

  // iOS
  const IOS_STABLE_RELEASES_DATA = mapReleasesData({
    blobsList: ALL_IOS_BLOBS_JSON_DATA,
    isStableRelease: true
  });
  const IOS_DEV_BUILDS_DATA = mapReleasesData({
    blobsList: ALL_IOS_BLOBS_JSON_DATA,
    isStableRelease: false
  });

  return {
    props: {
      data: {
        // latest
        LATEST_RELEASES_DATA,
        // linux
        ALL_LINUX_STABLE_RELEASES: LINUX_STABLE_RELEASES_DATA.concat(
          LINUX_ALLTOOLS_STABLE_RELEASES_DATA
        ).sort(compareReleasesFn),
        ALL_LINUX_DEV_BUILDS: LINUX_DEV_BUILDS_DATA.concat(LINUX_ALLTOOLS_DEV_BUILDS_DATA).sort(
          compareReleasesFn
        ),
        // macOS
        ALL_MACOS_STABLE_RELEASES: MACOS_STABLE_RELEASES_DATA.concat(
          MACOS_ALLTOOLS_STABLE_RELEASES_DATA
        ).sort(compareReleasesFn),
        ALL_MACOS_DEV_BUILDS: MACOS_DEV_BUILDS_DATA.concat(MACOS_ALLTOOLS_DEV_BUILDS_DATA).sort(
          compareReleasesFn
        ),
        // windows
        ALL_WINDOWS_STABLE_RELEASES: WINDOWS_STABLE_RELEASES_DATA.concat(
          WINDOWS_ALLTOOLS_STABLE_RELEASES_DATA
        ).sort(compareReleasesFn),
        ALL_WINDOWS_DEV_BUILDS: WINDOWS_DEV_BUILDS_DATA.concat(
          WINDOWS_ALLTOOLS_DEV_BUILDS_DATA
        ).sort(compareReleasesFn),
        // android
        ALL_ANDROID_STABLE_RELEASES: ANDROID_STABLE_RELEASES_DATA,
        ALL_ANDROID_DEV_BUILDS: ANDROID_DEV_BUILDS_DATA,
        // iOS
        ALL_IOS_STABLE_RELEASES: IOS_STABLE_RELEASES_DATA,
        ALL_IOS_DEV_BUILDS: IOS_DEV_BUILDS_DATA
      }
    }
  };
};

interface Props {
  data: {
    // latest
    LATEST_RELEASES_DATA: LatestReleasesData;
    // linux
    ALL_LINUX_STABLE_RELEASES: ReleaseData[];
    ALL_LINUX_DEV_BUILDS: ReleaseData[];
    // macOS
    ALL_MACOS_STABLE_RELEASES: ReleaseData[];
    ALL_MACOS_DEV_BUILDS: ReleaseData[];
    // windows
    ALL_WINDOWS_STABLE_RELEASES: ReleaseData[];
    ALL_WINDOWS_DEV_BUILDS: ReleaseData[];
    // android
    ALL_ANDROID_STABLE_RELEASES: ReleaseData[];
    ALL_ANDROID_DEV_BUILDS: ReleaseData[];
    // iOS
    ALL_IOS_STABLE_RELEASES: ReleaseData[];
    ALL_IOS_DEV_BUILDS: ReleaseData[];
  };
}

const DownloadsPage: NextPage<Props> = ({ data }) => {
  const [amountStableReleases, updateAmountStables] = useState(DEFAULT_BUILD_AMOUNT_TO_SHOW);
  const [amountDevelopBuilds, updateAmountDevelopBuilds] = useState(DEFAULT_BUILD_AMOUNT_TO_SHOW);

  const showMoreStableReleases = () => {
    updateAmountStables(amountStableReleases + 10);
  };

  const showMoreDevelopBuilds = () => {
    updateAmountDevelopBuilds(amountDevelopBuilds + 10);
  };

  const {
    // latest
    LATEST_RELEASES_DATA,
    // linux
    ALL_LINUX_STABLE_RELEASES,
    ALL_LINUX_DEV_BUILDS,
    // macOS
    ALL_MACOS_STABLE_RELEASES,
    ALL_MACOS_DEV_BUILDS,
    // windows
    ALL_WINDOWS_STABLE_RELEASES,
    ALL_WINDOWS_DEV_BUILDS,
    // android
    ALL_ANDROID_STABLE_RELEASES,
    ALL_ANDROID_DEV_BUILDS,
    // iOS
    ALL_IOS_STABLE_RELEASES,
    ALL_IOS_DEV_BUILDS
  } = data;

  const ALL_STABLE_RELEASES = {
    ALL_LINUX_STABLE_RELEASES,
    ALL_MACOS_STABLE_RELEASES,
    ALL_WINDOWS_STABLE_RELEASES,
    ALL_IOS_STABLE_RELEASES,
    ALL_ANDROID_STABLE_RELEASES
  };

  return (
    <>
      <PageMetadata title={METADATA.DOWNLOADS_TITLE} description={METADATA.DOWNLOADS_DESCRIPTION} />

      <main>
        <Stack spacing={4}>
          <DownloadsHero
            currentBuild={LATEST_RELEASES_DATA.releaseName}
            currentBuildVersion={LATEST_RELEASES_DATA.versionNumber}
            linuxBuildURL={LATEST_RELEASES_DATA.urls.LATEST_LINUX_BINARY_URL}
            macOSBuildURL={LATEST_RELEASES_DATA.urls.LATEST_MACOS_BINARY_URL}
            windowsBuildURL={LATEST_RELEASES_DATA.urls.LATEST_WINDOWS_BINARY_URL}
            sourceCodeURL={LATEST_RELEASES_DATA.urls.LATEST_SOURCES_URL}
            releaseNotesURL={LATEST_RELEASES_DATA.urls.RELEASE_NOTES_URL}
          />

          <SpecificVersionsSection>
            <Stack p={4}>
              <Text textStyle='quick-link-text'>
                If you&apos;re looking for a specific release, operating system or architecture,
                below you will find:
              </Text>

              <UnorderedList px={4}>
                <ListItem>
                  <Text textStyle='quick-link-text'>
                    All stable and develop builds of Geth and tools
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle='quick-link-text'>
                    Archives for non-primary processor architectures
                  </Text>
                </ListItem>
                <ListItem>
                  <Text textStyle='quick-link-text'>
                    Android library archives and iOS XCode frameworks
                  </Text>
                </ListItem>
              </UnorderedList>

              <Text textStyle='quick-link-text'>
                Please select your desired platform from the lists below and download your bundle of
                choice. Please be aware that the MD5 checksums are provided by our binary hosting
                platform (Azure Blobstore) to help check for download errors. For security
                guarantees please verify any downloads via the attached PGP signature files (see{' '}
                <Link href={'#pgpsignatures'} variant='light'>
                  OpenPGP
                </Link>{' '}
                Signatures for details).
              </Text>
            </Stack>
          </SpecificVersionsSection>

          <DownloadsSection
            id='stablereleases'
            sectionDescription={
              <Text textStyle='quick-link-text'>
                These are the current and previous stable releases of go-ethereum, updated
                automatically when a new version is tagged in our{' '}
                <Link href={GETH_REPO_URL} isExternal variant='light'>
                  GitHub repository.
                </Link>
              </Text>
            }
            sectionTitle='Stable releases'
          >
            {/* TODO: swap test data for real data */}
            {/* MACOS_STABLE_RELEASES_DATA.concat(MACOS_ALLTOOLS_STABLE_RELEASES_DATA).sort(compareReleasesFn) */}
            <DownloadsTable data={ALL_STABLE_RELEASES} />

            <Flex
              sx={{ mt: '0 !important' }}
              flexDirection={{ base: 'column', md: 'row' }}
              justifyContent='space-between'
            >
              <Stack p={4} display={{ base: 'none', md: 'block' }}>
                <Center>
                  {/* TODO: swap testDownloadData with actual data */}
                  <Text>
                    Showing {amountStableReleases} latest releases of a total{' '}
                    {testDownloadData.length} releases
                  </Text>
                </Center>
              </Stack>
              <Stack
                sx={{ mt: '0 !important' }}
                borderLeft={{ base: 'none', md: '2px solid #11866f' }}
              >
                <Link as='button' variant='button-link-secondary' onClick={showMoreStableReleases}>
                  <Text
                    fontFamily='"JetBrains Mono", monospace'
                    fontWeight={700}
                    textTransform='uppercase'
                    textAlign='center'
                    p={4}
                  >
                    Show older releases
                  </Text>
                </Link>
              </Stack>
            </Flex>
          </DownloadsSection>

          <DownloadsSection
            id='developbuilds'
            sectionDescription={
              <Text textStyle='quick-link-text'>
                These are the develop snapshots of go-ethereum, updated automatically when a new
                commit is pushed into our{' '}
                <Link href={GETH_REPO_URL} isExternal variant='light'>
                  GitHub repository.
                </Link>
              </Text>
            }
            sectionTitle='Develop builds'
          >
            {/* TODO: swap for real data */}
            {/* <DownloadsTable data={testDownloadData.slice(0, amountDevelopBuilds)} /> */}

            <Flex
              sx={{ mt: '0 !important' }}
              flexDirection={{ base: 'column', md: 'row' }}
              justifyContent='space-between'
            >
              <Stack p={4} display={{ base: 'none', md: 'block' }}>
                <Center>
                  {/* TODO: swap testDownloadData with actual data */}
                  <Text>
                    Showing {amountDevelopBuilds} latest releases of a total{' '}
                    {testDownloadData.length} releases
                  </Text>
                </Center>
              </Stack>
              <Stack
                sx={{ mt: '0 !important' }}
                borderLeft={{ base: 'none', md: '2px solid #11866f' }}
              >
                <Link as='button' variant='button-link-secondary' onClick={showMoreDevelopBuilds}>
                  <Text
                    fontFamily='"JetBrains Mono", monospace'
                    fontWeight={700}
                    textTransform='uppercase'
                    textAlign='center'
                    p={4}
                  >
                    Show older releases
                  </Text>
                </Link>
              </Stack>
            </Flex>
          </DownloadsSection>

          <DownloadsSection
            id='pgpsignatures'
            sectionDescription={
              <Text textStyle='quick-link-text'>
                All the binaries available from this page are signed via our build server PGP keys:
              </Text>
            }
            sectionTitle='OpenPGP Signatures'
          >
            {/* TODO: swap for real data */}
            <Stack borderBottom='2px solid' borderColor='primary'>
              <DataTable columnHeaders={DOWNLOADS_OPENPGP_BUILD_HEADERS} data={pgpBuildTestData} />
            </Stack>

            {/* TODO: swap for real data */}
            <Stack>
              <DataTable
                columnHeaders={DOWNLOADS_OPENPGP_DEVELOPER_HEADERS}
                data={pgpDeveloperTestData}
              />
            </Stack>
          </DownloadsSection>

          <DownloadsSection id='importingkeys' sectionTitle='Importing keys and verifying builds'>
            <Flex
              p={4}
              borderBottom='2px'
              borderColor='primary'
              gap={4}
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <Stack flex={1}>
                <Text textStyle='quick-link-text'>
                  You can import the build server public keys by grabbing the individual keys
                  directly from the keyserver network:
                </Text>
              </Stack>

              <Stack flex={1} w={'100%'}>
                {/* TODO: These keys depends on the binary */}
                <Code p={4}>gpg --recv-keys F9585DE6 C2FF8BBF 9BA28146 7B9E2481 D2A67EAC</Code>
              </Stack>
            </Flex>

            <Flex
              p={4}
              borderBottom='2px'
              borderColor='primary'
              gap={4}
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <Stack flex={1}>
                <Text textStyle='quick-link-text'>
                  Similarly you can import all the developer public keys by grabbing them directly
                  from the keyserver network:
                </Text>
              </Stack>

              <Stack flex={1} w={'100%'}>
                {/* TODO: These are developer keys, do we need to change? */}
                <Code p={4}>gpg --recv-keys E058A81C 05A5DDF0 1CCB7DD2</Code>
              </Stack>
            </Flex>

            <Flex
              p={4}
              borderBottom='2px'
              borderColor='primary'
              gap={4}
              flexDirection={{ base: 'column', md: 'row' }}
            >
              <Stack flex={1}>
                <Text textStyle='quick-link-text'>
                  From the download listings above you should see a link both to the downloadable
                  archives as well as detached signature files. To verify the authenticity of any
                  downloaded data, grab both files and then run:
                </Text>
              </Stack>

              <Stack flex={1} w={'100%'}>
                {/* TODO: These keys depends on the binary */}
                <Code p={4}>gpg --verify geth-linux-amd64-1.5.0-d0c820ac.tar.gz.asc</Code>
              </Stack>
            </Flex>
          </DownloadsSection>
        </Stack>
      </main>
    </>
  );
};

export default DownloadsPage;
