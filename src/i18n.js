export const messages = {
  pt: {
    title: 'Quiz: Direita x Esquerda',
    description: 'Este site lista posicionamentos típicos e, ao final do quiz, estima sua aproximação.',
    start: 'Começar',
    back: 'Voltar',
    cancel: 'Cancelar',
    finish: 'Finalizar',
    result: 'Resultado',
    tryAgain: 'Tentar novamente',
    download: 'Baixar CSV',
    seeWhy: 'Ver por quê',
    scale: {
      '-2': 'Discordo totalmente',
      '-1': 'Discordo',
      '0': 'Neutro',
      '1': 'Concordo',
      '2': 'Concordo totalmente'
    }
  },
  en: {
    title: 'Left vs Right Quiz',
    description: 'This site lists typical political positions and estimates your alignment.',
    start: 'Start',
    back: 'Back',
    cancel: 'Cancel',
    finish: 'Finish',
    result: 'Result',
    tryAgain: 'Try again',
    download: 'Download CSV',
    seeWhy: 'See why',
    scale: {
      '-2': 'Strongly disagree',
      '-1': 'Disagree',
      '0': 'Neutral',
      '1': 'Agree',
      '2': 'Strongly agree'
    }
  }
};

export const defaultLang = 'pt';

export function t(lang, key){
  const parts = key.split('.');
  let obj = messages[lang] || messages[defaultLang];
  for (const p of parts){
    obj = obj?.[p];
    if (obj === undefined) return key;
  }
  return obj;
}
