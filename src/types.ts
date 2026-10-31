export interface Character {
  id: string;
  name: string;
  actor: string;
  roleTitle: string;
  tagline: string;
  description: string;
  superpower: string;
  canteenOrder: string;
  signatureQuote: string;
  teluguQuote: string;
  attitudeScore: number;
  funFact: string;
  accentColor: string;
}

export interface SongTrack {
  id: string;
  title: string;
  teluguTitle: string;
  singers: string;
  lyricsWriter: string;
  bpm: number;
  duration: string;
  genre: string;
  description: string;
  lyricsSnippet: string;
  teluguLyricsSnippet: string;
}

export interface DialoguePunch {
  id: string;
  character: string;
  punchTelugu: string;
  punchEnglish: string;
  situation: string;
  soundType: 'whistle' | 'beat' | 'punch' | 'laugh';
}

export interface QuizQuestion {
  id: number;
  situation: string;
  options: {
    text: string;
    characterId: string;
  }[];
}

export interface FDFSTicket {
  fanName: string;
  collegeName: string;
  city: string;
  theatre: string;
  showTime: string;
  seatTier: string;
  seatNumber: string;
  favoriteCharacter: string;
  ticketId: string;
  bookingTimestamp: string;
}

export interface FanPost {
  id: string;
  author: string;
  college: string;
  city: string;
  message: string;
  favoriteCharacter: string;
  likes: number;
  timeAgo: string;
}
