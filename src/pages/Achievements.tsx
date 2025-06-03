
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Award, Star, Target, Calendar, MessageCircle, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlocked: boolean;
  unlockedDate?: Date;
}

interface UserStats {
  totalPoints: number;
  level: number;
  chatSessions: number;
  articlesRead: number;
  journalEntries: number;
  daysStreak: number;
}

const Achievements = () => {
  const [userStats] = useState<UserStats>({
    totalPoints: 750,
    level: 3,
    chatSessions: 8,
    articlesRead: 12,
    journalEntries: 5,
    daysStreak: 3
  });

  const [achievements] = useState<Achievement[]>([
    {
      id: 1,
      title: "Langkah Pertama",
      description: "Menyelesaikan sesi konseling pertama",
      icon: "🎯",
      points: 50,
      unlocked: true,
      unlockedDate: new Date(Date.now() - 604800000)
    },
    {
      id: 2,
      title: "Penjelajah Pengetahuan",
      description: "Membaca 10 artikel kesehatan mental",
      icon: "📚",
      points: 100,
      unlocked: true,
      unlockedDate: new Date(Date.now() - 259200000)
    },
    {
      id: 3,
      title: "Konsisten",
      description: "Login selama 7 hari berturut-turut",
      icon: "🔥",
      points: 150,
      unlocked: false
    },
    {
      id: 4,
      title: "Jurnal Master",
      description: "Menulis 10 entri jurnal emosi",
      icon: "✍️",
      points: 100,
      unlocked: false
    },
    {
      id: 5,
      title: "Motivator Diri",
      description: "Menyelesaikan 20 sesi konseling",
      icon: "💪",
      points: 200,
      unlocked: false
    },
    {
      id: 6,
      title: "Zen Master",
      description: "Melakukan latihan relaksasi 15 kali",
      icon: "🧘",
      points: 120,
      unlocked: false
    }
  ]);

  const getLevel = (points: number) => {
    if (points < 200) return 1;
    if (points < 500) return 2;
    if (points < 1000) return 3;
    if (points < 2000) return 4;
    return 5;
  };

  const getPointsToNextLevel = (points: number) => {
    const level = getLevel(points);
    const levelThresholds = [0, 200, 500, 1000, 2000, 5000];
    return level < 5 ? levelThresholds[level] - points : 0;
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-yellow-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Pencapaian</h1>
              <p className="text-sm text-gray-600">Lihat progress dan badge yang sudah kamu raih</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <Card className="mb-6 border-l-4 border-l-yellow-500">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>Status Kamu</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{userStats.totalPoints}</div>
                <div className="text-sm text-gray-600">Total Poin</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">Level {userStats.level}</div>
                <div className="text-sm text-gray-600">
                  {getPointsToNextLevel(userStats.totalPoints) > 0 
                    ? `${getPointsToNextLevel(userStats.totalPoints)} poin lagi` 
                    : "Max Level!"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{userStats.daysStreak}</div>
                <div className="text-sm text-gray-600">Hari Berturut</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{unlockedAchievements.length}/{achievements.length}</div>
                <div className="text-sm text-gray-600">Badge Terbuka</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Stats */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Statistik Aktivitas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-blue-500" />
                  <span>Sesi Konseling</span>
                </div>
                <Badge variant="secondary">{userStats.chatSessions}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Book className="h-5 w-5 text-green-500" />
                  <span>Artikel Dibaca</span>
                </div>
                <Badge variant="secondary">{userStats.articlesRead}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  <span>Entri Jurnal</span>
                </div>
                <Badge variant="secondary">{userStats.journalEntries}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unlocked Achievements */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-green-500" />
              <span>Badge yang Sudah Didapat</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {unlockedAchievements.length === 0 ? (
              <p className="text-gray-600 text-center py-4">
                Belum ada badge yang terbuka. Yuk mulai aktivitas untuk mendapatkan badge pertama!
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unlockedAchievements.map((achievement) => (
                  <div key={achievement.id} className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-green-900">{achievement.title}</h3>
                        <p className="text-sm text-green-700">{achievement.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-green-600">+{achievement.points} poin</span>
                          {achievement.unlockedDate && (
                            <span className="text-xs text-green-600">
                              {achievement.unlockedDate.toLocaleDateString("id-ID")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Locked Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-gray-500" />
              <span>Target Selanjutnya</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lockedAchievements.map((achievement) => (
                <div key={achievement.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 opacity-75">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl grayscale">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-700">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <div className="mt-2">
                        <span className="text-xs text-gray-500">+{achievement.points} poin</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Achievements;
