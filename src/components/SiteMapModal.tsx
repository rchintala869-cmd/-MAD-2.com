import { X, ExternalLink, Compass, Film, Music, Award, Ticket, Users, MessageSquare, Download, Check } from 'lucide-react';
import { useState } from 'react';

interface SiteMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function SiteMapModal({ isOpen, onClose, onNavigate }: SiteMapModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopySitemapUrl = () => {
    navigator.clipboard.writeText(`${window.location.origin}/sitemap.xml`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const sections = [
    {
      id: 'hero',
      title: 'Hero & Theatrical Launchpad',
      path: '# (Top)',
      description: 'Marquee poster, key cast metadata, tagline, and Telugu teenmaar procedural audio rhythm trigger.',
      icon: Film,
      actionText: 'Go to Hero',
    },
    {
      id: 'squad',
      title: 'The MAD Gang Squad Dossier',
      path: '#squad',
      description: 'Profiles for DD, Manoj, Ashok, and Laddu, featuring Telugu dialogue audio punches and campus stats.',
      icon: Users,
      actionText: 'Explore Squad',
    },
    {
      id: 'jukebox',
      title: 'Bheems Ceciroleo Jukebox & Punchboard',
      path: '#jukebox',
      description: '5 high-voltage tracks, Telugu & English lyrics snippets, BPM counters, and 6-slot audio soundboard.',
      icon: Music,
      actionText: 'Listen to Jukebox',
    },
    {
      id: 'quiz',
      title: 'Campus Personality Quiz',
      path: '#quiz',
      description: '4-question engineering college simulation to determine your MAD squad persona with customized result badge.',
      icon: Award,
      actionText: 'Take the Quiz',
    },
    {
      id: 'ticket-pass',
      title: 'FDFS Theatrical Fan Pass Generator',
      path: '#ticket-pass',
      description: 'Interactive Telugu cinema souvenir pass generator for Sudarshan 35mm, Sandhya 70mm, and AMB Cinemas.',
      icon: Ticket,
      actionText: 'Create Fan Pass',
    },
    {
      id: 'dossier',
      title: 'Film Dossier & Technical Credits',
      path: '#dossier',
      description: 'Director Kalyan Shankar, Sithara Entertainments production history, and behind-the-scenes engineering.',
      icon: Compass,
      actionText: 'Read Dossier',
    },
    {
      id: 'fan-wall',
      title: 'Telugu College Wall of Fame',
      path: '#fan-wall',
      description: 'Interactive fan messages, college memories, and upvoting board with character filtering.',
      icon: MessageSquare,
      actionText: 'View Fan Wall',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="font-display font-bold text-white text-base">
                MAD² SQUARE — Interactive Site Map
              </h3>
              <p className="text-neutral-500 text-xs">
                Complete directory of sections, interactive modules, and XML endpoints
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto space-y-3.5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {sections.map((sec) => {
              const Icon = sec.icon;
              return (
                <div
                  key={sec.id}
                  className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 hover:border-amber-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-amber-400 font-mono flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5" />
                        {sec.path}
                      </span>
                    </div>
                    <h4 className="text-white font-bold text-sm mb-1">
                      {sec.title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {sec.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-neutral-800 flex items-center justify-end">
                    <button
                      onClick={() => {
                        onClose();
                        onNavigate(sec.id);
                      }}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{sec.actionText}</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Machine-readable XML banner */}
          <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-neutral-300">
            <div>
              <p className="font-semibold text-white flex items-center gap-1.5">
                <ExternalLink className="w-4 h-4 text-amber-400" />
                <span>Search Engine XML Sitemap (/sitemap.xml)</span>
              </p>
              <p className="text-neutral-400 text-xs mt-0.5">
                Valid sitemap.xml schema for Googlebot and indexing crawlers.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg font-mono text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>View XML</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopySitemapUrl}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied URL!' : 'Copy URL'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
