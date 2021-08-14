import { render, screen, waitFor } from '@testing-library/react';

import { Spinner } from './';

const DIMENSIONS = 170;

describe('progress SVG', () => {
  test('renders for 0% progress', () => {
    render(<Spinner dimensions={DIMENSIONS} progress={0} />);
    expect(screen.getByText(/0/i)).toBeInTheDocument();
    expect(screen.getByTestId('svg-path')).toMatchInlineSnapshot(`
      <path
        d="M 80 0 A 80 80 0 0 0 80 0"
        data-testid="svg-path"
        stroke-width="10"
      />
    `);
  });

  test('renders for 42% progress', () => {
    render(<Spinner dimensions={DIMENSIONS} progress={42} />);
    expect(screen.getByText(/42/i)).toBeInTheDocument();
    expect(screen.getByTestId('svg-path')).toMatchInlineSnapshot(`
      <path
        d="M 118.54543275535829 150.1017090640603 A 80 80 0 0 0 80 0"
        data-testid="svg-path"
        stroke-width="10"
      />
    `);
  });

  test('renders for 100% progress', () => {
    render(<Spinner dimensions={DIMENSIONS} progress={100} />);
    expect(screen.getByText(/100/i)).toBeInTheDocument();
    expect(screen.getByTestId('svg-path')).toMatchInlineSnapshot(`
      <path
        d="M 79.98603736605492 0.0000012184696771555537 A 80 80 0 1 0 80 0"
        data-testid="svg-path"
        stroke-width="10"
      />
    `);
  });
});

test('can make progress', async () => {
  const { rerender } = render(<Spinner dimensions={DIMENSIONS} progress={0} />);

  rerender(<Spinner dimensions={DIMENSIONS} progress={42} />);
  await waitFor(() =>
    expect(screen.getByTestId('svg-path')).toHaveAttribute(
      'd',
      'M 118.54543275535829 150.1017090640603 A 80 80 0 0 0 80 0'
    )
  );

  rerender(<Spinner dimensions={DIMENSIONS} progress={100} />);
  await waitFor(() =>
    expect(screen.getByTestId('svg-path')).toHaveAttribute(
      'd',
      'M 79.98603736605492 0.0000012184696771555537 A 80 80 0 1 0 80 0'
    )
  );
});
