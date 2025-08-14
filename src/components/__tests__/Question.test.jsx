import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Question from '../Question';

test('renders question and handles answer', () => {
  const q = { id: 1, text: 'Sample?', source: 'https://example.com', econ: 1, social: 0, weight: 1 };
  const scale = [
    { label: 'Agree', value: 1 },
    { label: 'Disagree', value: -1 }
  ];
  const setAnswers = vi.fn();
  const t = (k) => k;
  render(
    <Question
      q={q}
      index={0}
      total={1}
      scale={scale}
      answers={{}}
      setAnswers={setAnswers}
      t={t}
    />
  );
  expect(screen.getByText('Sample?')).toBeInTheDocument();
  fireEvent.click(screen.getByLabelText('Agree'));
  expect(setAnswers).toHaveBeenCalled();
});
