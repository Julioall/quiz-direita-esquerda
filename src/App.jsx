import { useState } from "react";


export default function App() {
  // --- Config ---
  const QUESTION_COUNT = 12; // quantas perguntas por tentativa

  // Lista de posicionamentos para exibição didática
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

  // Banco de perguntas. orientation: +1 se concordar puxa à DIREITA; -1 se puxa à ESQUERDA
  const questionBank = [
    { id: 1, text: "O Estado deve ser o principal provedor de serviços essenciais (saúde, educação).", orientation: -1 },
    { id: 2, text: "Privatizações são, em geral, o melhor caminho para melhorar a eficiência de serviços.", orientation: +1 },
    { id: 3, text: "Leis trabalhistas devem ser flexibilizadas para facilitar contratações.", orientation: +1 },
    { id: 4, text: "Programas de transferência de renda devem ser ampliados mesmo com aumento de impostos.", orientation: -1 },
    { id: 5, text: "Cotas e políticas afirmativas são necessárias para corrigir desigualdades históricas.", orientation: -1 },
    { id: 6, text: "O porte de armas pelo cidadão comum aumenta a segurança.", orientation: +1 },
    { id: 7, text: "A proteção ambiental deve limitar projetos econômicos quando houver risco significativo.", orientation: -1 },
    { id: 8, text: "Menos impostos em geral geram mais crescimento mesmo com menos Estado.", orientation: +1 },
    { id: 9, text: "O casamento igualitário e direitos LGBT+ devem ser garantidos por lei.", orientation: -1 },
    { id: 10, text: "A escola deve focar conteúdos tradicionais e evitar temas políticos e sociais em sala.", orientation: +1 },
    { id: 11, text: "Tributação sobre grandes fortunas é desejável para financiar serviços públicos.", orientation: -1 },
    { id: 12, text: "Empresas devem ter menos burocracia mesmo que alguma proteção ao trabalhador diminua.", orientation: +1 },
    { id: 13, text: "Povos indígenas devem ter prioridade na demarcação e proteção de terras.", orientation: -1 },
    { id: 14, text: "A redução do papel do Estado é positiva na maioria dos setores.", orientation: +1 },
    { id: 15, text: "Descriminalizar o uso de drogas é melhor que endurecer punições.", orientation: -1 },
    { id: 16, text: "A punição mais dura é o caminho principal para reduzir a criminalidade.", orientation: +1 },
    { id: 17, text: "Subsídios estatais para setores estratégicos são importantes para o desenvolvimento.", orientation: -1 },
    { id: 18, text: "Livre mercado aloca recursos melhor do que o governo na maioria dos casos.", orientation: +1 },
    { id: 19, text: "Imigrantes devem ter facilidades para viver e trabalhar no país.", orientation: -1 },
    { id: 20, text: "Valores tradicionais devem orientar políticas públicas.", orientation: +1 },
    { id: 21, text: "Greves e sindicatos são ferramentas importantes de equilíbrio nas relações de trabalho.", orientation: -1 },
    { id: 22, text: "Reduzir benefícios sociais incentiva as pessoas a buscarem emprego.", orientation: +1 },
    { id: 23, text: "O Estado deve regular fortemente bancos e grandes empresas para evitar abusos.", orientation: -1 },
    { id: 24, text: "Empreender deve ser o mais simples possível, mesmo que isso reduza certas exigências.", orientation: +1 },
  ];

  // --- Estado da aplicação ---
  const [step, setStep] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  // Inicia quiz com amostragem aleatória
  function startQuiz() {
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, QUESTION_COUNT);
    setQuestions(picked);
    setAnswers({});
    setStep("quiz");
  }

  // Mapeia opções Likert
  const scale = [
    { label: "Discordo totalmente", value: -2 },
    { label: "Discordo", value: -1 },
    { label: "Neutro", value: 0 },
    { label: "Concordo", value: +1 },
    { label: "Concordo totalmente", value: +2 },
  ];

  function scoreResult() {
    const vals = Object.entries(answers);
    if (vals.length === 0) return { raw: 0, avg: 0, label: "Centro" };
    let sum = 0;
    vals.forEach(([id, ans]) => {
      const q = questions.find(q => q.id === Number(id));
      if (!q) return;
      sum += ans * q.orientation;
    });
    const avg = sum / vals.length;
    let label = "Centro";
    if (avg <= -0.7) label = "Esquerda";
    else if (avg >= 0.7) label = "Direita";
    return { raw: sum, avg, label };
  }

  function finish() {
    setStep("result");
  }

  function Card({ children, className = "" }) {
    return (
      <div className={`bg-white/80 dark:bg-zinc-900/80 rounded-2xl shadow p-5 ${className}`}>
        {children}
      </div>
    );
  }

  function PositionList({ title, items }) {
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

  function Question({ q, index }) {
    return (
      <Card className="mb-4">
        <div className="flex items-start gap-3">
          <div className="text-sm text-zinc-500">{index + 1}/{questions.length}</div>
          <p className="text-base font-medium flex-1">{q.text}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mt-3">
          {scale.map((opt, i) => {
            const checked = answers[q.id] === opt.value;
            return (
              <label key={i} className={`border rounded-xl px-3 py-2 cursor-pointer text-sm text-center select-none ${checked ? "border-blue-600 ring-2 ring-blue-200" : "border-zinc-200 hover:border-zinc-300"}`}>
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
      </Card>
    );
  }

  const result = scoreResult();
  const allAnswered = questions.length > 0 && Object.keys(answers).length === questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 dark:from-zinc-950 dark:to-zinc-900 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Quiz: Direita x Esquerda</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Este site lista posicionamentos típicos e, ao final do quiz, estima sua aproximação: Esquerda, Centro ou Direita. Não é teste científico.</p>
        </header>

        {step === "home" && (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <PositionList title="Posicionamentos normalmente associados à ESQUERDA" items={leftPositions} />
            <PositionList title="Posicionamentos normalmente associados à DIREITA" items={rightPositions} />
          </div>
        )}

        {step === "home" && (
          <Card>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
              <div>
                <h2 className="text-lg font-semibold">Iniciar quiz</h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{QUESTION_COUNT} perguntas aleatórias por tentativa.</p>
              </div>
              <button onClick={startQuiz} className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700">Começar</button>
            </div>
          </Card>
        )}

        {step === "quiz" && (
          <>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold">Responda</h2>
              <button onClick={() => setStep("home")} className="text-sm underline">Voltar</button>
            </div>
            {questions.map((q, i) => (
              <Question key={q.id} q={q} index={i} />
            ))}
            <div className="flex items-center justify-end gap-3 mt-4">
              <button onClick={() => setStep("home")} className="px-4 py-2 rounded-xl border">Cancelar</button>
              <button disabled={!allAnswered} onClick={finish} className={`px-4 py-2 rounded-xl text-white ${allAnswered ? "bg-green-600 hover:bg-green-700" : "bg-zinc-400 cursor-not-allowed"}`}>Finalizar</button>
            </div>
          </>
        )}

        {step === "result" && (
          <Card>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Resultado</h2>
              <button onClick={startQuiz} className="text-sm underline">Tentar novamente</button>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 items-stretch">
              <div className="sm:col-span-2">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Média ponderada das respostas (intervalo aproximado −2 a +2):</p>
                <div className="mt-3 h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="relative h-full">
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 bg-gradient-to-r from-rose-300/60 to-transparent" />
                      <div className="w-1/2 bg-gradient-to-l from-sky-300/60 to-transparent" />
                    </div>
                    <div className="absolute -top-1 h-5 w-0.5 bg-zinc-900 dark:bg-zinc-100 left-1/2" />
                    <div
                      className="absolute top-0 h-3 bg-emerald-500"
                      style={{
                        width: "8px",
                        left: `calc(50% + ${(result.avg / 2) * 100}% - 4px)`
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>Esq.</span>
                  <span>Centro</span>
                  <span>Dir.</span>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center bg-white dark:bg-zinc-950 rounded-xl border p-4">
                <div className="text-xs text-zinc-500">Classificação</div>
                <div className="text-2xl font-bold mt-1">{result.label}</div>
                <div className="text-xs text-zinc-500 mt-1">média {result.avg.toFixed(2)}</div>
              </div>
            </div>
            <p className="text-xs text-zinc-500 mt-4">Aviso: este quiz é simplificado e serve apenas como autoavaliação lúdica. Respostas podem variar por contexto e interpretação.</p>
          </Card>
        )}

        <footer className="mt-8 text-xs text-zinc-500">
          © {new Date().getFullYear()} Quiz Direita e Esquerda. Código cliente‑side, sem coleta de dados.
        </footer>
      </div>
    </div>
  );
}
