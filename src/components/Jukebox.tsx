import { useState } from 'react';
import { TRACKS, DIALOGUE_PUNCHES } from '../data/movieData.ts';
import { SongTrack, DialoguePunch } from '../types.ts';
import { audioEngine } from '../utils/audioEngine.ts';
import { Play, Pause, Music, Volume2, Sparkles, MessageSquare } from 'lucide-react';

interface JukeboxProps {
  isBeatPlaying: boolean;
  onToggleBeat: () => void;
}

export default function Jukebox({ isBeatPlaying, onToggleBeat }: JukeboxProps) {
  const [selectedTrack, setSelectedTrack] = useState<SongTrack>(TRACKS[0]);
  const [activePunchId, setActivePunchId] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  const handlePlayPunch = (punch: DialoguePunch) => {
    setActivePunchId(punch.id);
    audioEngine.playPunchEffect(punch.soundType);
    setTimeout(() => {
      setActivePunchId(null);
    }, 3000);
  };

  const handleToggleTrack = () => {
    onToggleBeat();
  };

  return (
    <section id="jukebox" className="py-20 bg-neutral-900/50 border-b border-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-500 font-semibold mb-2">
              Bheems Ceciroleo Musical Blast
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase font-display [text-wrap:balance]">
              The Jukebox & Telugu Punchboard
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-400 max-w-md">
            From the composer who brought the chartbuster youth anthems in MAD, experience the high-voltage soundtrack and viral campus dialogue punches of MAD Square.
          </p>
        </div>

        {/* 2-Column Layout: Jukebox Player + Dialogue Punchboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Bheems Music Player (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            {/* Top Bar with Canteen Backdrop */}
            <div className="relative rounded-xl overflow-hidden mb-6 h-48 border border-neutral-800">
              <img
                src="/src/assets/images/mad_gang_canteen_1793454149018.jpg"
                alt="MAD Gang College Canteen"
                className="w-full h-full object-cover filter brightness-70"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                    Track #{TRACKS.indexOf(selectedTrack) + 1} of {TRACKS.length}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">
                    {selectedTrack.title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-telugu mt-0.5">
                    {selectedTrack.teluguTitle}
                  </p>
                </div>

                {/* Sound wave equalizer indicator */}
                <div className="flex items-end gap-1 h-8">
                  <span className={`w-1 bg-amber-500 rounded-full ${isBeatPlaying ? 'animate-soundwave-1' : 'h-1.5'}`} />
                  <span className={`w-1 bg-amber-400 rounded-full ${isBeatPlaying ? 'animate-soundwave-2' : 'h-2'}`} />
                  <span className={`w-1 bg-amber-500 rounded-full ${isBeatPlaying ? 'animate-soundwave-3' : 'h-3'}`} />
                  <span className={`w-1 bg-amber-400 rounded-full ${isBeatPlaying ? 'animate-soundwave-4' : 'h-1.5'}`} />
                </div>
              </div>
            </div>

            {/* Track Info & Player Controls */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-neutral-950 rounded-xl border border-neutral-800 text-xs text-neutral-400">
                <div>
                  <span className="text-neutral-500">Singers: </span>
                  <span className="text-neutral-200 font-semibold">{selectedTrack.singers}</span>
                </div>
                <div>
                  <span className="text-neutral-500">Lyrics: </span>
                  <span className="text-neutral-200 font-semibold">{selectedTrack.lyricsWriter}</span>
                </div>
                <div>
                  <span className="text-neutral-500">Tempo: </span>
                  <span className="text-amber-400 font-mono font-bold tabular-nums">{selectedTrack.bpm} BPM</span>
                </div>
              </div>

              {/* Lyrics Card */}
              <div className="p-4 bg-neutral-950/70 rounded-xl border border-neutral-800/80">
                <div className="text-xs font-mono uppercase text-amber-500 font-bold mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Hook Line & Telugu Lyrics:
                </div>
                <p className="font-telugu text-base text-amber-300/95 font-medium leading-relaxed">
                  "{selectedTrack.teluguLyricsSnippet}"
                </p>
                <p className="text-xs text-neutral-400 italic mt-1">
                  Transliteration: {selectedTrack.lyricsSnippet}
                </p>
              </div>

              {/* Play / Pause Toggle CTA */}
              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={handleToggleTrack}
                  className="flex-1 py-3.5 px-6 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
                >
                  {isBeatPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause Tollywood Dholak Beat</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Play Track Rhythm Beat ({selectedTrack.bpm} BPM)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Track Selector List */}
            <div className="mt-6 pt-6 border-t border-neutral-800 space-y-2">
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block mb-2">
                All Tracks in Album
              </span>
              <div className="space-y-1.5">
                {TRACKS.map((t, idx) => {
                  const isCur = selectedTrack.id === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTrack(t)}
                      className={`w-full p-2.5 rounded-lg text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isCur
                          ? 'bg-neutral-800 text-amber-400 font-semibold border border-neutral-700'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-neutral-500 w-4">{idx + 1}.</span>
                        <span className="truncate">{t.title}</span>
                      </div>
                      <span className="font-mono text-neutral-500 tabular-nums shrink-0">{t.duration}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Telugu Campus Punchboard (5 cols) */}
          <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4" /> Telugu Soundboard
                </div>
                <span className="text-xs text-neutral-500">6 Signature Punches</span>
              </div>

              <h3 className="text-2xl font-black text-white uppercase font-display mb-2">
                MAD Gang Punchlines
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Tap any dialogue to trigger the authentic campus audio punch & sound effect. Authentic Telangana & Hyderabad youth slang!
              </p>

              {/* Punchline List */}
              <div className="space-y-3">
                {DIALOGUE_PUNCHES.map((punch) => {
                  const isActive = activePunchId === punch.id;
                  return (
                    <div
                      key={punch.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isActive
                          ? 'bg-amber-500/10 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                          : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-amber-400 font-mono">{punch.character}</span>
                        <span className="text-neutral-500 text-[11px]">{punch.situation}</span>
                      </div>

                      <p className="font-telugu text-sm text-neutral-200 leading-snug font-medium mb-1.5">
                        "{punch.punchTelugu}"
                      </p>
                      <p className="text-xs text-neutral-400 italic mb-2.5">
                        Meaning: {punch.punchEnglish}
                      </p>

                      <button
                        onClick={() => handlePlayPunch(punch)}
                        className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          isActive
                            ? 'bg-amber-500 text-black'
                            : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Play Sound Punch ({punch.soundType.toUpperCase()})</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 text-center">
              <span className="text-xs text-neutral-500 font-mono">
                Audio synthesized dynamically via Web Audio API
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
