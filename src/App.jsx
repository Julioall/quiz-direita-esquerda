import { useEffect, useState } from "react";
import Card from "./components/Card";
import PositionList from "./components/PositionList";
import Question from "./components/Question";
import ResultChart from "./components/ResultChart";
import ResultPanel from "./components/ResultPanel";
import { loadQuestions } from "./loadQuestions";
import { score } from "./scoring";
import { t as translate, defaultLang } from "./i18n";
import { downloadCSV } from "./utils/csv";

export default function App() {
  const QUESTION_COUNT = 12;
  const [lang] = useState(defaultLang);
  const t = (key) => translate(lang, key);

  const leftPositions = [
    "Impostos progressivos e maior taxação sobre altas rendas",
    "Ampliação de programas sociais e do papel do Estado no bem‑estar",
    "Fortalecer direitos trabalhistas e sindicatos",
    "Priorizar serviços públicos (educação/saúde) sobre privatizações",
    "Políticas afirmativas (cotas) para reduzir desigualdades",
    "Regulação mais rigorosa de grandes empresas e bancos",
    "Agenda ambiental forte, com transição energética acelerada",
    "Direitos civis ampliados para minorias e grupos vulneráveis"
  ];
  const rightPositions = [
    "Impostos mais baixos e simplificação tributária",
    "Redução do tamanho do Estado e maior protagonismo do setor privado",
    "Flexibilização de leis trabalhistas para estimular empregos",
    "Privatizar estatais ineficientes e abrir mercados",
    "Políticas universais em vez de ações afirmativas específicas",
    "Menos regulação e mais liberdade econômica",
    "Crescimento econômico sobre restrições ambientais consideradas excessivas",
    "Ênfase em valores tradicionais e segurança pública"
  ];

  const [step, setStep] = useState("home");
  const [allQuestions, setAllQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    loadQuestions().then(setAllQuestions);
  }, []);

  function startQuiz() {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, QUESTION_COUNT);
    setQuestions(picked);
    setAnswers({});
    setStep("quiz");
  }

  function finish() {
    const res = score(answers, questions);
    setResult(res);
    setStep("result");
  }

  const allAnswered = questions.length > 0 && Object.keys(answers).length === questions.length;
  const scale = [-2,-1,0,1,2].map(v => ({ value:v, label:t(`scale.${v}`) }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">{t('title')}</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{t('description')}</p>
        </header>

        {step === "home" && (
          <>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <PositionList title="Posicionamentos normalmente associados à ESQUERDA" items={leftPositions} />
              <PositionList title="Posicionamentos normalmente associados à DIREITA" items={rightPositions} />
            </div>
            <Card>
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{t('start')}</h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{QUESTION_COUNT} perguntas aleatórias por tentativa.</p>
                </div>
                <button type="button" onClick={startQuiz} disabled={allQuestions.length===0} className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">{t('start')}</button>
              </div>
            </Card>
          </>
        )}

        {step === "quiz" && (
          <>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold">Responda</h2>
              <button type="button" onClick={() => setStep("home")} className="text-sm underline">{t('back')}</button>
            </div>
            {questions.map((q, i) => (
              <Question
                key={q.id}
                q={q}
                index={i}
                total={questions.length}
                scale={scale}
                answers={answers}
                setAnswers={setAnswers}
                t={t}
              />
            ))}
            <div className="flex items-center justify-end gap-3 mt-4">
              <button type="button" onClick={() => setStep("home")} className="px-4 py-2 rounded-xl border">{t('cancel')}</button>
              <button type="button" disabled={!allAnswered} onClick={finish} className={`px-4 py-2 rounded-xl text-white ${allAnswered ? "bg-green-600 hover:bg-green-700" : "bg-zinc-400 cursor-not-allowed"}`}>{t('finish')}</button>
            </div>
          </>
        )}

        {step === "result" && result && (
          <Card>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">{t('result')}</h2>
              <button type="button" onClick={startQuiz} className="text-sm underline">{t('tryAgain')}</button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <ResultChart econ={result.econ} social={result.social} />
              <ResultPanel result={result} />
            </div>
            <button type="button" onClick={() => downloadCSV(answers, questions, result)} className="mt-4 px-4 py-2 rounded-xl border">{t('download')}</button>
            <p className="text-xs text-zinc-500 mt-4">Aviso: este quiz é simplificado e serve apenas como autoavaliação lúdica.</p>
          </Card>
        )}

        <footer className="mt-8 text-xs text-zinc-500">
          © {new Date().getFullYear()} Quiz Direita e Esquerda. Código cliente‑side, sem coleta de dados.
        </footer>
      </div>
    </div>
  );
}
