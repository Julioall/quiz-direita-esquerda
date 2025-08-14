import Card from "./Card";

export default function PositionList({ title, items }) {
  return (
    <Card>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <ul className="list-disc ml-5 space-y-1 text-sm">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </Card>
  );
}
