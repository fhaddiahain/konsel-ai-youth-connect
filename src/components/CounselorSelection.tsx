
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Counselor {
  id: string;
  name: string;
  photo: string;
  specialization: string;
  status: 'online' | 'offline';
}

const counselors: Counselor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wijaya',
    photo: '/placeholder.svg',
    specialization: 'Kecemasan & Depresi',
    status: 'online'
  },
  {
    id: '2',
    name: 'Psikolog Andi Rahman',
    photo: '/placeholder.svg',
    specialization: 'Konseling Remaja',
    status: 'online'
  },
  {
    id: '3',
    name: 'Dr. Maya Sari',
    photo: '/placeholder.svg',
    specialization: 'Trauma & PTSD',
    status: 'offline'
  },
  {
    id: '4',
    name: 'Konselor Budi Hartono',
    photo: '/placeholder.svg',
    specialization: 'Hubungan & Keluarga',
    status: 'online'
  }
];

interface CounselorSelectionProps {
  onSelectCounselor: (counselor: Counselor) => void;
  selectedCounselor: Counselor | null;
}

const CounselorSelection = ({ onSelectCounselor, selectedCounselor }: CounselorSelectionProps) => {
  const [viewMode, setViewMode] = useState<'dropdown' | 'cards'>('cards');

  const handleCounselorSelect = (counselorId: string) => {
    const counselor = counselors.find(c => c.id === counselorId);
    if (counselor) {
      onSelectCounselor(counselor);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Pilih Konselor</h3>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('cards')}
          >
            Cards
          </Button>
          <Button
            variant={viewMode === 'dropdown' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('dropdown')}
          >
            Dropdown
          </Button>
        </div>
      </div>

      {viewMode === 'dropdown' ? (
        <Select onValueChange={handleCounselorSelect} value={selectedCounselor?.id || ""}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih konselor yang tersedia" />
          </SelectTrigger>
          <SelectContent>
            {counselors.map((counselor) => (
              <SelectItem 
                key={counselor.id} 
                value={counselor.id}
                disabled={counselor.status === 'offline'}
              >
                <div className="flex items-center space-x-3">
                  <img 
                    src={counselor.photo} 
                    alt={counselor.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">{counselor.name}</div>
                    <div className="text-sm text-gray-500">{counselor.specialization}</div>
                  </div>
                  <Badge 
                    variant={counselor.status === 'online' ? 'default' : 'secondary'}
                    className={counselor.status === 'online' ? 'bg-green-500' : ''}
                  >
                    {counselor.status === 'online' ? 'Online' : 'Offline'}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {counselors.map((counselor) => (
            <Card 
              key={counselor.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCounselor?.id === counselor.id ? 'border-blue-500 bg-blue-50' : ''
              } ${counselor.status === 'offline' ? 'opacity-50' : ''}`}
              onClick={() => counselor.status === 'online' && handleCounselorSelect(counselor.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={counselor.photo} 
                    alt={counselor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{counselor.name}</h4>
                    <p className="text-sm text-gray-600">{counselor.specialization}</p>
                    <Badge 
                      variant={counselor.status === 'online' ? 'default' : 'secondary'}
                      className={`mt-1 ${counselor.status === 'online' ? 'bg-green-500' : ''}`}
                    >
                      {counselor.status === 'online' ? 'Online' : 'Offline'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedCounselor && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-lg">Konselor Terpilih</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <img 
                src={selectedCounselor.photo} 
                alt={selectedCounselor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-lg">{selectedCounselor.name}</h4>
                <p className="text-gray-600">{selectedCounselor.specialization}</p>
                <Badge className="bg-green-500 mt-1">Online</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CounselorSelection;
