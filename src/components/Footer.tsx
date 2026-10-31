interface FooterProps {
  onOpenSiteMap: () => void;
  onOpenManualIndex: () => void;
}

export default function Footer({ onOpenSiteMap, onOpenManualIndex }: FooterProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-12 text-xs text-neutral-400">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-900">
          <div>
            <div className="text-xl font-black text-white font-display tracking-tight uppercase flex items-center gap-2">
              <span className="text-amber-500">MAD²</span>
              <span>SQUARE</span>
            </div>
            <p className="text-neutral-400 text-xs mt-1">
              A Kalyan Shankar Film · Produced by Sithara Entertainments & Fortune Four Cinemas
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-300">
            <button
              onClick={() => scrollTo('squad')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              The Squad
            </button>
            <button
              onClick={() => scrollTo('jukebox')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Jukebox
            </button>
            <button
              onClick={() => scrollTo('quiz')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Campus Quiz
            </button>
            <button
              onClick={() => scrollTo('ticket-pass')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              FDFS Pass
            </button>
            <button
              onClick={() => scrollTo('dossier')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Film Dossier
            </button>
            <button
              onClick={onOpenSiteMap}
              className="text-neutral-300 hover:text-amber-400 transition-colors cursor-pointer"
            >
              Site Map
            </button>
            <button
              onClick={onOpenManualIndex}
              className="text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer"
            >
              Manual Index
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>
            © {new Date().getFullYear()} MAD Square. All promotional rights reserved by Sithara Entertainments & Fortune Four Cinemas.
          </p>
          <div className="flex items-center gap-3">
            <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-neutral-300 transition-colors">
              sitemap.xml
            </a>
            <span>·</span>
            <button onClick={onOpenManualIndex} className="hover:text-neutral-300 transition-colors cursor-pointer">
              Indexing Console
            </button>
            <span>·</span>
            <span>Telugu Cinema</span>
            <span>·</span>
            <span className="text-amber-400">#MADSquare #MAD2</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
