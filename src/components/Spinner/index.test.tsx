import { render, screen, waitFor } from '@testing-library/react';

import { Spinner, STROKE_WIDTH } from './';

const DIMENSIONS = 200;
const DIAMETER = DIMENSIONS - STROKE_WIDTH;
const RADIUS = DIAMETER / 2;

test('can make progress', async () => {
  const { rerender } = render(<Spinner dimensions={DIMENSIONS} progress={0} />);
  expect(screen.getByText(/0/i)).toBeInTheDocument();
  expect(screen.getByTestId('svg-path')).toHaveAttribute(
    'd',
    `M ${RADIUS} 0 A ${RADIUS} ${RADIUS} 0 0 0 ${RADIUS} 0`
  );

  rerender(<Spinner dimensions={DIMENSIONS} progress={25} />);
  expect(screen.getByText(/25/i)).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.getByTestId('svg-path')).toHaveAttribute(
      'd',
      `M ${DIAMETER} ${RADIUS} A ${RADIUS} ${RADIUS} 0 0 0 ${RADIUS} 0`
    )
  );

  rerender(<Spinner dimensions={DIMENSIONS} progress={50} />);
  expect(screen.getByText(/50/i)).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.getByTestId('svg-path')).toHaveAttribute(
      'd',
      `M ${RADIUS} ${DIAMETER} A ${RADIUS} ${RADIUS} 0 0 0 ${RADIUS} 0`
    )
  );
});
