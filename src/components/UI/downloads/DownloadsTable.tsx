import { Stack, Tabs, TabList, Tab, Text, TabPanel, TabPanels } from '@chakra-ui/react';
import { FC } from 'react';

import { DOWNLOADS_TABLE_TABS, DOWNLOADS_TABLE_TAB_COLUMN_HEADERS } from '../../../constants';

import { DataTable } from '../../UI';

interface Props {
  data: any;
}

export const DownloadsTable: FC<Props> = ({ data }) => {
  return (
    <Stack sx={{ mt: '0 !important' }} borderBottom='2px solid' borderColor='primary'>
      <Tabs variant='unstyled'>
        <TabList color='primary' bg='button-bg'>
          {DOWNLOADS_TABLE_TABS.map((tab, idx) => {
            return (
              <Tab
                key={tab}
                w={'20%'}
                p={4}
                _selected={{
                  bg: 'primary',
                  color: 'bg'
                }}
                borderBottom='2px solid'
                borderRight={idx === DOWNLOADS_TABLE_TABS.length - 1 ? 'none' : '2px solid'}
                borderColor='primary'
              >
                <Text textStyle='download-tab-label'>{tab}</Text>
              </Tab>
            );
          })}
        </TabList>

        <TabPanels>
          <TabPanel p={0}>
            <DataTable
              columnHeaders={DOWNLOADS_TABLE_TAB_COLUMN_HEADERS}
              data={data.ALL_LINUX_STABLE_RELEASES.slice(0, 21)}
            />
          </TabPanel>
          <TabPanel p={0}>
            <DataTable
              columnHeaders={DOWNLOADS_TABLE_TAB_COLUMN_HEADERS}
              data={data.ALL_MACOS_STABLE_RELEASES.slice(0, 21)}
            />
          </TabPanel>
          <TabPanel p={0}>
            <DataTable
              columnHeaders={DOWNLOADS_TABLE_TAB_COLUMN_HEADERS}
              data={data.ALL_WINDOWS_STABLE_RELEASES.slice(0, 21)}
            />
          </TabPanel>
          <TabPanel p={0}>
            <DataTable
              columnHeaders={DOWNLOADS_TABLE_TAB_COLUMN_HEADERS}
              data={data.ALL_IOS_STABLE_RELEASES.slice(0, 21)}
            />
          </TabPanel>
          <TabPanel p={0}>
            <DataTable
              columnHeaders={DOWNLOADS_TABLE_TAB_COLUMN_HEADERS}
              data={data.ALL_ANDROID_STABLE_RELEASES.slice(0, 21)}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};
