import { MOVIE_DETAILS } from '../data/movieData.ts';
import { Film, Award, Clapperboard, Sparkles } from 'lucide-react';

export default function ProductionDossier() {
  const crewList = [
    { role: 'Director & Story', name: MOVIE_DETAILS.director, note: 'Crafted the breakout 2023 campus blockbuster MAD' },
    { role: 'Music Director', name: MOVIE_DETAILS.musicDirector, note: 'Chartbuster youth beats & viral folk rhythms' },
    { role: 'Producers', name: MOVIE_DETAILS.producers, note: 'Behind DJ Tillu, Tillu Square, Jersey, Bheemla Nayak' },
    { role: 'Cinematography', name: MOVIE_DETAILS.cinematographer, note: 'Known for high-octane visual dynamism' },
    { role: 'Editor', name: MOVIE_DETAILS.editor, note: 'National Award-winning master of comic pacing' },
    { role: 'Production Banners', name: 'Sithara Entertainments & Fortune Four Cinemas', note: 'Leading prestige youth banners in Tollywood' },
  ];

  const highlights = [
    {
      num: '01',
      title: 'From Freshers to Final Year Seniors',
      desc: 'While part one captured the innocent madness of first-year hostel life, MAD Square levels up to the high-stakes chaos of senior engineering students managing backlogs, campus placements, and wild batch rivalry.',
    },
    {
      num: '02',
      title: 'Unapologetic Hyderabadi Youth Slang',
      desc: 'Director Kalyan Shankar retains the signature lightning-fast Telugu dialogue counters that made DD and the gang household names among college students across Telangana and Andhra Pradesh.',
    },
    {
      num: '03',
      title: 'Mass Commercial Production Standards',
      desc: 'Sithara Entertainments has scaled up the sequel with lavish college campus backdrops, pulsating dance numbers by Bheems Ceciroleo, and a roaring theatre soundtrack built for mass whistling.',
    },
  ];

  return (
    <section id="dossier" className="py-20 bg-neutral-950 border-b border-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold mb-2">
              Cinema Dossier & Credits
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase font-display [text-wrap:balance]">
              The Making of MAD² SQUARE
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-400 max-w-md">
            The visionary creative team, powerhouse banners, and production pedigree behind Tollywood's most beloved youth entertainer franchise.
          </p>
        </div>

        {/* 3-Column Bento of Production Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {highlights.map((h) => (
            <div
              key={h.num}
              className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl relative flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl font-mono font-bold text-amber-500/80 mb-3 block">
                  {h.num}.
                </span>
                <h3 className="text-lg font-bold text-white mb-2 font-display">
                  {h.title}
                </h3>
                <p className="text-xs md:text-sm text-neutral-400 leading-relaxed">
                  {h.desc}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
                <span>Theatrical Sequel</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Technical Crew & Production Credits Table */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
              <Clapperboard className="w-5 h-5 text-amber-500" />
              <span>Official Cast & Technical Crew</span>
            </h3>
            <span className="text-xs font-mono text-neutral-500">PRODUCED BY SITHARA ENTERTAINMENTS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {crewList.map((c, i) => (
              <div key={i} className="p-4 bg-neutral-950 rounded-xl border border-neutral-800">
                <span className="text-xs font-mono uppercase text-amber-500 font-semibold block mb-0.5">
                  {c.role}
                </span>
                <h4 className="text-sm font-bold text-white mb-1">
                  {c.name}
                </h4>
                <p className="text-xs text-neutral-400">
                  {c.note}
                </p>
              </div>
            ))}
          </div>

          {/* Sithara Entertainments & Franchise Legacy Banner */}
          <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-300">
            <div className="flex items-center gap-2.5">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                <strong>Sithara Entertainments Track Record:</strong> Pioneers of modern Telugu youthful cinema that resonates from Hyderabad to North America.
              </span>
            </div>
            <span className="font-mono text-amber-400 font-semibold shrink-0">
              Worldwide Release In Telugu
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
