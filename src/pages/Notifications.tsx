
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bell, CheckCircle, AlertCircle, Heart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: number;
  type: "reminder" | "tip" | "achievement" | "system";
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "reminder",
      title: "Waktunya Check-in Harian",
      message: "Bagaimana perasaanmu hari ini? Luangkan 5 menit untuk refleksi diri.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isRead: false
    },
    {
      id: 2,
      type: "tip",
      title: "Tip Kesehatan Mental",
      message: "Cobalah teknik grounding 5-4-3-2-1: Sebutkan 5 hal yang bisa kamu lihat, 4 hal yang bisa kamu sentuh, 3 hal yang bisa kamu dengar, 2 hal yang bisa kamu cium, dan 1 hal yang bisa kamu rasakan.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isRead: false
    },
    {
      id: 3,
      type: "achievement",
      title: "Pencapaian Baru! 🎉",
      message: "Selamat! Kamu telah menyelesaikan 5 sesi konseling. Konsistensi adalah kunci!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      isRead: true
    },
    {
      id: 4,
      type: "reminder",
      title: "Latihan Pernapasan",
      message: "Ingat untuk melakukan latihan pernapasan yang sudah kamu pelajari kemarin.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isRead: true
    },
    {
      id: 5,
      type: "system",
      title: "Fitur Baru Tersedia",
      message: "Cek fitur mood tracking yang baru untuk memantau progress kesehatan mentalmu!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      isRead: true
    }
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder": return <Clock className="h-5 w-5 text-blue-500" />;
      case "tip": return <Heart className="h-5 w-5 text-green-500" />;
      case "achievement": return <CheckCircle className="h-5 w-5 text-yellow-500" />;
      case "system": return <AlertCircle className="h-5 w-5 text-purple-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "reminder": return "border-l-blue-500 bg-blue-50";
      case "tip": return "border-l-green-500 bg-green-50";
      case "achievement": return "border-l-yellow-500 bg-yellow-50";
      case "system": return "border-l-purple-500 bg-purple-50";
      default: return "border-l-gray-500 bg-gray-50";
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - timestamp.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} menit yang lalu`;
    } else if (diffInHours < 24) {
      return `${diffInHours} jam yang lalu`;
    } else {
      return `${diffInDays} hari yang lalu`;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Notifikasi</h1>
                <p className="text-sm text-gray-600">
                  {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : "Semua notifikasi sudah dibaca"}
                </p>
              </div>
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                Tandai Semua Dibaca
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Belum Ada Notifikasi
              </h3>
              <p className="text-gray-600">
                Notifikasi akan muncul di sini ketika ada update atau pengingat untuk kamu.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card 
                key={notification.id}
                className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${
                  getNotificationColor(notification.type)
                } ${!notification.isRead ? 'shadow-md' : 'opacity-75'}`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {notification.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {!notification.isRead && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              Baru
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Notification Settings */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Pengaturan Notifikasi</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Pengingat Harian</h4>
                  <p className="text-sm text-gray-600">Terima pengingat untuk check-in dan latihan</p>
                </div>
                <Button variant="outline" size="sm">
                  <Link to="/profile">Atur</Link>
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Tips Kesehatan Mental</h4>
                  <p className="text-sm text-gray-600">Dapatkan tips dan motivasi harian</p>
                </div>
                <Button variant="outline" size="sm">
                  <Link to="/profile">Atur</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;
