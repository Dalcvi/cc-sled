import React from 'react';
import { fetchComments } from '../api/comments.api';
import { render } from '@testing-library/react';
import { testkit } from '@wix/yoshi-flow-bm/testkit';
import { whenRequest } from '@wix/yoshi-flow-bm/testkit/http-client';
import MyComponent from '.';

describe('MyComponent', () => {
  testkit.beforeAndAfter();

  it('renders initial comments', async () => {
    const { TestComponent } = testkit.getBMComponent(MyComponent, {
      mocks: [
        whenRequest(fetchComments)
          .withData('')
          .reply(200, () => {
            return [
              { text: 'hello world', author: 'me' },
              { text: 'hello world2', author: 'me2' },
            ];
          }),
      ],
    });

    const { findAllByTestId } = render(<TestComponent />);

    const comments = await findAllByTestId('text');
    expect(comments).toHaveLength(2);
  });
});
