export function downloadCSV(answers, questions, result){
  const lines = ['id,text,answer,econ,social,weight,econC,socC,source'];
  for (const q of questions){
    const ans = answers[q.id];
    const weight = q.weight ?? 1;
    const econC = ans !== undefined ? ans * q.econ * weight : '';
    const socC  = ans !== undefined ? ans * q.social * weight : '';
    const row = [
      q.id,
      '"' + q.text.replace(/"/g,'""') + '"',
      ans ?? '',
      q.econ,
      q.social,
      weight,
      econC,
      socC,
      q.source
    ].join(',');
    lines.push(row);
  }
  lines.push(`result,,${result.econ},${result.social}`);
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quiz.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
