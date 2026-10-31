import { useState } from 'react';
import { Ticket, Menu, X, Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  onOpenTicketModal: () => void;
  isBeatPlaying: boolean;
  onToggleBeat: () => void;
}

export default function Navbar({ onOpenTicketModal, isBeatPlaying, onToggleBeat }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element Brand Zone */}
        <a
          href="#"
          className="text-xl md:text-2xl font-black tracking-tight text-white uppercase whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="text-amber-500 font-display group-hover:text-amber-400 transition-colors">MAD²</span>
          <span className="tracking-widest text-neutral-200">SQUARE</span>
        </a>

        {/* Zone 2: 4-5 single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <button
            onClick={() => scrollTo('squad')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            The Squad
          </button>
          <button
            onClick={() => scrollTo('jukebox')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Jukebox & Punches
          </button>
          <button
            onClick={() => scrollTo('quiz')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Campus Quiz
          </button>
          <button
            onClick={() => scrollTo('ticket-pass')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            FDFS Fan Pass
          </button>
          <button
            onClick={() => scrollTo('dossier')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Film Dossier
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleBeat}
            title={isBeatPlaying ? "Mute Bheems beat" : "Play Bheems Tollywood beat"}
            className="p-2 text-neutral-300 hover:text-amber-400 hover:bg-neutral-800 rounded-lg transition-colors border border-neutral-800 flex items-center gap-2 text-xs"
          >
            {isBeatPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-500 animate-pulse" />
                <span className="text-amber-400 font-mono text-xs whitespace-nowrap">Beat Active</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="text-xs whitespace-nowrap">Audio Beat</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenTicketModal}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors shadow-md hover:shadow-amber-500/20 whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <Ticket className="w-4 h-4" />
            <span>Generate FDFS Pass</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onToggleBeat}
            className="p-2 text-neutral-300 hover:text-amber-400 border border-neutral-800 rounded-lg"
          >
            {isBeatPlaying ? <Volume2 className="w-4 h-4 text-amber-500" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950 px-6 py-4 space-y-3">
          <button
            onClick={() => scrollTo('squad')}
            className="block w-full text-left py-2 text-sm text-neutral-200 hover:text-amber-400 font-medium"
          >
            The Squad
          </button>
          <button
            onClick={() => scrollTo('jukebox')}
            className="block w-full text-left py-2 text-sm text-neutral-200 hover:text-amber-400 font-medium"
          >
            Jukebox & Punches
          </button>
          <button
            onClick={() => scrollTo('quiz')}
            className="block w-full text-left py-2 text-sm text-neutral-200 hover:text-amber-400 font-medium"
          >
            Campus Quiz
          </button>
          <button
            onClick={() => scrollTo('ticket-pass')}
            className="block w-full text-left py-2 text-sm text-neutral-200 hover:text-amber-400 font-medium"
          >
            FDFS Fan Pass
          </button>
          <button
            onClick={() => scrollTo('dossier')}
            className="block w-full text-left py-2 text-sm text-neutral-200 hover:text-amber-400 font-medium"
          >
            Film Dossier
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTicketModal();
              }}
              className="w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-amber-500 hover:bg-amber-400 rounded-lg text-center flex items-center justify-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Generate FDFS Pass</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
