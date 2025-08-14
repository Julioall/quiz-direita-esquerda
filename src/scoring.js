export function score(answers, questions){
  const acc = { econ:0, social:0, count:0, contrib:[] };
  for (const q of questions){
    const a = answers[q.id];
    if (a === undefined) continue;
    const econC = (a * q.econ) * (q.weight ?? 1);
    const socC  = (a * q.social) * (q.weight ?? 1);
    acc.econ += econC; acc.social += socC; acc.count++;
    acc.contrib.push({ id:q.id, text:q.text, econC, socC, source:q.source });
  }
  const norm = v => Math.max(-2, Math.min(2, v / (acc.count || 1)));
  return { econ: norm(acc.econ), social: norm(acc.social), contrib: acc.contrib };
}

export function labelAxis(value, type){
  if (type === 'econ') {
    if (value < -0.4) return 'Estado';
    if (value > 0.4) return 'Mercado';
    return 'Centro-econ';
  }
  if (type === 'social') {
    if (value < -0.4) return 'Progressista';
    if (value > 0.4) return 'Conservador';
    return 'Centro-socio';
  }
  return '';
}
