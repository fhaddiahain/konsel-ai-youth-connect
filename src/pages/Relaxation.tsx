import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Pause, RotateCcw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import YouTube from "react-youtube";

interface RelaxationTrack {
  id: number;
  title: string;
  description: string;
  duration: string;
  category: string;
  audioUrl?: string;
  youtubeId?: string;
  icon: string;
}

const Relaxation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<RelaxationTrack | null>(null);
  const [volume, setVolume] = useState([70]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const youtubePlayerRef = useRef<any>(null);

  const tracks: RelaxationTrack[] = [
    {
      id: 1,
      title: "Hujan Tenang",
      description: "Suara hujan gerimis yang menenangkan untuk relaksasi",
      duration: "10:00",
      category: "Alam",
      youtubeId: "anqVTtWUZUM",
      icon: "🌧️"
    },
    {
      id: 2,
      title: "Suara Ombak",
      description: "Suara ombak pantai yang damai",
      duration: "15:00",
      category: "Alam",
      youtubeId: "M6S-I1FqGGw",
      icon: "🌊"
    },
    {
      id: 3,
      title: "Angin Alam",
      description: "Suara angin sepoi-sepoi di alam",
      duration: "12:00",
      category: "Alam",
      youtubeId: "kmhBZLd76L0",
      icon: "🍃"
    },
    {
      id: 4,
      title: "Musik Meditasi",
      description: "Musik tenang untuk meditasi dan relaksasi",
      duration: "20:00",
      category: "Musik",
      youtubeId: "FjHGZj2IjBk",
      icon: "🎵"
    },
    {
      id: 5,
      title: "Progressive Muscle Relaxation",
      description: "Relaksasi otot dari ujung kaki hingga kepala",
      duration: "20:00",
      category: "Guided"
    },
    {
      id: 6,
      title: "Musik Piano Lembut",
      description: "Melodi piano klasik yang menenangkan",
      duration: "18:00",
      category: "Musik"
    }
  ];

  const categories = ["Semua", "Alam", "Guided", "Musik"];
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredTracks = selectedCategory === "Semua" 
    ? tracks 
    : tracks.filter(track => track.category === selectedCategory);

  const handlePlayPause = (track: RelaxationTrack) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        youtubePlayerRef.current?.pauseVideo();
      } else {
        youtubePlayerRef.current?.playVideo();
      }
      setIsPlaying(!isPlaying);
    } else {
      // Stop current track and start new one
      if (youtubePlayerRef.current) {
        youtubePlayerRef.current.stopVideo();
      }
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.stopVideo();
    }
    setIsPlaying(false);
    setCurrentTrack(null);
  };

  const onPlayerReady = (event: any) => {
    youtubePlayerRef.current = event.target;
    // Set volume
    youtubePlayerRef.current.setVolume(volume[0]);
    if (isPlaying) {
      youtubePlayerRef.current.playVideo();
    }
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === 1) { // Playing
      setIsPlaying(true);
    } else if (event.data === 2) { // Paused
      setIsPlaying(false);
    } else if (event.data === 0) { // Ended
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    setVolume(newVolume);
    if (youtubePlayerRef.current) {
      youtubePlayerRef.current.setVolume(newVolume[0]);
    }
  };

  const youtubeOpts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Relaksasi & Mindfulness</h1>
              <p className="text-sm text-gray-600">Musik dan suara untuk menenangkan pikiran</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hidden YouTube Player */}
      {currentTrack?.youtubeId && (
        <div style={{ position: 'absolute', left: '-9999px' }}>
          <YouTube
            videoId={currentTrack.youtubeId}
            opts={youtubeOpts}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Current Playing Track */}
        {currentTrack && (
          <Card className="mb-6 border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-lg">Sedang Diputar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{currentTrack.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{currentTrack.title}</h3>
                  <p className="text-sm text-gray-600">{currentTrack.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePlayPause(currentTrack)}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleStop}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 flex items-center space-x-3">
                <Volume2 className="h-4 w-4 text-gray-500" />
                <Slider
                  value={volume}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-gray-500">{volume[0]}%</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Track List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTracks.map((track) => (
            <Card 
              key={track.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                currentTrack?.id === track.id ? 'ring-2 ring-green-500' : ''
              }`}
              onClick={() => handlePlayPause(track)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {track.icon ? (
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                        {track.icon}
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        {currentTrack?.id === track.id && isPlaying ? (
                          <Pause className="h-6 w-6 text-green-600" />
                        ) : (
                          <Play className="h-6 w-6 text-green-600" />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{track.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{track.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-green-600 font-medium">{track.category}</span>
                      <span className="text-xs text-gray-500">{track.duration}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Breathing Exercise Card */}
        <Card className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Latihan Pernapasan 4-7-8</h3>
              <p className="text-blue-100 mb-4">
                Teknik pernapasan yang efektif untuk mengurangi stres dan kecemasan
              </p>
              <div className="space-y-2 text-sm text-blue-100">
                <p>• Tarik napas selama 4 detik</p>
                <p>• Tahan napas selama 7 detik</p>
                <p>• Buang napas selama 8 detik</p>
              </div>
              <Button variant="secondary" className="mt-4">
                Mulai Latihan
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Relaxation;
