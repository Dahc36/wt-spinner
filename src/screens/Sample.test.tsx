import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Sample } from './Sample';

test('can cancel transfer', async () => {
  render(<Sample />);

  expect(screen.queryByText(/transferring/i)).not.toBeInTheDocument();

  userEvent.click(screen.getByText(/transfer/i));
  expect(screen.getByText(/transferring/i)).toBeInTheDocument();

  userEvent.click(screen.getByText(/cancel/i));
  userEvent.click(screen.getByText(/no/i));
  expect(screen.getByText(/transferring/i)).toBeInTheDocument();

  userEvent.click(screen.getByText(/cancel/i));
  userEvent.click(screen.getByText(/yes/i));

  expect(screen.queryByText(/transferring/i)).not.toBeInTheDocument();
});

test('transfers using specified parameters', async () => {
  render(<Sample />);

  const sizeInput = screen.getByLabelText(/file size/i);
  userEvent.type(sizeInput, '{backspace}{backspace}{backspace}1');
  expect(sizeInput).toHaveValue(1);

  const speedInput = screen.getByLabelText(/upload speed/i);
  userEvent.type(speedInput, '{backspace}{backspace}{backspace}1000');
  expect(speedInput).toHaveValue(1000);

  userEvent.click(screen.getByText(/transfer/i));
  expect(screen.queryByText(/transferring/i)).toBeInTheDocument();

  await waitFor(
    () => {
      expect(screen.queryByText(/transferring/i)).not.toBeInTheDocument();
    },
    {
      timeout: 2500,
    }
  );
});
