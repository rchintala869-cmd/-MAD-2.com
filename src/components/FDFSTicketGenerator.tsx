import { useState } from 'react';
import { THEATRES_LIST, CHARACTERS } from '../data/movieData.ts';
import { FDFSTicket } from '../types.ts';
import { audioEngine } from '../utils/audioEngine.ts';
import { Ticket, Sparkles, Check, Share2, MapPin, Clock, Film } from 'lucide-react';

interface FDFSTicketGeneratorProps {
  initialCharacter?: string;
}

export default function FDFSTicketGenerator({ initialCharacter }: FDFSTicketGeneratorProps) {
  const [fanName, setFanName] = useState('Kalyan Kumar');
  const [collegeName, setCollegeName] = useState('Chaitanya Bharathi Institute of Technology');
  const [selectedCity, setSelectedCity] = useState('Hyderabad');
  const [selectedTheatre, setSelectedTheatre] = useState(THEATRES_LIST[0].name);
  const [showTime, setShowTime] = useState('04:00 AM FDFS Fans Show');
  const [seatTier, setSeatTier] = useState('First Class Whistle Zone');
  const [favoriteCharacter, setFavoriteCharacter] = useState(initialCharacter || 'Damodhar (DD)');

  const [generatedTicket, setGeneratedTicket] = useState<FDFSTicket | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // Filter theatres by city
  const availableTheatres = THEATRES_LIST.filter(
    (t) => t.city === selectedCity || selectedCity === 'All'
  );

  const handleGenerateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fanName.trim() || !collegeName.trim()) return;

    audioEngine.playPunchEffect('whistle');
    const randomSeat = `${seatTier.includes('Balcony') ? 'BAL' : 'FC'}-${String.fromCharCode(
      65 + Math.floor(Math.random() * 8)
    )}-${Math.floor(Math.random() * 24) + 1}`;

    const randomTicketId = `MAD2-${Math.floor(100000 + Math.random() * 900000)}`;

    const newTicket: FDFSTicket = {
      fanName,
      collegeName,
      city: selectedCity,
      theatre: selectedTheatre,
      showTime,
      seatTier,
      seatNumber: randomSeat,
      favoriteCharacter,
      ticketId: randomTicketId,
      bookingTimestamp: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setGeneratedTicket(newTicket);
  };

  const handleCopyTicket = () => {
    if (!generatedTicket) return;
    const summary = `🎟️ MAD SQUARE (MAD²) - FDFS FAN PASS\nFan: ${generatedTicket.fanName} (${generatedTicket.collegeName})\nTheatre: ${generatedTicket.theatre}\nShow: ${generatedTicket.showTime} | Seat: ${generatedTicket.seatNumber}\nPass ID: ${generatedTicket.ticketId}\nDouble the Madness! In Theatres Worldwide!`;
    navigator.clipboard.writeText(summary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <section id="ticket-pass" className="py-20 bg-neutral-900/60 border-b border-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold mb-2">
              Tollywood Fan Zone
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase font-display [text-wrap:balance]">
              FDFS Theatrical Fan Pass
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-400 max-w-md">
            First Day First Show celebrations are sacred for Telugu cinema lovers. Customize your personalized MAD Square souvenir pass for Sudarshan 35mm, Sandhya 70mm, or Prasads!
          </p>
        </div>

        {/* 2-Column Split: Form + Live Rendered Pass */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Customizer Form (5 cols) */}
          <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <Ticket className="w-5 h-5 text-amber-500" />
              <span>Customize Your Pass</span>
            </h3>

            <form onSubmit={handleGenerateTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Fan / Student Name
                </label>
                <input
                  type="text"
                  required
                  value={fanName}
                  onChange={(e) => setFanName(e.target.value)}
                  placeholder="e.g. Kalyan Varma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  College / University
                </label>
                <input
                  type="text"
                  required
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="e.g. CBIT, Osmania, VNR"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    City
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      const matching = THEATRES_LIST.filter(
                        (t) => t.city === e.target.value
                      );
                      if (matching.length > 0) {
                        setSelectedTheatre(matching[0].name);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Visakhapatnam">Visakhapatnam</option>
                    <option value="Vijayawada">Vijayawada</option>
                    <option value="Tirupati">Tirupati</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Dallas (USA)">Dallas (USA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Show Time
                  </label>
                  <select
                    value={showTime}
                    onChange={(e) => setShowTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="04:00 AM FDFS Fans Show">04:00 AM Mass Fans Show</option>
                    <option value="07:30 AM Early Bird Show">07:30 AM Early Bird Show</option>
                    <option value="11:15 AM Matinee Show">11:15 AM Matinee Show</option>
                    <option value="06:30 PM Prime Show">06:30 PM Prime Show</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  Theatre / Arena
                </label>
                <select
                  value={selectedTheatre}
                  onChange={(e) => setSelectedTheatre(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {availableTheatres.map((t) => (
                    <option key={t.name} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Seat Section
                  </label>
                  <select
                    value={seatTier}
                    onChange={(e) => setSeatTier(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="First Class Whistle Zone">First Class Whistle Zone</option>
                    <option value="Balcony VIP Lounge">Balcony VIP Lounge</option>
                    <option value="Mass Screen Ground Row">Mass Screen Ground Row</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Favorite Character Badge
                  </label>
                  <select
                    value={favoriteCharacter}
                    onChange={(e) => setFavoriteCharacter(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {CHARACTERS.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3.5 px-6 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Issue My Official FDFS Pass</span>
              </button>
            </form>
          </div>

          {/* Column 2: Live Pass & Theatre Preview (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* The Ticket Graphic */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border-2 border-amber-500/40 p-6 md:p-8 shadow-2xl">
              {/* Gold decorative corner accents */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-500/20 to-transparent pointer-events-none" />

              {/* Ticket Top Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/30 pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold tracking-widest uppercase">
                    <Film className="w-4 h-4" /> Sithara Entertainments & Fortune Four Cinemas
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white uppercase font-display mt-1">
                    MAD² SQUARE
                  </h3>
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded bg-amber-500 text-neutral-950 font-black text-xs font-mono uppercase tracking-wider">
                    FDFS MASS PASS
                  </span>
                  <p className="text-[11px] font-mono text-neutral-400 mt-1">
                    PASS ID: {generatedTicket ? generatedTicket.ticketId : 'MAD2-990812'}
                  </p>
                </div>
              </div>

              {/* Ticket Content Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mb-6">
                <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800">
                  <span className="text-neutral-500 block mb-0.5 font-medium">Fan / Attendee</span>
                  <p className="text-white font-bold text-sm">
                    {generatedTicket ? generatedTicket.fanName : fanName || 'Kalyan Kumar'}
                  </p>
                  <p className="text-amber-400/90 text-xs truncate">
                    {generatedTicket ? generatedTicket.collegeName : collegeName || 'CBIT Hyderabad'}
                  </p>
                </div>

                <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800">
                  <span className="text-neutral-500 block mb-0.5 font-medium">Cinema Hall & City</span>
                  <p className="text-white font-bold text-sm flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">{generatedTicket ? generatedTicket.theatre : selectedTheatre}</span>
                  </p>
                  <p className="text-neutral-400 text-xs">
                    {generatedTicket ? generatedTicket.city : selectedCity}
                  </p>
                </div>

                <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800">
                  <span className="text-neutral-500 block mb-0.5 font-medium">Show Details</span>
                  <p className="text-white font-bold text-sm flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{generatedTicket ? generatedTicket.showTime : showTime}</span>
                  </p>
                  <p className="text-neutral-400 text-xs">
                    Date: {generatedTicket ? generatedTicket.bookingTimestamp : 'Theatrical Release Week'}
                  </p>
                </div>

                <div className="p-3 bg-neutral-900/80 rounded-xl border border-neutral-800">
                  <span className="text-neutral-500 block mb-0.5 font-medium">Seat Allotment & Squad Badge</span>
                  <div className="flex items-center justify-between">
                    <p className="text-amber-400 font-mono font-black text-base">
                      {generatedTicket ? generatedTicket.seatNumber : 'BAL-D-14'}
                    </p>
                    <span className="text-[11px] font-mono text-neutral-300 bg-neutral-800 px-2 py-0.5 rounded">
                      {generatedTicket ? generatedTicket.favoriteCharacter.split(' ')[0] : favoriteCharacter.split(' ')[0]} Fan
                    </span>
                  </div>
                  <p className="text-neutral-400 text-xs truncate">
                    {generatedTicket ? generatedTicket.seatTier : seatTier}
                  </p>
                </div>
              </div>

              {/* Perforated Barcode Strip */}
              <div className="pt-4 border-t-2 border-dashed border-neutral-800 flex flex-wrap items-center justify-between gap-4">
                <div className="font-mono text-[11px] text-neutral-500 tracking-widest flex items-center gap-2">
                  <div className="h-6 w-32 bg-neutral-800 rounded flex items-center justify-around px-2 opacity-75">
                    <span className="w-0.5 h-4 bg-neutral-300" />
                    <span className="w-1 h-4 bg-neutral-300" />
                    <span className="w-0.5 h-4 bg-neutral-300" />
                    <span className="w-1.5 h-4 bg-neutral-300" />
                    <span className="w-0.5 h-4 bg-neutral-300" />
                    <span className="w-1 h-4 bg-neutral-300" />
                  </div>
                  <span>ADMIT ONE // MASS ENTRY</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopyTicket}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Pass Details Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-amber-400" />
                        <span>Copy / Share Pass</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Mass Theatre Premiere Atmosphere Photo */}
            <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 relative">
              <div className="aspect-[16/7] w-full overflow-hidden relative">
                <img
                  src="/src/assets/images/theatre_mass_celebration_1793454164518.jpg"
                  alt="Telugu Cinema FDFS Hall Celebration"
                  className="w-full h-full object-cover filter brightness-85"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
                  <span className="font-semibold text-white">Sudarshan 35mm & Sandhya 70mm RTC X Roads Vibes</span>
                  <span className="text-amber-400 font-mono">100% Whistle Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
