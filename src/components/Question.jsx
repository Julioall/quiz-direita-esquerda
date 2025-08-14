import Card from "./Card";

export default function Question({ q, index, total, scale, answers, setAnswers }) {
  return (
    <Card className="mb-4">
      <div className="flex items-start gap-3">
        <div className="text-sm text-zinc-500">{index + 1}/{total}</div>
        <p className="text-base font-medium flex-1">{q.text}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mt-3">
        {scale.map((opt, i) => {
          const checked = answers[q.id] === opt.value;
          return (
            <label
              key={i}
              className={`border rounded-xl px-3 py-2 cursor-pointer text-sm text-center select-none ${
                checked ? "border-blue-600 ring-2 ring-blue-200" : "border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <input
                type="radio"
                name={`q-${q.id}`}
                value={opt.value}
                className="hidden"
                onChange={() => setAnswers(a => ({ ...a, [q.id]: opt.value }))}
              />
              {opt.label}
            </label>
          );
        })}
      </div>
      {q.source && (
        <p className="mt-2 text-xs text-zinc-500">
          <a href={q.source} target="_blank" rel="noopener noreferrer">{q.source}</a>
        </p>
      )}
    </Card>
  );
}
