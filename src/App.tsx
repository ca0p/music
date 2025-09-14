import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Search, 
  Heart,
  Shuffle,
  Repeat,
  Music,
  Home,
  Disc3,
  ListMusic,
  Radio,
  Mic
} from 'lucide-react';

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
  liked: boolean;
}

interface Album {
  id: number;
  title: string;
  artist: string;
  cover: string;
  year: string;
  genre: string;
}

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(75);
  const [progress, setProgress] = useState(0);
  const [activeView, setActiveView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showVinyl, setShowVinyl] = useState(false);
  const vinylRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);

  const tracks: Track[] = [
    { id: 1, title: "Jlallua", artist: "Mlosobial Uaxin", album: "Mingucs", duration: "3:42", cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300", liked: true },
    { id: 2, title: "Mlighon Mis", artist: "Synthetic Dreams", album: "Cyber Nights", duration: "4:15", cover: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300", liked: false },
    { id: 3, title: "Langan", artist: "Neon Pulse", album: "Digital Aurora", duration: "3:58", cover: "https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&w=300", liked: true },
    { id: 4, title: "Laty Violes", artist: "Echo Chamber", album: "Ethereal Waves", duration: "5:23", cover: "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=300", liked: false },
    { id: 5, title: "Spenong", artist: "Quantum Beat", album: "Future Sounds", duration: "4:01", cover: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300", liked: true },
    { id: 6, title: "Llangelo", artist: "Vapor Mind", album: "Synthetic Love", duration: "3:37", cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300", liked: false }
  ];

  const albums: Album[] = [
    { id: 1, title: "Neon Dreams", artist: "Cyber Pulse", cover: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300", year: "2024", genre: "Synthwave" },
    { id: 2, title: "Digital Sunset", artist: "Future Waves", cover: "https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&w=300", year: "2024", genre: "Ambient" },
    { id: 3, title: "Midnight Protocol", artist: "Binary Echo", cover: "https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=300", year: "2023", genre: "Electronic" },
    { id: 4, title: "Virtual Reality", artist: "Synthetic Mind", cover: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?auto=compress&cs=tinysrgb&w=300", year: "2024", genre: "Cyberpunk" },
    { id: 5, title: "Quantum Fields", artist: "Neural Network", cover: "https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&w=300", year: "2023", genre: "Ambient" },
    { id: 6, title: "Electric Dreams", artist: "Neon Collective", cover: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300", year: "2024", genre: "Synthwave" }
  ];

  const filteredTracks = tracks.filter(track => 
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setShowVinyl(!showVinyl);
  };

  const handleTrackSelect = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
    setShowVinyl(true);
  };

  const toggleLike = (trackId: number) => {
    // In a real app, this would update the backend
    console.log(`Toggle like for track ${trackId}`);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => (prev + 0.5) % 100);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-cyan-400 rotate-45 animate-pulse"></div>
          <div className="absolute top-1/2 right-1/4 w-64 h-64 border border-pink-400 rotate-12 animate-bounce"></div>
          <div className="absolute bottom-1/4 left-1/3 w-48 h-48 border border-blue-400 -rotate-12 animate-pulse"></div>
          <div className="grid-pattern absolute inset-0"></div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-screen relative z-10">
        {/* Sidebar */}
        <div className="w-64 bg-black/40 backdrop-blur-lg border-r border-gray-800 p-6">
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Music className="w-4 h-4" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">
                NeonTunes
              </h1>
            </div>
            
            {/* Navigation */}
            <nav className="space-y-2">
              {[
                { icon: Home, label: 'Home', id: 'home' },
                { icon: Disc3, label: 'Discover', id: 'discover' },
                { icon: ListMusic, label: 'Playlists', id: 'playlists' },
                { icon: Radio, label: 'Radio', id: 'radio' },
                { icon: Mic, label: 'Podcasts', id: 'podcasts' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200 ${
                    activeView === item.id 
                      ? 'bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-pink-500/50' 
                      : 'hover:bg-white/10'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Recently Played */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Recently Played</h3>
            <div className="space-y-2">
              {tracks.slice(0, 3).map((track, index) => (
                <div 
                  key={track.id} 
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer transition-all duration-200"
                  onClick={() => handleTrackSelect(index)}
                >
                  <img 
                    src={track.cover} 
                    alt={track.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{track.title}</p>
                    <p className="text-xs text-gray-400 truncate">{track.artist}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="flex items-center justify-between p-6 bg-black/20 backdrop-blur-lg border-b border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for songs, artists, albums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-96 bg-black/40 border border-gray-700 rounded-full focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="w-10 h-10 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                <span className="text-sm font-bold">JD</span>
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeView === 'home' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Discover New Music</h2>
                
                {/* Featured Albums Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                  {albums.map((album) => (
                    <div 
                      key={album.id}
                      className="group bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-lg rounded-lg p-4 hover:scale-105 transition-all duration-300 border border-gray-800 hover:border-cyan-500/50"
                    >
                      <div className="relative mb-4">
                        <img 
                          src={album.cover} 
                          alt={album.title}
                          className="w-full aspect-square rounded-lg object-cover"
                        />
                        <button className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Play className="w-12 h-12 text-white fill-current" />
                        </button>
                        <div className="absolute top-2 right-2">
                          <span className="bg-gradient-to-r from-pink-500 to-cyan-500 text-xs px-2 py-1 rounded-full">
                            {album.genre}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-white mb-1">{album.title}</h3>
                      <p className="text-sm text-gray-400">{album.artist}</p>
                      <p className="text-xs text-gray-500">{album.year}</p>
                    </div>
                  ))}
                </div>

                {/* Trending Tracks */}
                <h3 className="text-xl font-bold mb-4">Trending Now</h3>
                <div className="space-y-2">
                  {filteredTracks.map((track, index) => (
                    <div 
                      key={track.id}
                      className="flex items-center space-x-4 p-3 rounded-lg bg-gradient-to-r from-black/20 to-transparent hover:from-gray-900/50 hover:to-black/30 transition-all duration-200 group border border-transparent hover:border-gray-700"
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <span className="text-sm text-gray-400 w-6">{index + 1}</span>
                        <img 
                          src={track.cover} 
                          alt={track.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{track.title}</p>
                          <p className="text-sm text-gray-400">{track.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => toggleLike(track.id)}
                          className={`transition-colors ${track.liked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}
                        >
                          <Heart className={`w-5 h-5 ${track.liked ? 'fill-current' : ''}`} />
                        </button>
                        <span className="text-sm text-gray-400">{track.duration}</span>
                        <button
                          onClick={() => handleTrackSelect(index)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-full"
                        >
                          <Play className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Now Playing */}
        {showVinyl && (
          <div className="w-80 bg-gradient-to-b from-purple-900/50 to-blue-900/50 backdrop-blur-lg border-l border-gray-800 p-6 flex flex-col">
            <h3 className="text-lg font-bold mb-6">Now Playing</h3>
            
            {/* Vinyl Record */}
            <div className="relative mb-6 flex justify-center">
              <div className="relative">
                <div 
                  ref={vinylRef}
                  className={`w-48 h-48 rounded-full bg-gradient-to-br from-gray-800 to-black border-8 border-gray-700 relative ${isPlaying ? 'animate-spin' : ''}`}
                  style={{ animationDuration: '3s' }}
                >
                  <div className="absolute inset-6 rounded-full overflow-hidden">
                    <img 
                      src={tracks[currentTrack].cover} 
                      alt={tracks[currentTrack].title}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900 rounded-full"></div>
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-sm"></div>
              </div>
            </div>

            {/* Track Info */}
            <div className="text-center mb-6">
              <h4 className="text-xl font-bold mb-2">{tracks[currentTrack].title}</h4>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Heart className="w-4 h-4 text-cyan-500 fill-current" />
                <span className="text-cyan-400 font-medium">{tracks[currentTrack].artist}</span>
              </div>
              <p className="text-gray-400">{tracks[currentTrack].album}</p>
            </div>

            {/* Track List */}
            <div className="flex-1 overflow-y-auto">
              <h5 className="text-sm font-semibold text-gray-400 mb-3">Up Next</h5>
              <div className="space-y-2">
                {tracks.map((track, index) => (
                  <div 
                    key={track.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      index === currentTrack ? 'bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-pink-500/50' : 'hover:bg-white/10'
                    }`}
                    onClick={() => handleTrackSelect(index)}
                  >
                    <span className="text-sm text-gray-400 w-6">{index + 1}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{track.title}</p>
                      <p className="text-xs text-gray-400">{track.artist}</p>
                    </div>
                    <span className="text-xs text-gray-400">{track.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Player */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-gray-800 p-4">
        <div className="flex items-center justify-between">
          {/* Track Info */}
          <div className="flex items-center space-x-4 flex-1">
            <img 
              src={tracks[currentTrack].cover} 
              alt={tracks[currentTrack].title}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div>
              <p className="font-medium">{tracks[currentTrack].title}</p>
              <p className="text-sm text-gray-400">{tracks[currentTrack].artist}</p>
            </div>
            <button
              onClick={() => toggleLike(tracks[currentTrack].id)}
              className={`transition-colors ${tracks[currentTrack].liked ? 'text-pink-500' : 'text-gray-400 hover:text-pink-500'}`}
            >
              <Heart className={`w-5 h-5 ${tracks[currentTrack].liked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Player Controls */}
          <div className="flex-1 max-w-xl">
            <div className="flex items-center justify-center space-x-4 mb-2">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Shuffle className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <SkipBack className="w-6 h-6" />
              </button>
              <button
                onClick={togglePlay}
                className="w-12 h-12 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current" />}
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <SkipForward className="w-6 h-6" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Repeat className="w-5 h-5" />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">1:23</span>
              <div className="flex-1 relative">
                <input
                  ref={progressRef}
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer player-progress"
                />
                <div 
                  className="absolute top-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-lg pointer-events-none"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400">3:42</span>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2 flex-1 justify-end">
            <Volume2 className="w-5 h-5 text-gray-400" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .grid-pattern {
          background-image: 
            linear-gradient(cyan 1px, transparent 1px),
            linear-gradient(90deg, cyan 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.1;
        }
        
        .player-progress::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ec4899, #06b6d4);
          cursor: pointer;
        }
        
        .player-progress::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ec4899, #06b6d4);
          cursor: pointer;
          border: none;
        }
        
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ec4899, #06b6d4);
          cursor: pointer;
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ec4899, #06b6d4);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default App;