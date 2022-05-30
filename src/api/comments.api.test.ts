import { aComment } from '@wix/ambassador-node-workshop-scala-app/builders';
import { bootstrap } from '@wix/yoshi-flow-bm/test/serverless';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';
import { fetchComments } from './comments.api';

const { serverlessApp, httpClient } = bootstrap();

describe('Comments fetch integration', () => {
  serverlessApp.beforeAndAfter();

  it('should fetch comments', async () => {
    const result = aComment().build();

    serverlessApp.ambassador
      .createStub(NodeWorkshopScalaApp)
      .CommentsService()
      .fetch.when(`98052e09-66e7-40eb-9926-15808ef039d0`)
      .resolve([result]);

    const response = await httpClient.request(
      fetchComments('98052e09-66e7-40eb-9926-15808ef039d0')
    );

    expect(response.data).toEqual([result]);
  });
});
