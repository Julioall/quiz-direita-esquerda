import Card from "./Card";

export default function Question({ q, index, total, scale, answers, setAnswers, t }) {
  return (
    <Card className="mb-4">
      <div className="flex items-start gap-3">
        <div className="text-sm text-zinc-500">{index + 1}/{total}</div>
        <p className="text-base font-medium flex-1">{q.text}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mt-3">
        {scale.map(opt => {
          const id = `q${q.id}-${opt.value}`;
          return (
            <div key={opt.value}>
              <input
                type="radio"
                id={id}
                name={`q-${q.id}`}
                value={opt.value}
                aria-label={opt.label}
                className="sr-only peer"
                checked={answers[q.id] === opt.value}
                onChange={() => setAnswers(a => ({ ...a, [q.id]: opt.value }))}
              />
              <label
                htmlFor={id}
                className="border rounded-xl px-3 py-2 cursor-pointer text-sm text-center select-none block peer-checked:border-blue-600 peer-checked:ring-2 peer-checked:ring-blue-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                {opt.label}
              </label>
            </div>
          );
        })}
      </div>
      <details className="mt-2 text-xs">
        <summary>
          <button type="button" className="underline">{t('seeWhy')}</button>
        </summary>
        <div className="mt-1 space-y-1">
          <div>econ: {q.econ}, social: {q.social}, weight: {q.weight ?? 1}</div>
          {q.source && (
            <a href={q.source} target="_blank" rel="noopener" className="text-blue-600 underline">Fonte</a>
          )}
        </div>
      </details>
    </Card>
  );
}
