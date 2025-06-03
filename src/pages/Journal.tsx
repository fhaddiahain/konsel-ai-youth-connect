
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface JournalEntry {
  id: number;
  date: Date;
  mood: number;
  moodEmoji: string;
  note: string;
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      date: new Date(Date.now() - 86400000),
      mood: 4,
      moodEmoji: "😊",
      note: "Hari ini lumayan baik. Selesai tugas sekolah tepat waktu."
    },
    {
      id: 2,
      date: new Date(Date.now() - 172800000),
      mood: 2,
      moodEmoji: "😔",
      note: "Merasa sedikit down karena hasil ujian tidak sesuai harapan."
    }
  ]);

  const [currentMood, setCurrentMood] = useState(3);
  const [currentNote, setCurrentNote] = useState("");
  const [showAddEntry, setShowAddEntry] = useState(false);

  const moodOptions = [
    { value: 1, emoji: "😢", label: "Sangat Sedih" },
    { value: 2, emoji: "😔", label: "Sedih" },
    { value: 3, emoji: "😐", label: "Biasa Saja" },
    { value: 4, emoji: "😊", label: "Senang" },
    { value: 5, emoji: "😄", label: "Sangat Senang" }
  ];

  const handleAddEntry = () => {
    const selectedMood = moodOptions.find(m => m.value === currentMood);
    if (selectedMood && currentNote.trim()) {
      const newEntry: JournalEntry = {
        id: entries.length + 1,
        date: new Date(),
        mood: currentMood,
        moodEmoji: selectedMood.emoji,
        note: currentNote.trim()
      };
      setEntries([newEntry, ...entries]);
      setCurrentNote("");
      setCurrentMood(3);
      setShowAddEntry(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", { 
      weekday: "long", 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  const getAverageMood = () => {
    if (entries.length === 0) return 0;
    const sum = entries.reduce((acc, entry) => acc + entry.mood, 0);
    return (sum / entries.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-purple-100">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Jurnal Emosi</h1>
                <p className="text-sm text-gray-600">Catat perasaanmu setiap hari</p>
              </div>
            </div>
            <Button onClick={() => setShowAddEntry(true)} className="bg-purple-500 hover:bg-purple-600">
              <Plus className="h-4 w-4 mr-2" />
              Tambah
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600">{entries.length}</div>
                <div className="text-sm text-gray-600">Total Entri</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{getAverageMood()}</div>
                <div className="text-sm text-gray-600">Rata-rata Mood</div>
              </div>
              <div>
                <div className="text-2xl">📈</div>
                <div className="text-sm text-gray-600">Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Entry Form */}
        {showAddEntry && (
          <Card className="mb-6 border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg">Tambah Entri Hari Ini</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bagaimana perasaanmu hari ini?
                  </label>
                  <div className="flex justify-between">
                    {moodOptions.map((mood) => (
                      <button
                        key={mood.value}
                        onClick={() => setCurrentMood(mood.value)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          currentMood === mood.value
                            ? "border-purple-500 bg-purple-50"
                            : "border-gray-200 hover:border-purple-300"
                        }`}
                      >
                        <div className="text-2xl mb-1">{mood.emoji}</div>
                        <div className="text-xs text-gray-600">{mood.label}</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ceritakan apa yang terjadi hari ini
                  </label>
                  <Textarea
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    placeholder="Tulis perasaan atau kejadian yang ingin kamu catat..."
                    className="min-h-20"
                  />
                </div>

                <div className="flex space-x-3">
                  <Button onClick={handleAddEntry} className="bg-purple-500 hover:bg-purple-600">
                    Simpan Entri
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddEntry(false)}>
                    Batal
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Journal Entries */}
        <div className="space-y-4">
          {entries.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Belum Ada Entri Jurnal
                </h3>
                <p className="text-gray-600 mb-4">
                  Mulai catat perasaanmu hari ini untuk melacak progress emosional.
                </p>
                <Button onClick={() => setShowAddEntry(true)} className="bg-purple-500 hover:bg-purple-600">
                  Buat Entri Pertama
                </Button>
              </CardContent>
            </Card>
          ) : (
            entries.map((entry) => (
              <Card key={entry.id} className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{entry.moodEmoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {formatDate(entry.date)}
                        </h3>
                        <div className="text-sm text-gray-500">
                          Mood: {entry.mood}/5
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{entry.note}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;
