import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Book, User, Bell, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MoodCheckin from "@/components/MoodCheckin";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showMoodCheckin, setShowMoodCheckin] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      setIsLoggedIn(true);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.password && formData.name) {
      setIsLoggedIn(true);
    }
  };

  const handleMoodCheckin = (mood: number, stress: number, energy: number) => {
    console.log("Mood Check-in:", { mood, stress, energy });
    setShowMoodCheckin(false);
    // Here you would normally save the data
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-500 rounded-full p-3">
                <Heart className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-blue-900">KonselAI</CardTitle>
            <p className="text-gray-600">Konseling Emosi Gratis & Anonim</p>
          </CardHeader>
          <CardContent>
            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setShowLogin(true)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  showLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-600"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setShowLogin(false)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  !showLogin ? "bg-white text-blue-600 shadow-sm" : "text-gray-600"
                }`}
              >
                Registrasi
              </button>
            </div>

            <form onSubmit={showLogin ? handleLogin : handleRegister} className="space-y-4">
              {!showLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan nama Anda"
                    required
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan email Anda"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan kata sandi"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                {showLogin ? "Login" : "Daftar"}
              </Button>
            </form>

            {!showLogin && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-xs text-yellow-800">
                  <Shield className="inline h-4 w-4 mr-1" />
                  Pengguna di bawah 18 tahun memerlukan persetujuan orang tua.
                </p>
              </div>
            )}

            <div className="mt-6 text-center">
              <button className="text-blue-500 text-sm hover:underline">
                Lupa Kata Sandi?
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {showMoodCheckin && (
        <MoodCheckin 
          onComplete={handleMoodCheckin}
          onClose={() => setShowMoodCheckin(false)}
        />
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 rounded-full p-2">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-blue-900">KonselAI</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="/notifications">
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Selamat datang, {formData.name || "Pengguna"}! 👋
          </h2>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
            <p className="font-medium">💡 Tip Kesehatan Mental Hari Ini</p>
            <p className="text-sm mt-1 opacity-90">
              Luangkan 5 menit untuk bernapas dalam-dalam. Pernapasan yang tenang dapat membantu mengurangi stres dan kecemasan.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link to="/chat">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <MessageCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Mulai Konseling</h3>
                    <p className="text-gray-600 text-sm">Bicara dengan AI counselor yang memahami perasaan Anda</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/education">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <Book className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Konten Edukasi</h3>
                    <p className="text-gray-600 text-sm">Akses artikel dan latihan untuk kesehatan mental</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/journal">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <span className="text-2xl">📝</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Jurnal Emosi</h3>
                    <p className="text-gray-600 text-sm">Catat perasaan harian dan lacak progress emosional</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/relaxation">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-teal-500">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-teal-100 rounded-full p-3">
                    <span className="text-2xl">🎵</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Relaksasi</h3>
                    <p className="text-gray-600 text-sm">Musik dan suara alam untuk menenangkan pikiran</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center justify-center space-y-1"
                onClick={() => setShowMoodCheckin(true)}
              >
                <span className="text-2xl">😊</span>
                <span className="text-sm">Mood Check</span>
              </Button>
              <Link to="/achievements">
                <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1 w-full">
                  <span className="text-2xl">🏆</span>
                  <span className="text-sm">Pencapaian</span>
                </Button>
              </Link>
              <Link to="/chat">
                <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1 w-full">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm">Sesi Darurat</span>
                </Button>
              </Link>
              <Link to="/relaxation">
                <Button variant="outline" className="h-16 flex flex-col items-center justify-center space-y-1 w-full">
                  <span className="text-2xl">🧘</span>
                  <span className="text-sm">Meditasi</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Crisis Hotline */}
        <div className="mt-8 bg-pink-50 border border-pink-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="bg-pink-500 rounded-full p-2">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-pink-900">Butuh Bantuan Segera?</h4>
              <p className="text-sm text-pink-700">
                Hubungi hotline krisis: <span className="font-semibold">119</span> atau 
                <span className="font-semibold"> 021-7256526</span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
