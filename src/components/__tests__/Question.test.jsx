import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Question from '../Question';

test('renders question and source link', () => {
  const q = { id: 1, text: 'Sample?', source: 'https://example.com', orientation: 1 };
  const scale = [
    { label: 'Agree', value: 1 },
    { label: 'Disagree', value: -1 }
  ];
  const setAnswers = vi.fn();
  render(
    <Question
      q={q}
      index={0}
      total={1}
      scale={scale}
      answers={{}}
      setAnswers={setAnswers}
    />
  );
  expect(screen.getByText('Sample?')).toBeInTheDocument();
  const link = screen.getByRole('link', { name: q.source });
  expect(link).toHaveAttribute('href', q.source);
  fireEvent.click(screen.getByText('Agree'));
  expect(setAnswers).toHaveBeenCalled();
});
