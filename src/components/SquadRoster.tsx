import { useState } from 'react';
import { CHARACTERS } from '../data/movieData.ts';
import { Character } from '../types.ts';
import { audioEngine } from '../utils/audioEngine.ts';
import { Volume2, Quote, Sparkles, Coffee, ShieldAlert } from 'lucide-react';

export default function SquadRoster() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(CHARACTERS[0]);
  const [activeSpeechBubble, setActiveSpeechBubble] = useState<string | null>(null);

  const handlePlayDialogue = (char: Character) => {
    audioEngine.playPunchEffect(char.id === 'dd' ? 'laugh' : char.id === 'manoj' ? 'punch' : char.id === 'ashok' ? 'beat' : 'whistle');
    setActiveSpeechBubble(char.signatureQuote);
    setTimeout(() => {
      setActiveSpeechBubble(null);
    }, 4500);
  };

  return (
    <section id="squad" className="py-20 bg-neutral-950 border-b border-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold mb-2">
              The MAD Gang Dossier
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase font-display [text-wrap:balance]">
              Meet The Legends of Senior Year
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-400 max-w-md">
            Four mismatched roommates. Infinite college chaos. Click any squad member to examine their stats, canteen history, and signature Telugu punches.
          </p>
        </div>

        {/* Character Segmented Tabs (Functional Buttons) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-neutral-900 border border-neutral-800 rounded-xl mb-10">
          {CHARACTERS.map((char) => {
            const isActive = selectedCharacter.id === char.id;
            return (
              <button
                key={char.id}
                onClick={() => setSelectedCharacter(char)}
                className={`py-3 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-800 text-amber-400 shadow-md border border-neutral-700'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                }`}
              >
                <span>{char.name.split(' ')[0]}</span>
                {isActive && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
              </button>
            );
          })}
        </div>

        {/* Featured Character Showcase Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Column: Visual & Quote Area (5 cols) */}
          <div className="lg:col-span-5 p-8 flex flex-col justify-between bg-gradient-to-b from-neutral-850 to-neutral-900 border-b lg:border-b-0 lg:border-r border-neutral-800 relative">
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-neutral-400 mb-4">
                <span className="font-mono uppercase text-amber-500 font-bold">{selectedCharacter.roleTitle}</span>
                <span className="font-mono text-neutral-500">Actor: {selectedCharacter.actor}</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white uppercase font-display">
                {selectedCharacter.name}
              </h3>
              <p className="text-sm italic text-amber-400/90 mt-2 font-medium">
                "{selectedCharacter.tagline}"
              </p>

              {/* Dynamic Speech Bubble Alert */}
              {activeSpeechBubble && (
                <div className="mt-4 p-4 rounded-xl bg-amber-500 text-neutral-950 shadow-lg border border-amber-300 animate-in fade-in zoom-in-95 duration-200">
                  <div className="text-xs uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5">
                    <Quote className="w-3.5 h-3.5" /> Telugu Dialogue Punch:
                  </div>
                  <p className="text-sm font-bold font-display leading-snug">
                    {activeSpeechBubble}
                  </p>
                </div>
              )}
            </div>

            {/* Character Dialogue Action Button */}
            <div className="mt-8 pt-6 border-t border-neutral-800 space-y-3">
              <button
                onClick={() => handlePlayDialogue(selectedCharacter)}
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Hear {selectedCharacter.name.split(' ')[0]}'s Punch Line</span>
              </button>

              <div className="p-3.5 bg-neutral-950/60 rounded-xl border border-neutral-800 text-xs text-neutral-300">
                <p className="font-semibold text-neutral-100 mb-1">Telugu Original:</p>
                <p className="font-telugu text-sm text-amber-400/90 leading-relaxed">
                  {selectedCharacter.teluguQuote}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Character Attributes & Dossier (7 cols) */}
          <div className="lg:col-span-7 p-8 flex flex-col justify-between space-y-6">
            <div>
              <h4 className="text-sm uppercase tracking-wider font-semibold text-neutral-400 mb-2">
                Campus Biography
              </h4>
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                {selectedCharacter.description}
              </p>
            </div>

            {/* Metric & Attribute Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Campus Superpower</span>
                </div>
                <p className="text-xs text-neutral-300 leading-snug mt-1">
                  {selectedCharacter.superpower}
                </p>
              </div>

              <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
                  <Coffee className="w-4 h-4" />
                  <span>Canteen Order</span>
                </div>
                <p className="text-xs text-neutral-300 leading-snug mt-1">
                  {selectedCharacter.canteenOrder}
                </p>
              </div>
            </div>

            {/* Attitude Meter */}
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
              <div className="flex items-center justify-between text-xs font-semibold text-neutral-300 mb-2">
                <span>Madness & Sarcasm Quotient</span>
                <span className="text-amber-400 font-mono tabular-nums">{selectedCharacter.attitudeScore} / 100</span>
              </div>
              <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-700"
                  style={{ width: `${selectedCharacter.attitudeScore}%` }}
                />
              </div>
              <p className="text-xs text-neutral-400 mt-2">
                {selectedCharacter.funFact}
              </p>
            </div>
          </div>
        </div>

        {/* 4-Card Quick Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {CHARACTERS.map((char) => (
            <div
              key={char.id}
              onClick={() => setSelectedCharacter(char)}
              className={`p-5 rounded-xl border transition-all cursor-pointer ${
                selectedCharacter.id === char.id
                  ? 'bg-neutral-900 border-amber-500/50 shadow-lg'
                  : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-display font-bold text-base text-white">
                  {char.name}
                </h4>
                <span className="text-xs font-mono text-amber-500 font-semibold">{char.actor.split(' ')[0]}</span>
              </div>
              <p className="text-xs text-neutral-400 line-clamp-2">
                {char.roleTitle}
              </p>
              <div className="mt-3 text-xs text-neutral-500 flex items-center justify-between pt-2 border-t border-neutral-800/80">
                <span>Quote</span>
                <span className="text-amber-400 hover:underline">View Details →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
