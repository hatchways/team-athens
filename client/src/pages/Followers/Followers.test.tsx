import { render } from '@testing-library/react';
import Followers from './Followers';
import MockAuthProvider from '../../mocks/mockUseAuthProvider';

describe('Followers tests', () => {
  test('smoke test', () => {
    render(
      <MockAuthProvider>
        <Followers />
      </MockAuthProvider>,
    );
  });

  test('loading snapshot test', () => {
    const { asFragment } = render(
      <MockAuthProvider>
        <Followers />
      </MockAuthProvider>,
    );
    expect(asFragment).toMatchSnapshot();
  });

  test('rendered messages snapshot test', () => {
    const { asFragment } = render(
      <MockAuthProvider>
        <Followers />
      </MockAuthProvider>,
    );
    expect(asFragment).toMatchSnapshot();
  });

  test('should have loading when waiting for auth provide to check if loggedIn', () => {
    const { getByRole } = render(<Followers />);
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  test('should have loading when waiting for auth provide to check if loggedIn', async () => {
    const { getAllByText, getByPlaceholderText } = render(
      <MockAuthProvider>
        <Followers />
      </MockAuthProvider>,
    );
    expect(getAllByText('Chats')).toHaveLength(1);
    expect(getByPlaceholderText('Type something...')).toBeInTheDocument();
  });
});
