import { labelAxis } from "../scoring";

export default function ResultPanel({ result }) {
  const econLabel = labelAxis(result.econ, 'econ');
  const socialLabel = labelAxis(result.social, 'social');
  const topEcon = [...result.contrib]
    .filter(c => c.econC !== 0)
    .sort((a,b) => Math.abs(b.econC) - Math.abs(a.econC))
    .slice(0,5);
  const topSoc = [...result.contrib]
    .filter(c => c.socC !== 0)
    .sort((a,b) => Math.abs(b.socC) - Math.abs(a.socC))
    .slice(0,5);
  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm">Econômico: <strong>{econLabel}</strong> ({result.econ.toFixed(2)})</div>
        <div className="text-sm">Sociocultural: <strong>{socialLabel}</strong> ({result.social.toFixed(2)})</div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 text-xs">
        <div>
          <div className="font-semibold mb-1">Top Econ</div>
          <ul className="list-disc list-inside space-y-1">
            {topEcon.map(c => (
              <li key={c.id}>
                {c.text} (<a href={c.source} target="_blank" rel="noopener" className="underline">Fonte</a>)
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-1">Top Social</div>
          <ul className="list-disc list-inside space-y-1">
            {topSoc.map(c => (
              <li key={c.id}>
                {c.text} (<a href={c.source} target="_blank" rel="noopener" className="underline">Fonte</a>)
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
