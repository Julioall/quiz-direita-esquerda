import { render, screen } from '@testing-library/react';
import Card from '../Card';

test('renders children inside card', () => {
  render(<Card><span>Child</span></Card>);
  expect(screen.getByText('Child')).toBeInTheDocument();
});
