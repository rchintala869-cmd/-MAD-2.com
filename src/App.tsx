import { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import SquadRoster from './components/SquadRoster.tsx';
import Jukebox from './components/Jukebox.tsx';
import CampusQuiz from './components/CampusQuiz.tsx';
import FDFSTicketGenerator from './components/FDFSTicketGenerator.tsx';
import ProductionDossier from './components/ProductionDossier.tsx';
import FanWall from './components/FanWall.tsx';
import Footer from './components/Footer.tsx';
import TeaserModal from './components/TeaserModal.tsx';
import SiteMapModal from './components/SiteMapModal.tsx';
import ManualIndexModal from './components/ManualIndexModal.tsx';
import { audioEngine } from './utils/audioEngine.ts';

export default function App() {
  const [isTeaserOpen, setIsTeaserOpen] = useState(false);
  const [isSiteMapOpen, setIsSiteMapOpen] = useState(false);
  const [isManualIndexOpen, setIsManualIndexOpen] = useState(false);
  const [isBeatPlaying, setIsBeatPlaying] = useState(false);
  const [ticketInitialCharacter, setTicketInitialCharacter] = useState<string>('Damodhar (DD)');

  const handleToggleBeat = () => {
    const active = audioEngine.toggleMassRhythm();
    setIsBeatPlaying(active);
  };

  const handleOpenTicketModal = () => {
    const el = document.getElementById('ticket-pass');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClaimBadgeFromQuiz = (characterName: string) => {
    setTicketInitialCharacter(characterName);
    const el = document.getElementById('ticket-pass');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Navigation */}
      <Navbar
        onOpenTicketModal={handleOpenTicketModal}
        isBeatPlaying={isBeatPlaying}
        onToggleBeat={handleToggleBeat}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenTeaser={() => setIsTeaserOpen(true)}
          onOpenTicket={handleOpenTicketModal}
          isBeatPlaying={isBeatPlaying}
          onToggleBeat={handleToggleBeat}
        />

        {/* The Squad Character Dossier */}
        <SquadRoster />

        {/* Bheems Jukebox & Dialogue Punches */}
        <Jukebox
          isBeatPlaying={isBeatPlaying}
          onToggleBeat={handleToggleBeat}
        />

        {/* Interactive Campus Quiz */}
        <CampusQuiz onClaimBadge={handleClaimBadgeFromQuiz} />

        {/* FDFS Ticket Pass Generator */}
        <FDFSTicketGenerator initialCharacter={ticketInitialCharacter} />

        {/* Production & Technical Dossier */}
        <ProductionDossier />

        {/* Fan Hype Wall */}
        <FanWall />
      </main>

      {/* Footer */}
      <Footer
        onOpenSiteMap={() => setIsSiteMapOpen(true)}
        onOpenManualIndex={() => setIsManualIndexOpen(true)}
      />

      {/* Teaser Video Modal */}
      <TeaserModal
        isOpen={isTeaserOpen}
        onClose={() => setIsTeaserOpen(false)}
        onPlayBeat={() => {
          if (!isBeatPlaying) {
            handleToggleBeat();
          }
        }}
      />

      {/* Interactive Site Map Modal */}
      <SiteMapModal
        isOpen={isSiteMapOpen}
        onClose={() => setIsSiteMapOpen(false)}
        onNavigate={(id) => {
          if (id === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const el = document.getElementById(id);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
      />

      {/* Manual Indexing & Directory Modal */}
      <ManualIndexModal
        isOpen={isManualIndexOpen}
        onClose={() => setIsManualIndexOpen(false)}
        onNavigate={(id) => {
          if (id === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            const el = document.getElementById(id);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
      />
    </div>
  );
}
