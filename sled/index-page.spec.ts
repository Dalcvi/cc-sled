/// <reference types="@wix/sled-test-runner" />
// ⚠️ Remember:
// 1. Ensure your application is ready (fully loaded, interactive and finished animations) before you're starting to perform actions / take screenshots
// 2. Each spec file running 3 times in parallel!
import { Page } from 'puppeteer';
import { injectBMOverrides } from '@wix/yoshi-flow-bm/sled';
import { TextTestkit } from 'wix-style-react/dist/testkit/puppeteer';

describe('happy flow', () => {
  let _page: Page;

  const SLED_DEFAULT_MSID = '98052e09-66e7-40eb-9926-15808ef039d0';

  beforeEach(async () => {
    const { page } = await sled.newPage({
      authType: 'free-user',
    });

    _page = page;

    await injectBMOverrides({
      page,
      appConfig: require('../target/module-sled.merged.json'),
    });

    const url = `https://www.wix.com/dashboard/${SLED_DEFAULT_MSID}/rpc-workshop`;

    await _page.goto(url, {
      waitUntil: 'networkidle2',
    });
  });

  afterEach(async () => {
    if (_page) {
      _page.close();
    }
  });

  it('should render comments', async () => {
    const textTestkit = await TextTestkit({
      page: _page,
      dataHook: 'text',
    });

    expect(await textTestkit.exists()).toBe(true);
  });
});
