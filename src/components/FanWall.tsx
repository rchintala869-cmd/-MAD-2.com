import { useState } from 'react';
import { INITIAL_FAN_POSTS, CHARACTERS } from '../data/movieData.ts';
import { FanPost } from '../types.ts';
import { audioEngine } from '../utils/audioEngine.ts';
import { Heart, Send, MessageCircle, Sparkles, Filter } from 'lucide-react';

export default function FanWall() {
  const [posts, setPosts] = useState<FanPost[]>(INITIAL_FAN_POSTS);
  const [author, setAuthor] = useState('');
  const [college, setCollege] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [message, setMessage] = useState('');
  const [favoriteCharacter, setFavoriteCharacter] = useState(CHARACTERS[0].name);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    audioEngine.playPunchEffect('beat');
    const newPost: FanPost = {
      id: `fan-${Date.now()}`,
      author,
      college: college.trim() || 'Engineering Campus',
      city,
      message,
      favoriteCharacter,
      likes: 1,
      timeAgo: 'Just now',
    };

    setPosts([newPost, ...posts]);
    setMessage('');
  };

  const handleLike = (id: string) => {
    audioEngine.playPunchEffect('whistle');
    setPosts(
      posts.map((p) => {
        if (p.id === id) {
          return { ...p, likes: p.likes + 1 };
        }
        return p;
      })
    );
  };

  const filteredPosts =
    selectedFilter === 'All'
      ? posts
      : posts.filter((p) => p.favoriteCharacter.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <section id="fan-wall" className="py-20 bg-neutral-900/40 border-b border-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-500 font-bold mb-2">
              Campus Hype & Fan Shouts
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase font-display [text-wrap:balance]">
              Telugu College Wall of Fame
            </h2>
          </div>
          <p className="text-sm md:text-base text-neutral-400 max-w-md">
            Leave your college memory, favourite DD punchline, or FDFS prediction for the MAD Square crew!
          </p>
        </div>

        {/* 2-Column Split: Post Form + Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Post Form (4 cols) */}
          <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-amber-500" />
              <span>Post Your Shoutout</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Sravan Challa"
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  College & City
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. Osmania Univ"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Hyderabad"
                    className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Favorite Character
                </label>
                <select
                  value={favoriteCharacter}
                  onChange={(e) => setFavoriteCharacter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {CHARACTERS.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Your Shoutout / Dialogue
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share your excitement or college hostel memory..."
                  className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Publish to Campus Wall</span>
              </button>
            </form>
          </div>

          {/* Shoutouts Feed (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl mb-4">
              <span className="text-xs text-neutral-500 px-3 py-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter by:
              </span>
              {['All', 'DD', 'Manoj', 'Ashok', 'Laddu'].map((filterName) => (
                <button
                  key={filterName}
                  onClick={() => setSelectedFilter(filterName)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    selectedFilter === filterName
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {filterName}
                </button>
              ))}
            </div>

            {/* List of cards */}
            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-neutral-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{post.author}</span>
                        <span className="text-neutral-500">·</span>
                        <span className="text-neutral-400">{post.college}, {post.city}</span>
                      </div>
                      <span className="text-neutral-500 font-mono text-[11px]">{post.timeAgo}</span>
                    </div>

                    <p className="text-neutral-200 text-sm leading-relaxed mb-3">
                      "{post.message}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 text-xs">
                    <span className="text-amber-400/90 font-mono text-[11px]">
                      Favorite: {post.favoriteCharacter}
                    </span>

                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1.5 text-neutral-400 hover:text-rose-400 transition-colors cursor-pointer group"
                    >
                      <Heart className="w-4 h-4 group-hover:scale-125 transition-transform group-hover:fill-rose-500 group-hover:text-rose-500" />
                      <span className="font-mono tabular-nums text-xs font-semibold">{post.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
