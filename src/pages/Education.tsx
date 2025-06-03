
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Clock, BookOpen, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Article {
  id: number;
  title: string;
  category: string;
  duration: string;
  difficulty: "Mudah" | "Sedang" | "Lanjut";
  description: string;
  content: string;
  rating: number;
}

const Education = () => {
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = ["Semua", "Stres", "Kecemasan", "Motivasi", "Relaksasi", "Hubungan"];

  const articles: Article[] = [
    {
      id: 1,
      title: "Teknik Pernapasan 5 Menit untuk Mengatasi Kecemasan",
      category: "Kecemasan",
      duration: "5 menit",
      difficulty: "Mudah",
      description: "Pelajari teknik pernapasan sederhana yang dapat membantu menenangkan pikiran dalam situasi cemas.",
      content: "Teknik pernapasan 4-7-8 adalah salah satu cara paling efektif untuk mengatasi kecemasan...",
      rating: 4.8
    },
    {
      id: 2,
      title: "Memahami dan Mengelola Stres Akademik",
      category: "Stres",
      duration: "10 menit",
      difficulty: "Sedang",
      description: "Tips praktis untuk mengatasi tekanan sekolah dan tugas yang menumpuk.",
      content: "Stres akademik adalah hal yang wajar dialami setiap pelajar...",
      rating: 4.6
    },
    {
      id: 3,
      title: "Meditasi Mindfulness untuk Pemula",
      category: "Relaksasi",
      duration: "15 menit",
      difficulty: "Mudah",
      description: "Panduan langkah demi langkah untuk memulai praktik mindfulness.",
      content: "Mindfulness adalah praktik kesadaran penuh terhadap momen saat ini...",
      rating: 4.9
    },
    {
      id: 4,
      title: "Membangun Rasa Percaya Diri",
      category: "Motivasi",
      duration: "12 menit",
      difficulty: "Sedang",
      description: "Strategi untuk meningkatkan kepercayaan diri dan self-esteem.",
      content: "Kepercayaan diri adalah fondasi penting untuk kesuksesan...",
      rating: 4.7
    },
    {
      id: 5,
      title: "Mengatasi Konflik dalam Pertemanan",
      category: "Hubungan",
      duration: "8 menit",
      difficulty: "Sedang",
      description: "Cara sehat untuk menyelesaikan masalah dengan teman.",
      content: "Konflik dalam pertemanan adalah hal yang normal...",
      rating: 4.5
    },
    {
      id: 6,
      title: "Latihan Gratitude untuk Mood yang Lebih Baik",
      category: "Motivasi",
      duration: "6 menit",
      difficulty: "Mudah",
      description: "Praktik sederhana untuk meningkatkan kebahagiaan sehari-hari.",
      content: "Gratitude atau rasa syukur adalah salah satu cara paling efektif...",
      rating: 4.8
    }
  ];

  const filteredArticles = selectedCategory === "Semua" 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Mudah": return "bg-green-100 text-green-800";
      case "Sedang": return "bg-yellow-100 text-yellow-800";
      case "Lanjut": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-blue-100">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedArticle(null)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Artikel</h1>
                <p className="text-sm text-gray-600">{selectedArticle.category}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-3">{selectedArticle.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{selectedArticle.duration}</span>
                    </div>
                    <Badge className={getDifficultyColor(selectedArticle.difficulty)}>
                      {selectedArticle.difficulty}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{selectedArticle.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-6">{selectedArticle.description}</p>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <h3 className="font-semibold text-blue-900 mb-2">Apa yang akan kamu pelajari:</h3>
                  <ul className="text-blue-800 space-y-1">
                    <li>• Teknik praktis yang mudah diterapkan</li>
                    <li>• Langkah-langkah yang jelas dan terstruktur</li>
                    <li>• Tips untuk konsistensi dalam praktik</li>
                  </ul>
                </div>

                <div className="text-gray-800 leading-relaxed">
                  <h3 className="text-xl font-semibold mb-4">Konten Utama</h3>
                  <p className="mb-4">{selectedArticle.content}</p>
                  
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">Langkah-langkah Praktis:</h4>
                  <ol className="list-decimal list-inside space-y-2 mb-6">
                    <li>Temukan tempat yang tenang dan nyaman</li>
                    <li>Duduk dengan posisi yang rileks</li>
                    <li>Mulai dengan napas normal selama 1-2 menit</li>
                    <li>Terapkan teknik yang telah dijelaskan</li>
                    <li>Lakukan secara konsisten setiap hari</li>
                  </ol>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">💡 Tips Sukses:</h4>
                    <p className="text-green-800">
                      Ingat, praktik ini membutuhkan waktu untuk menunjukkan hasil. 
                      Bersabarlah dengan diri sendiri dan lakukan secara konsisten.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
              <h1 className="text-lg font-semibold text-gray-900">Konten Edukasi</h1>
              <p className="text-sm text-gray-600">Artikel dan latihan kesehatan mental</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Kategori</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-blue-500 hover:bg-blue-600" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <Card 
              key={article.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedArticle(article)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge variant="secondary" className="mb-2">
                      {article.category}
                    </Badge>
                    <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
                    <p className="text-sm text-gray-600">{article.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{article.duration}</span>
                    </div>
                    <Badge className={getDifficultyColor(article.difficulty)}>
                      {article.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{article.rating}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-blue-600 hover:underline">
                    Baca Artikel
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Belum ada artikel untuk kategori ini
            </h3>
            <p className="text-gray-600">
              Coba pilih kategori lain atau kembali ke "Semua"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;
