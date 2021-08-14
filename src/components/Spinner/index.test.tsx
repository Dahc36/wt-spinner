import { render, screen, waitFor } from '@testing-library/react';

import { Spinner } from './';

const DIMENSIONS = 170;

test('can make progress', async () => {
  const { rerender } = render(<Spinner dimensions={DIMENSIONS} progress={0} />);
  expect(screen.getByText(/0/i)).toBeInTheDocument();
  expect(screen.getByTestId('svg-path')).toHaveAttribute(
    'd',
    'M 80 0 A 80 80 0 0 0 80 0'
  );

  rerender(<Spinner dimensions={DIMENSIONS} progress={25} />);
  expect(screen.getByText(/25/i)).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.getByTestId('svg-path')).toHaveAttribute(
      'd',
      'M 160 80 A 80 80 0 0 0 80 0'
    )
  );

  rerender(<Spinner dimensions={DIMENSIONS} progress={50} />);
  expect(screen.getByText(/50/i)).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.getByTestId('svg-path')).toHaveAttribute(
      'd',
      'M 80 160 A 80 80 0 0 0 80 0'
    )
  );
});
