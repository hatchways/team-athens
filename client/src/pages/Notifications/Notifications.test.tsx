import { render } from '@testing-library/react';
import Notifications from './Notifications';
import MockAuthProvider from '../../mocks/mockUseAuthProvider';

describe('Notifications tests', () => {
  test('smoke test', () => {
    render(
      <MockAuthProvider>
        <Notifications />
      </MockAuthProvider>,
    );
  });

  test('loading snapshot test', () => {
    const { asFragment } = render(
      <MockAuthProvider>
        <Notifications />
      </MockAuthProvider>,
    );
    expect(asFragment).toMatchSnapshot();
  });

  test('rendered messages snapshot test', () => {
    const { asFragment } = render(
      <MockAuthProvider>
        <Notifications />
      </MockAuthProvider>,
    );
    expect(asFragment).toMatchSnapshot();
  });

  test('should have loading when waiting for auth provide to check if loggedIn', () => {
    const { getByRole } = render(<Notifications />);
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  test('should have loading when waiting for auth provide to check if loggedIn', async () => {
    const { getAllByText, getByPlaceholderText } = render(
      <MockAuthProvider>
        <Notifications />
      </MockAuthProvider>,
    );
    expect(getAllByText('Chats')).toHaveLength(1);
    expect(getByPlaceholderText('Type something...')).toBeInTheDocument();
  });
});
