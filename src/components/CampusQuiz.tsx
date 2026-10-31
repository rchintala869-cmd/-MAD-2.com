import { useState } from 'react';
import { QUIZ_QUESTIONS, CHARACTERS } from '../data/movieData.ts';
import { Character } from '../types.ts';
import { audioEngine } from '../utils/audioEngine.ts';
import { Award, RotateCcw, ArrowRight, CheckCircle2, Ticket } from 'lucide-react';

interface CampusQuizProps {
  onClaimBadge: (characterName: string) => void;
}

export default function CampusQuiz({ onClaimBadge }: CampusQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [resultCharacter, setResultCharacter] = useState<Character | null>(null);

  const handleSelectOption = (characterId: string) => {
    audioEngine.playPunchEffect('punch');
    const newAnswers = { ...answers, [currentQuestionIndex]: characterId };
    setAnswers(newAnswers);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate winner
      const counts: Record<string, number> = { dd: 0, manoj: 0, ashok: 0, laddu: 0 };
      Object.values(newAnswers).forEach((cId) => {
        counts[cId] = (counts[cId] || 0) + 1;
      });

      let highestCharId = 'dd';
      let highestCount = -1;
      Object.entries(counts).forEach(([cId, count]) => {
        if (count > highestCount) {
          highestCount = count;
          highestCharId = cId;
        }
      });

      const matched = CHARACTERS.find((c) => c.id === highestCharId) || CHARACTERS[0];
      setResultCharacter(matched);
      audioEngine.playPunchEffect('whistle');
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setResultCharacter(null);
  };

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  return (
    <section id="quiz" className="py-20 bg-neutral-950 border-b border-neutral-800 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold mb-2">
            Campus Personality Test
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase font-display [text-wrap:balance]">
            Which MAD Squad Legend Are You?
          </h2>
          <p className="text-sm md:text-base text-neutral-400 mt-3 max-w-lg mx-auto">
            Answer 4 real engineering college situations to discover if you are the Sarcastic DD, Swag Leader Manoj, Tragic Lover Ashok, or Canteen King Laddu!
          </p>
        </div>

        {/* Quiz Container */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-10 shadow-2xl relative">
          {!resultCharacter ? (
            <div>
              {/* Progress Tracker */}
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-6">
                <span>QUESTION {currentQuestionIndex + 1} OF {QUIZ_QUESTIONS.length}</span>
                <span className="text-amber-400 font-semibold">
                  {Math.round(((currentQuestionIndex) / QUIZ_QUESTIONS.length) * 100)}% COMPLETE
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-neutral-800 rounded-full mb-8 overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6 leading-snug">
                {currentQ.situation}
              </h3>

              {/* Options list */}
              <div className="space-y-3">
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt.characterId)}
                    className="w-full p-4 rounded-xl text-left bg-neutral-950 border border-neutral-800 hover:border-amber-500/60 hover:bg-neutral-900 text-neutral-200 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-md bg-neutral-800 text-neutral-400 font-mono text-xs flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-black transition-colors font-bold">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-sm leading-relaxed">{opt.text}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-amber-400 shrink-0 ml-3 transition-transform group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Card */
            <div className="text-center py-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500 text-amber-400 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>

              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                Your MAD Squad Identity Is
              </div>

              <h3 className="text-3xl md:text-4xl font-black text-amber-400 uppercase font-display mb-2">
                {resultCharacter.name}
              </h3>

              <p className="text-sm font-semibold text-neutral-200 mb-4">
                "{resultCharacter.roleTitle}"
              </p>

              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-left max-w-lg mx-auto mb-6 space-y-2">
                <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>College Persona Match</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {resultCharacter.description}
                </p>
                <div className="pt-2 border-t border-neutral-800 text-xs font-telugu text-amber-300">
                  Punchline: "{resultCharacter.teluguQuote}"
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => onClaimBadge(resultCharacter.name)}
                  className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Print {resultCharacter.name.split(' ')[0]} FDFS Ticket Pass</span>
                </button>

                <button
                  onClick={resetQuiz}
                  className="w-full sm:w-auto px-5 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-medium text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
