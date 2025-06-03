
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MoodCheckinProps {
  onComplete: (mood: number, stress: number, energy: number) => void;
  onClose: () => void;
}

const MoodCheckin = ({ onComplete, onClose }: MoodCheckinProps) => {
  const [mood, setMood] = useState(3);
  const [stress, setStress] = useState(3);
  const [energy, setEnergy] = useState(3);

  const handleSubmit = () => {
    onComplete(mood, stress, energy);
  };

  const scaleLabels = {
    mood: ["😢", "😔", "😐", "😊", "😄"],
    stress: ["😌", "🙂", "😐", "😰", "😫"],
    energy: ["😴", "😪", "😐", "😊", "⚡"]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Check-in Harian</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Bagaimana perasaanmu hari ini?
            </label>
            <div className="flex justify-between">
              {scaleLabels.mood.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setMood(index + 1)}
                  className={`p-2 rounded-lg text-2xl transition-all ${
                    mood === index + 1
                      ? "bg-blue-100 scale-110"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Seberapa stres kamu hari ini?
            </label>
            <div className="flex justify-between">
              {scaleLabels.stress.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setStress(index + 1)}
                  className={`p-2 rounded-lg text-2xl transition-all ${
                    stress === index + 1
                      ? "bg-red-100 scale-110"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Bagaimana tingkat energimu?
            </label>
            <div className="flex justify-between">
              {scaleLabels.energy.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => setEnergy(index + 1)}
                  className={`p-2 rounded-lg text-2xl transition-all ${
                    energy === index + 1
                      ? "bg-green-100 scale-110"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Simpan Check-in
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodCheckin;
