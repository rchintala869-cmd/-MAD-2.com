import { Play, Ticket, Flame, Sparkles, Music } from 'lucide-react';
import { MOVIE_DETAILS } from '../data/movieData.ts';

interface HeroProps {
  onOpenTeaser: () => void;
  onOpenTicket: () => void;
  isBeatPlaying: boolean;
  onToggleBeat: () => void;
}

export default function Hero({ onOpenTeaser, onOpenTicket, isBeatPlaying, onToggleBeat }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-neutral-950 pt-8 pb-16 md:pt-12 md:pb-24 border-b border-neutral-800">
      {/* Background glow and subtle noise */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Top Editorial Kicker - Clean unboxed text with typographic separators */}
        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-amber-500 font-semibold tracking-wide mb-4">
          <span className="flex items-center gap-1.5 text-amber-400">
            <Flame className="w-4 h-4" /> Tollywood Youth Sensation
          </span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="text-neutral-300">Sithara Entertainments & Fortune Four Cinemas</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="text-neutral-400">Directed by Kalyan Shankar</span>
        </div>

        {/* Hero 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Column 1: Editorial Headline & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-display leading-[1.08] [text-wrap:balance]">
              Double The <span className="text-amber-500 underline decoration-amber-500/30">Madness</span>. Maximum Mayhem.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
              The boys are back in university for their senior year! DD, Manoj, Ashok, and Laddu return in the most anticipated Telugu youth comedy sequel. Higher stakes, crazier hostel battles, unhinged romantic disasters, and non-stop theatrical laughs.
            </p>

            {/* Clean unboxed movie metadata */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs md:text-sm text-neutral-400 border-y border-neutral-800 py-3.5">
              <span className="text-neutral-200 font-medium">Bheems Ceciroleo Musical</span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span className="text-neutral-200 font-medium">Narne Nithin · Sangeeth Shobhan · Ram Nithin</span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span className="text-amber-400 font-medium">U/A Certified Theatrical Riot</span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenTeaser}
                className="px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-black bg-amber-500 hover:bg-amber-400 rounded-xl transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group active:scale-[0.98]"
              >
                <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                <span>Watch Teaser Preview</span>
              </button>

              <button
                onClick={onOpenTicket}
                className="px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-neutral-200 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-xl transition-all flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 active:scale-[0.98]"
              >
                <Ticket className="w-4 h-4 text-amber-400" />
                <span>Claim FDFS Fan Pass</span>
              </button>

              <button
                onClick={onToggleBeat}
                className="px-4 py-3.5 text-xs font-medium text-neutral-400 hover:text-amber-300 transition-colors flex items-center gap-2 cursor-pointer"
                title="Toggle Telugu Teenmaar Beat"
              >
                <Music className={`w-4 h-4 ${isBeatPlaying ? 'text-amber-400 animate-spin' : ''}`} />
                <span>{isBeatPlaying ? 'Stop Beat' : 'Play Beat'}</span>
              </button>
            </div>

            {/* Quick Proof Metrics adjacent to CTA */}
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-neutral-900 pt-6">
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-white font-mono tabular-nums">100%</p>
                <p className="text-xs text-neutral-400 mt-0.5">Telugu Youth Humor</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">2x</p>
                <p className="text-xs text-neutral-400 mt-0.5">Madness & Punches</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-extrabold text-white font-mono tabular-nums">500+</p>
                <p className="text-xs text-neutral-400 mt-0.5">Theatres Worldwide</p>
              </div>
            </div>
          </div>

          {/* Column 2: Marquee Poster Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl group">
              <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] w-full overflow-hidden">
                <img
                  src="/src/assets/images/mad_square_hero_banner_1793454148382.jpg"
                  alt="MAD Square Movie Official Poster"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                {/* Poster floating banner */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold">
                        Sithara Entertainments
                      </span>
                      <h4 className="text-white font-display font-bold text-lg leading-tight mt-0.5">
                        MAD² (మ్యాడ్ స్క్వేర్)
                      </h4>
                    </div>
                    <button
                      onClick={onOpenTeaser}
                      className="p-3 rounded-full bg-amber-500 hover:bg-amber-400 text-black shadow-md cursor-pointer transition-transform hover:scale-105 active:scale-95"
                      aria-label="Play Teaser"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </button>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-neutral-800">
                    <span>Starring Narne Nithin, Sangeeth Shobhan, Ram Nithin</span>
                    <span className="flex items-center gap-1 text-amber-400 font-mono">
                      <Sparkles className="w-3.5 h-3.5" /> FDFS Soon
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
