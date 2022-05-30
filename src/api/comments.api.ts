import { method } from '@wix/yoshi-flow-bm/serverless';
import { NodeWorkshopScalaApp } from '@wix/ambassador-node-workshop-scala-app/rpc';

const commentsService = NodeWorkshopScalaApp().CommentsService();
export const fetchComments = method(async function (siteId: string) {
  return commentsService(this.context.aspects).fetch(siteId);
});
