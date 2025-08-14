export async function loadQuestions() {
  const url = `${import.meta.env.BASE_URL}questions.json`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    const valid = [];
    for (const item of data) {
      if (typeof item.id !== 'number' || typeof item.text !== 'string' || typeof item.source !== 'string') {
        console.error('Invalid question', item);
        continue;
      }
      const econ = Number(item.econ);
      const social = Number(item.social);
      if (![ -1, 0, 1 ].includes(econ) || ![ -1, 0, 1 ].includes(social)) {
        console.error('Invalid axis values', item);
        continue;
      }
      const weight = item.weight ?? 1;
      if (typeof weight !== 'number') {
        console.error('Invalid weight', item);
        continue;
      }
      valid.push({ id:item.id, text:item.text, source:item.source, econ, social, weight });
    }
    return valid;
  } catch (err) {
    console.error('Failed to load questions', err);
    return [];
  }
}
