import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, AlertTriangle, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CounselorSelection from "@/components/CounselorSelection";
import { checkFreeTrialStatus, formatTrialRemainingTime } from "@/utils/freeTrialChecker";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Counselor {
  id: string;
  name: string;
  photo: string;
  specialization: string;
  status: 'online' | 'offline';
}

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Halo! Aku di sini untuk membantu. Apa yang kamu rasakan hari ini? 😊",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [showCounselorSelection, setShowCounselorSelection] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check free trial status
  const getCurrentUser = () => {
    const currentUser = localStorage.getItem('konselai_current_user');
    return currentUser ? JSON.parse(currentUser) : null;
  };

  const user = getCurrentUser();
  const trialStatus = user ? checkFreeTrialStatus(user.registeredAt) : { isActive: false, daysLeft: 0 };

  const crisisKeywords = ["bunuh diri", "mengakhiri hidup", "tidak ingin hidup", "sakit hati", "menyakiti diri", "putus asa"];
  
  const aiResponses = [
    "Sepertinya kamu sedang stres. Ceritakan lebih banyak tentang apa yang kamu rasakan!",
    "Itu pasti sulit untuk kamu. Apa yang bisa aku bantu untuk membuatmu merasa lebih baik?",
    "Kamu hebat karena mau berbagi perasaanmu! Mau coba latihan pernapasan bersama?",
    "Terima kasih sudah mempercayaiku. Mari kita cari cara untuk mengatasi perasaan ini.",
    "Perasaan seperti itu wajar kok. Yang penting kamu tidak sendirian. Aku di sini untukmu.",
    "Coba ceritakan lebih detail tentang situasi yang membuatmu merasa seperti ini?",
    "Kamu sudah sangat berani dengan mengakui perasaanmu. Itu langkah pertama yang bagus!",
    "Mari kita fokus pada hal-hal kecil yang bisa kita kontrol hari ini. Apa satu hal yang bisa membuatmu sedikit lebih baik?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkForCrisis = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return crisisKeywords.some(keyword => lowerText.includes(keyword));
  };

  const handleSelectCounselor = (counselor: Counselor) => {
    setSelectedCounselor(counselor);
    // Save counselor selection to localStorage
    localStorage.setItem('konselai_selected_counselor', JSON.stringify(counselor));
  };

  const handleStartCounseling = () => {
    if (!trialStatus.isActive) {
      navigate('/counseling-packages');
      return;
    }
    
    if (selectedCounselor) {
      setShowCounselorSelection(false);
      // Start counseling session
      const welcomeMessage: Message = {
        id: messages.length + 1,
        text: `Halo! Saya ${selectedCounselor.name}, konselor spesialis ${selectedCounselor.specialization}. Saya siap membantu Anda hari ini. Bagaimana perasaan Anda saat ini?`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, welcomeMessage]);
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Check for crisis keywords
    if (checkForCrisis(inputText)) {
      setShowCrisisAlert(true);
      const crisisResponse: Message = {
        id: messages.length + 2,
        text: "Aku khawatir dengan apa yang kamu katakan. Sepertinya kamu membutuhkan bantuan segera. Mari hubungi profesional yang bisa membantumu lebih baik.",
        isUser: false,
        timestamp: new Date()
      };
      setTimeout(() => {
        setMessages(prev => [...prev, crisisResponse]);
      }, 1000);
    } else {
      // Normal AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: messages.length + 2,
          text: selectedCounselor 
            ? `Terima kasih sudah berbagi. Sebagai konselor spesialis ${selectedCounselor.specialization}, saya memahami perasaan Anda. ${aiResponses[Math.floor(Math.random() * aiResponses.length)]}`
            : aiResponses[Math.floor(Math.random() * aiResponses.length)],
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }

    setInputText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (showCrisisAlert) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg border-red-200">
          <CardContent className="p-6 text-center">
            <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            
            <h2 className="text-xl font-bold text-red-900 mb-4">
              Kami Peduli Denganmu
            </h2>
            
            <p className="text-gray-700 mb-6">
              Kami mendeteksi kamu mungkin membutuhkan bantuan segera. 
              Kamu tidak sendirian, dan ada bantuan yang tersedia.
            </p>

            <div className="space-y-3 mb-6">
              <a 
                href="tel:119" 
                className="flex items-center justify-center space-x-2 bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>Hubungi Hotline Krisis: 119</span>
              </a>
              
              <a 
                href="tel:021-7256526" 
                className="flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>SEJIWA: 021-7256526</span>
              </a>
            </div>

            <div className="text-sm text-gray-600 mb-4">
              <p>• Hotline tersedia 24/7</p>
              <p>• Semua pembicaraan bersifat rahasia</p>
              <p>• Konselor profesional siap membantu</p>
            </div>

            <div className="flex space-x-3">
              <Link to="/" className="flex-1">
                <Button variant="outline" className="w-full">
                  Kembali ke Beranda
                </Button>
              </Link>
              <Button 
                onClick={() => setShowCrisisAlert(false)}
                className="flex-1"
              >
                Lanjut Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                <h1 className="text-lg font-semibold text-gray-900">Sesi Konseling</h1>
                <p className="text-sm text-gray-600">
                  {selectedCounselor ? `Dengan ${selectedCounselor.name}` : 'AI Counselor siap membantu'}
                </p>
              </div>
            </div>
            
            {/* Free Trial Status */}
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <Badge variant={trialStatus.isActive ? "default" : "destructive"}>
                {trialStatus.isActive 
                  ? `Gratis: ${formatTrialRemainingTime(trialStatus.daysLeft)}`
                  : 'Masa gratis berakhir'
                }
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-4 h-[calc(100vh-120px)] flex flex-col">
        {/* Counselor Selection */}
        {showCounselorSelection && (
          <Card className="mb-4">
            <CardContent className="p-6">
              <CounselorSelection 
                onSelectCounselor={handleSelectCounselor}
                selectedCounselor={selectedCounselor}
              />
              
              <div className="mt-6 flex justify-center">
                <Button 
                  onClick={handleStartCounseling}
                  disabled={!selectedCounselor}
                  className="bg-blue-500 hover:bg-blue-600"
                  size="lg"
                >
                  {trialStatus.isActive ? 'Mulai Konseling Gratis' : 'Lihat Paket Konseling'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.isUser
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800 shadow-sm border"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.isUser ? "text-blue-100" : "text-gray-500"
                }`}>
                  {message.timestamp.toLocaleTimeString("id-ID", { 
                    hour: "2-digit", 
                    minute: "2-digit" 
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        {!showCounselorSelection && (
          <div className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pesan atau ceritakan perasaanmu..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
              <span>💡 Semua percakapan bersifat rahasia dan anonim</span>
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-xs">
                  Akhiri Sesi
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
