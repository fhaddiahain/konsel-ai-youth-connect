
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, Volume2 } from "lucide-react";
import YouTube, { YouTubeProps } from "react-youtube";

interface RelaxationTrack {
  id: number;
  title: string;
  description: string;
  duration: string;
  category: string;
  icon: string;
  youtubeId: string;
}

const Relaxation = () => {
  const [currentTrack, setCurrentTrack] = useState<RelaxationTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const playerRef = useRef<any>(null);

  const tracks: RelaxationTrack[] = [
    {
      id: 1,
      title: "Hujan Tenang",
      description: "Suara hujan yang menenangkan untuk relaksasi",
      duration: "60 menit",
      category: "Alam",
      icon: "🌧️",
      youtubeId: "anqVTtWUZUM"
    },
    {
      id: 2,
      title: "Suara Ombak",
      description: "Gemericik ombak pantai yang damai",
      duration: "45 menit", 
      category: "Laut",
      icon: "🌊",
      youtubeId: "M6S-I1FqGGw"
    },
    {
      id: 3,
      title: "Angin Alam",
      description: "Hembusan angin lembut di alam terbuka",
      duration: "30 menit",
      category: "Alam",
      icon: "🍃",
      youtubeId: "kmhBZLd76L0"
    },
    {
      id: 4,
      title: "Musik Meditasi",
      description: "Musik instrumental untuk meditasi mendalam",
      duration: "40 menit",
      category: "Meditasi", 
      icon: "🎵",
      youtubeId: "FjHGZj2IjBk"
    }
  ];

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
    event.target.setVolume(volume);
  };

  const playTrack = (track: RelaxationTrack) => {
    if (currentTrack && currentTrack.id !== track.id) {
      // Stop current track if different track is selected
      if (playerRef.current) {
        playerRef.current.stopVideo();
      }
    }
    
    setCurrentTrack(track);
    setIsPlaying(true);
    
    setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.playVideo();
      }
    }, 100);
  };

  const togglePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stopTrack = () => {
    if (playerRef.current) {
      playerRef.current.stopVideo();
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (playerRef.current) {
      playerRef.current.setVolume(newVolume);
    }
  };

  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    // YouTube player state: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (cued)
    if (event.data === 1) {
      setIsPlaying(true);
    } else if (event.data === 2 || event.data === 0) {
      setIsPlaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">🧘 Relaksasi</h1>
          <p className="text-gray-600 text-lg">
            Dengarkan suara-suara menenangkan untuk relaksasi dan meditasi
          </p>
        </div>

        {/* Audio Player Controls */}
        {currentTrack && (
          <Card className="mb-8 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{currentTrack.icon}</span>
                  <div>
                    <h3 className="font-semibold text-lg">{currentTrack.title}</h3>
                    <p className="text-gray-600 text-sm">{currentTrack.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={togglePlayPause}
                    className="flex items-center space-x-2"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    <span>{isPlaying ? "Pause" : "Play"}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={stopTrack}
                    className="flex items-center space-x-2"
                  >
                    <Square className="h-4 w-4" />
                    <span>Stop</span>
                  </Button>
                </div>
              </div>
              
              {/* Volume Control */}
              <div className="flex items-center space-x-3">
                <Volume2 className="h-4 w-4 text-gray-600" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600 w-12">{volume}%</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Track Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track) => (
            <Card 
              key={track.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                currentTrack?.id === track.id ? 'ring-2 ring-teal-500 bg-teal-50' : 'bg-white/80 backdrop-blur-sm'
              }`}
              onClick={() => playTrack(track)}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl">{track.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">{track.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{track.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded">{track.category}</span>
                      <span>{track.duration}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Hidden YouTube Player */}
        {currentTrack && (
          <div className="hidden">
            <YouTube
              videoId={currentTrack.youtubeId}
              onReady={onPlayerReady}
              onStateChange={onStateChange}
              opts={{
                height: '0',
                width: '0',
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  showinfo: 0,
                  modestbranding: 1,
                  loop: 1,
                  playlist: currentTrack.youtubeId
                }
              }}
            />
          </div>
        )}

        {/* Tips Section */}
        <Card className="mt-8 bg-gradient-to-r from-teal-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-2">💡 Tips Relaksasi</h3>
            <ul className="text-sm opacity-90 space-y-1">
              <li>• Duduk atau berbaring dalam posisi yang nyaman</li>
              <li>• Tutup mata dan fokus pada suara yang Anda dengar</li>
              <li>• Bernapas perlahan dan dalam</li>
              <li>• Biarkan pikiran mengalir tanpa menghakimi</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Relaxation;
