import { X, Play, Sparkles, Film } from 'lucide-react';
import { MOVIE_DETAILS } from '../data/movieData.ts';

interface TeaserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayBeat: () => void;
}

export default function TeaserModal({ isOpen, onClose, onPlayBeat }: TeaserModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-amber-500 tracking-wider text-base">
              MAD² SQUARE
            </span>
            <span className="text-neutral-500 text-xs font-mono">OFFICIAL TEASER & PROMO EXPERIENCE</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Frame */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
          <img
            src="/src/assets/images/mad_square_hero_banner_1793454148382.jpg"
            alt="MAD Square Teaser Poster"
            className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

          {/* Central Play Badge */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 text-center">
            <button
              onClick={() => {
                onPlayBeat();
              }}
              className="w-20 h-20 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center shadow-lg shadow-amber-500/40 hover:scale-110 active:scale-95 transition-transform cursor-pointer mb-4"
              title="Play Mass Audio & Teaser Beat"
            >
              <Play className="w-8 h-8 fill-current ml-1" />
            </button>
            <p className="text-amber-400 font-semibold text-sm tracking-wide uppercase">
              Click to Blast Bheems Ceciroleo Mass Rhythm
            </p>
            <h3 className="text-white font-display text-2xl md:text-3xl font-extrabold mt-1">
              "Senior Year Lo Rachhe Rachha!"
            </h3>
            <p className="text-neutral-300 text-xs md:text-sm max-w-lg mt-2">
              The boys are back in college. Watch the teaser preview, hear the signature one-liners, and get ready for the craziest campus comedy of the year.
            </p>
          </div>

          {/* Corner Watermarks */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 text-xs text-white/80 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
            <Film className="w-4 h-4 text-amber-400" />
            <span>Sithara Entertainments & Fortune Four Cinemas</span>
          </div>
        </div>

        {/* Modal Footer / Details */}
        <div className="p-6 bg-neutral-950 border-t border-neutral-800 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-400">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-neutral-200">Director: {MOVIE_DETAILS.director}</span>
              <span>·</span>
              <span>Music: {MOVIE_DETAILS.musicDirector}</span>
              <span>·</span>
              <span>Producers: {MOVIE_DETAILS.producers}</span>
            </div>
            <div className="flex items-center gap-2 text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>Full High-Octane Trailer Dropping In All Mass Theatres</span>
            </div>
          </div>
          <p className="text-neutral-300 text-xs leading-relaxed">
            {MOVIE_DETAILS.synopsis}
          </p>
        </div>
      </div>
    </div>
  );
}
