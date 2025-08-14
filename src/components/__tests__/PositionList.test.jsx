import { render, screen } from '@testing-library/react';
import PositionList from '../PositionList';

test('renders title and items', () => {
  const items = ['Item1', 'Item2'];
  render(<PositionList title="MyTitle" items={items} />);
  expect(screen.getByText('MyTitle')).toBeInTheDocument();
  items.forEach(item => {
    expect(screen.getByText(item)).toBeInTheDocument();
  });
});
