import { useState } from 'react';
import { X, Search, Check, Copy, ExternalLink, Globe, Terminal, FileCode2, ArrowRight } from 'lucide-react';

interface ManualIndexModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

interface IndexItem {
  id: string;
  indexCode: string;
  title: string;
  category: 'Core Section' | 'Character Dossier' | 'Music Track' | 'Dialogue Punch' | 'Interactive Tool' | 'Technical Credit';
  url: string;
  targetAnchor: string;
  keywords: string[];
}

const INDEX_CATALOG: IndexItem[] = [
  {
    id: 'idx-01',
    indexCode: 'IDX-01',
    title: 'MAD Square Theatrical Launch & Marquee Poster',
    category: 'Core Section',
    url: '/',
    targetAnchor: 'hero',
    keywords: ['movie', 'poster', 'teaser', 'kalyan shankar', 'tollywood'],
  },
  {
    id: 'idx-02',
    indexCode: 'IDX-02',
    title: 'Damodhar (DD) - Sangeeth Shobhan Character Profile',
    category: 'Character Dossier',
    url: '/#squad',
    targetAnchor: 'squad',
    keywords: ['dd', 'damodhar', 'sangeeth shobhan', 'sarcasm', 'single king'],
  },
  {
    id: 'idx-03',
    indexCode: 'IDX-03',
    title: 'Manoj - Narne Nithin Swag & Campus Leader Profile',
    category: 'Character Dossier',
    url: '/#squad',
    targetAnchor: 'squad',
    keywords: ['manoj', 'narne nithin', 'trouble magnet', 'mass entry'],
  },
  {
    id: 'idx-04',
    indexCode: 'IDX-04',
    title: 'Ashok - Ram Nithin Tragic Lover Boy Profile',
    category: 'Character Dossier',
    url: '/#squad',
    targetAnchor: 'squad',
    keywords: ['ashok', 'ram nithin', 'love story', 'heartbreak', 'college romance'],
  },
  {
    id: 'idx-05',
    indexCode: 'IDX-05',
    title: 'Laddu (Ganesh) - Vishnu Oi Canteen Legend Profile',
    category: 'Character Dossier',
    url: '/#squad',
    targetAnchor: 'squad',
    keywords: ['laddu', 'vishnu oi', 'ganesh', 'canteen', 'samosa', 'warden'],
  },
  {
    id: 'idx-06',
    indexCode: 'IDX-06',
    title: 'MAD Square Mass Blast (Title Track by Bheems & Mangli)',
    category: 'Music Track',
    url: '/#jukebox',
    targetAnchor: 'jukebox',
    keywords: ['bheems ceciroleo', 'mangli', 'title song', 'mass blast', 'dholak'],
  },
  {
    id: 'idx-07',
    indexCode: 'IDX-07',
    title: 'Hostel Warden Midnight Mayhem (Ram Miriyala & Bheems)',
    category: 'Music Track',
    url: '/#jukebox',
    targetAnchor: 'jukebox',
    keywords: ['hostel song', 'warden anthem', 'ram miriyala', 'midnight ragam'],
  },
  {
    id: 'idx-08',
    indexCode: 'IDX-08',
    title: 'DD Single Rajyam Anthem (Sangeeth Shobhan Rap)',
    category: 'Music Track',
    url: '/#jukebox',
    targetAnchor: 'jukebox',
    keywords: ['single song', 'dd anthem', 'peace of mind', 'breakup', 'comedy song'],
  },
  {
    id: 'idx-09',
    indexCode: 'IDX-09',
    title: 'Telugu Campus Dialogue Soundboard (6 Punches)',
    category: 'Dialogue Punch',
    url: '/#jukebox',
    targetAnchor: 'jukebox',
    keywords: ['telugu punches', 'dialogues', 'hyderabad slang', 'audio clips', 'counters'],
  },
  {
    id: 'idx-10',
    indexCode: 'IDX-10',
    title: 'Campus Personality Quiz: "Which MAD Squad Legend Are You?"',
    category: 'Interactive Tool',
    url: '/#quiz',
    targetAnchor: 'quiz',
    keywords: ['quiz', 'test', 'personality', 'engineering college', 'engineering students'],
  },
  {
    id: 'idx-11',
    indexCode: 'IDX-11',
    title: 'FDFS Theatrical Fan Pass Customizer & Generator',
    category: 'Interactive Tool',
    url: '/#ticket-pass',
    targetAnchor: 'ticket-pass',
    keywords: ['ticket', 'fdfs', 'fan pass', 'first day first show', 'rtc x roads', 'prasad imax'],
  },
  {
    id: 'idx-12',
    indexCode: 'IDX-12',
    title: 'Director Kalyan Shankar & Sithara Entertainments Dossier',
    category: 'Technical Credit',
    url: '/#dossier',
    targetAnchor: 'dossier',
    keywords: ['kalyan shankar', 'sithara entertainments', 'naga vamsi', 'sai soujanya'],
  },
  {
    id: 'idx-13',
    indexCode: 'IDX-13',
    title: 'National Award-Winning Editor Navin Nooli & Technical Crew',
    category: 'Technical Credit',
    url: '/#dossier',
    targetAnchor: 'dossier',
    keywords: ['navin nooli', 'editor', 'shamdat', 'cinematographer', 'production'],
  },
  {
    id: 'idx-14',
    indexCode: 'IDX-14',
    title: 'Telugu College Wall of Fame & Live Fan Shoutouts',
    category: 'Core Section',
    url: '/#fan-wall',
    targetAnchor: 'fan-wall',
    keywords: ['wall of fame', 'shoutouts', 'fan comments', 'cbit', 'osmania', 'vnr'],
  },
];

