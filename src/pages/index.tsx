import React, { FC } from 'react';
import {
  useTranslation,
  useAppLoaded,
  Trans,
  useRequest,
  useModuleParams,
} from '@wix/yoshi-flow-bm';
import { Page, Layout, Cell, Card, Text, Box, Avatar } from 'wix-style-react';
import { fetchComments } from '../api/comments.api';

const Index: FC = () => {
  const moduleParams = useModuleParams();
  const { loading, error, data } = useRequest(fetchComments(moduleParams.metaSiteId));
  useAppLoaded({ auto: true });

  const { t } = useTranslation();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <Page>
      <Page.Header dataHook="app-title" title="Comments" />
      <Page.Content>
        <Layout>
          <Cell>
            <Card>
              <Card.Content>
                {data.map((comment, index) => (
                  <Box
                    key={`${comment.author}-${comment.text}-${index}`}
                    direction="vertical"
                    gap={2}
                  >
                    {index !== 0 && <Card.Divider />}
                    <Box marginBottom="12px" width="100%" direction="vertical">
                      <Box verticalAlign="middle" gap={2}>
                        <Avatar name={comment.author} />
                        <Text dataHook="author" textAlign="center">
                          {comment.author}
                        </Text>
                      </Box>
                      <Box width="100%">
                        <Box
                          border="1px solid black"
                          borderRadius="2px"
                          marginTop="10px"
                          marginLeft="40px"
                          width="100%"
                          minHeight="100px"
                          padding="10px"
                        >
                          <Text dataHook="text">{comment.text}</Text>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Card.Content>
            </Card>
          </Cell>
        </Layout>
      </Page.Content>
    </Page>
  );
};

export default Index;
