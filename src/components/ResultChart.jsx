export default function ResultChart({ econ, social }) {
  const size = 200;
  const x = ((econ + 2) / 4) * size;
  const y = ((-social + 2) / 4) * size;
  return (
    <svg width={size} height={size} role="img" aria-label="Mapa de posicionamento" className="border bg-white dark:bg-zinc-950">
      <line x1={size / 2} y1="0" x2={size / 2} y2={size} stroke="#ccc" />
      <line x1="0" y1={size / 2} x2={size} y2={size / 2} stroke="#ccc" />
      <text x="10" y="15" fontSize="10" fill="#999">Estado/Progressista</text>
      <text x={size / 2 + 10} y="15" fontSize="10" fill="#999">Mercado/Progressista</text>
      <text x="10" y={size - 5} fontSize="10" fill="#999">Estado/Conservador</text>
      <text x={size / 2 + 10} y={size - 5} fontSize="10" fill="#999">Mercado/Conservador</text>
      <circle cx={x} cy={y} r="5" fill="red" />
    </svg>
  );
}