export default function ManualIndexModal({ isOpen, onClose, onNavigate }: ManualIndexModalProps) {
  const [activeTab, setActiveTab] = useState<'catalog' | 'gsc-guide'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://example.com';

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const filteredItems = INDEX_CATALOG.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.indexCode.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className="font-display font-bold text-white text-base">
                Manual Indexing & Search Directory
              </h3>
              <p className="text-neutral-500 text-xs">
                Line-by-line manual URL catalog and Search Console submission console
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

        {/* Tab Controls */}
        <div className="flex items-center border-b border-neutral-800 bg-neutral-950/60 px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'catalog'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Manual Content Catalog ({INDEX_CATALOG.length} Nodes)</span>
          </button>
          <button
            onClick={() => setActiveTab('gsc-guide')}
            className={`pb-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'gsc-guide'
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Google Search Console Manual Submission Guide</span>
          </button>
        </div>

        {/* Tab 1: Manual Catalog */}
        {activeTab === 'catalog' && (
          <div className="p-6 overflow-y-auto space-y-4 flex-1">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search index by keyword, character, song, or code (e.g. 'DD', 'Bheems', 'FDFS', 'IDX-03')..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Catalog Grid */}
            <div className="space-y-2.5">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        {item.indexCode}
                      </span>
                      <span className="text-neutral-400 font-medium">{item.category}</span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-neutral-500 font-mono">{item.url}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-neutral-500">
                      Keywords: {item.keywords.join(', ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => copyToClipboard(`${currentOrigin}${item.url}`, item.id)}
                      className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded-lg text-xs font-mono flex items-center gap-1 border border-neutral-800 transition-colors cursor-pointer"
                      title="Copy full indexed URL"
                    >
                      {copiedKey === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === item.id ? 'Copied' : 'Copy'}</span>
                    </button>

                    <button
                      onClick={() => {
                        onClose();
                        onNavigate(item.targetAnchor);
                      }}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Jump</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Search Console Manual Indexing Guide */}
        {activeTab === 'gsc-guide' && (
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
            {/* Step-by-Step Instructions */}
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-500" />
                <span>How to Manually Request Indexing in Google Search Console (GSC)</span>
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-neutral-300 leading-relaxed pl-1">
                <li>
                  Go to <a href="https://search.google.com/search-console" target="_blank" rel="noreferrer" className="text-amber-400 underline inline-flex items-center gap-1">Google Search Console <ExternalLink className="w-3 h-3" /></a> and sign in.
                </li>
                <li>
                  Add your property (e.g. <code className="bg-neutral-900 px-1.5 py-0.5 rounded text-amber-300 font-mono">{currentOrigin}</code>).
                </li>
                <li>
                  In the top search bar, paste the URL you want indexed (e.g. <code className="bg-neutral-900 px-1.5 py-0.5 rounded text-amber-300 font-mono">{currentOrigin}/</code>) and press <kbd className="bg-neutral-800 px-1 py-0.5 rounded text-white">Enter</kbd> (URL Inspection).
                </li>
                <li>
                  Click the <strong>"REQUEST INDEXING"</strong> button on the inspection results page to trigger Googlebot's immediate crawl priority queue.
                </li>
                <li>
                  Navigate to <strong>Sitemaps</strong> in the left sidebar, enter <code className="bg-neutral-900 px-1.5 py-0.5 rounded text-amber-300 font-mono">sitemap.xml</code> in the "Add a new sitemap" input, and click <strong>Submit</strong>.
                </li>
              </ol>
            </div>

            {/* Quick Copy Snippets */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold text-neutral-400 tracking-wider">
                Canonical Sitemap & Ping API
              </h4>

              <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between gap-4">
                <div className="truncate">
                  <span className="text-[11px] text-neutral-500 block">Sitemap Endpoint:</span>
                  <code className="text-xs font-mono text-amber-400 truncate block">
                    {currentOrigin}/sitemap.xml
                  </code>
                </div>
                <button
                  onClick={() => copyToClipboard(`${currentOrigin}/sitemap.xml`, 'sitemap')}
                  className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg border border-neutral-700 flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  {copiedKey === 'sitemap' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'sitemap' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* cURL Ping command */}
              <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-neutral-400 font-mono">Terminal / cURL Ping command for manual crawler notification:</span>
                  <button
                    onClick={() => copyToClipboard(`curl -A "Mozilla/5.0" "https://www.google.com/ping?sitemap=${encodeURIComponent(currentOrigin + '/sitemap.xml')}"`, 'curl')}
                    className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'curl' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'curl' ? 'Copied' : 'Copy cURL'}</span>
                  </button>
                </div>
                <pre className="p-2.5 bg-neutral-900 rounded-lg text-[11px] font-mono text-neutral-300 overflow-x-auto">
                  curl -A "Mozilla/5.0" "https://www.google.com/ping?sitemap={encodeURIComponent(currentOrigin + '/sitemap.xml')}"
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500">
          <span>Active Nodes: {INDEX_CATALOG.length} items cataloged</span>
          <span className="text-neutral-400 font-mono">Status: Ready for Google Search Console</span>
        </div>
      </div>
    </div>
  );
}
