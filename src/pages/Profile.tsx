
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Bell, Shield, Moon, Sun, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "Pengguna",
    email: "user@example.com",
    language: "id",
    theme: "light",
    notifications: true,
    crisisAlerts: true
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    // Simulate saving profile
    alert("Profil berhasil disimpan!");
  };

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      // Simulate logout
      window.location.href = "/";
    }
  };

  const handleDeleteData = () => {
    if (confirm("Apakah Anda yakin ingin menghapus semua data sesi? Tindakan ini tidak dapat dibatalkan.")) {
      alert("Data sesi berhasil dihapus.");
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Kelola Profil</h1>
              <p className="text-sm text-gray-600">Pengaturan akun dan preferensi</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Informasi Profil</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Nama
              </Label>
              <input
                id="name"
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <Label htmlFor="language" className="text-sm font-medium text-gray-700">
                Bahasa
              </Label>
              <select
                id="language"
                value={profile.language}
                onChange={(e) => setProfile({...profile, language: e.target.value})}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Preferensi Aplikasi</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-gray-600" />
                <div>
                  <Label className="text-sm font-medium text-gray-900">
                    Notifikasi
                  </Label>
                  <p className="text-xs text-gray-600">
                    Terima pengingat sesi dan tips kesehatan mental
                  </p>
                </div>
              </div>
              <Switch
                checked={profile.notifications}
                onCheckedChange={(checked) => setProfile({...profile, notifications: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-gray-600" />
                <div>
                  <Label className="text-sm font-medium text-gray-900">
                    Peringatan Krisis
                  </Label>
                  <p className="text-xs text-gray-600">
                    Aktifkan deteksi otomatis untuk situasi darurat
                  </p>
                </div>
              </div>
              <Switch
                checked={profile.crisisAlerts}
                onCheckedChange={(checked) => setProfile({...profile, crisisAlerts: checked})}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {profile.theme === "light" ? (
                  <Sun className="h-5 w-5 text-gray-600" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600" />
                )}
                <div>
                  <Label className="text-sm font-medium text-gray-900">
                    Tema Gelap
                  </Label>
                  <p className="text-xs text-gray-600">
                    Gunakan tampilan gelap untuk kenyamanan mata
                  </p>
                </div>
              </div>
              <Switch
                checked={profile.theme === "dark"}
                onCheckedChange={(checked) => setProfile({...profile, theme: checked ? "dark" : "light"})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Privasi & Keamanan</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">🔒 Komitmen Privasi Kami</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Semua percakapan bersifat anonim dan terenkripsi</li>
                <li>• Data tidak dibagikan kepada pihak ketiga</li>
                <li>• Anda dapat menghapus data kapan saja</li>
                <li>• Riwayat chat otomatis terhapus setelah 30 hari</li>
              </ul>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-red-200 text-red-600 hover:bg-red-50"
              onClick={() => setShowDeleteConfirm(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Hapus Semua Data Sesi
            </Button>

            {showDeleteConfirm && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-900 mb-2">⚠️ Konfirmasi Penghapusan</h4>
                <p className="text-sm text-red-800 mb-3">
                  Semua riwayat percakapan dan data sesi akan dihapus permanen. 
                  Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={handleDeleteData}
                  >
                    Ya, Hapus Data
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Batal
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <Button onClick={handleSave} className="flex-1 bg-blue-500 hover:bg-blue-600">
            Simpan Perubahan
          </Button>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
          >
            Keluar
          </Button>
        </div>

        {/* Support Information */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">Butuh bantuan? Hubungi tim support kami</p>
              <p className="font-medium">support@konselai.com</p>
              <p className="mt-4 text-xs">
                KonselAI v1.0 - Aplikasi Konseling Emosi Gratis & Anonim
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
