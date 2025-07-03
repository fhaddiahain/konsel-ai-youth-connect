
import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CounselingPackages = () => {
  const packages = [
    {
      id: 'basic',
      name: 'Paket Basic',
      price: 'Rp 150.000',
      duration: '7 hari',
      sessions: 3,
      features: [
        '3 sesi konseling (45 menit/sesi)',
        'Chat support 24/7',
        'Akses materi edukasi',
        'Jurnal emosi digital'
      ]
    },
    {
      id: 'premium',
      name: 'Paket Premium',
      price: 'Rp 350.000',
      duration: '30 hari',
      sessions: 8,
      features: [
        '8 sesi konseling (45 menit/sesi)',
        'Chat support 24/7',
        'Akses materi edukasi premium',
        'Jurnal emosi digital',
        'Video call konseling',
        'Psikotes & assessment'
      ],
      popular: true
    },
    {
      id: 'ultimate',
      name: 'Paket Ultimate',
      price: 'Rp 650.000',
      duration: '60 hari',
      sessions: 15,
      features: [
        '15 sesi konseling (45 menit/sesi)',
        'Chat support 24/7',
        'Akses semua materi premium',
        'Jurnal emosi digital',
        'Video call konseling',
        'Psikotes & assessment lengkap',
        'Konsultasi keluarga (2 sesi)',
        'Progress report bulanan'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/chat">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Paket Konseling</h1>
              <p className="text-sm text-gray-600">Pilih paket konseling yang sesuai dengan kebutuhan Anda</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Free Trial Info */}
        <div className="mb-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg p-6 text-white">
          <h2 className="text-xl font-bold mb-2">Masa Gratis Anda Telah Berakhir</h2>
          <p className="opacity-90">
            Terima kasih telah menggunakan KonselAI selama 7 hari gratis. 
            Untuk melanjutkan sesi konseling, silakan pilih paket yang sesuai dengan kebutuhan Anda.
          </p>
        </div>

        {/* Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`relative ${pkg.popular ? 'border-2 border-blue-500' : ''}`}
            >
              {pkg.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500">
                  Paling Populer
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <div className="text-3xl font-bold text-blue-600 mt-2">{pkg.price}</div>
                <p className="text-gray-500">Berlaku {pkg.duration}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900">{pkg.sessions} Sesi</div>
                  <p className="text-sm text-gray-600">Konseling Individual</p>
                </div>

                <div className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full ${pkg.popular ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                  variant={pkg.popular ? 'default' : 'outline'}
                >
                  Pilih Paket
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Support Info */}
        <div className="mt-8 text-center">
          <Card className="bg-gray-50">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Butuh Bantuan Memilih Paket?</h3>
              <p className="text-gray-600 mb-4">
                Tim support kami siap membantu Anda memilih paket yang tepat
              </p>
              <Button variant="outline">
                Hubungi Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CounselingPackages;
