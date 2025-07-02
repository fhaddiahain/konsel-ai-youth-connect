
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Brain, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const SRQ29 = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    "Apakah Anda sering merasa sakit kepala?",
    "Apakah nafsu makan Anda berkurang?",
    "Apakah tidur Anda tidak nyenyak?",
    "Apakah Anda mudah takut?",
    "Apakah tangan Anda gemetar?",
    "Apakah Anda merasa tegang, cemas atau khawatir?",
    "Apakah pencernaan Anda terganggu?",
    "Apakah Anda sulit berpikir jernih?",
    "Apakah Anda merasa tidak bahagia?",
    "Apakah Anda lebih sering menangis?",
    "Apakah Anda sulit menikmati kegiatan sehari-hari?",
    "Apakah Anda sulit mengambil keputusan?",
    "Apakah kegiatan sehari-hari Anda terganggu?",
    "Apakah Anda tidak mampu berperan dalam kehidupan?",
    "Apakah Anda kehilangan minat terhadap berbagai hal?",
    "Apakah Anda merasa tidak berharga?",
    "Apakah Anda mempunyai pikiran untuk mengakhiri hidup?",
    "Apakah Anda merasa lelah sepanjang waktu?",
    "Apakah Anda merasa tidak enak di perut?",
    "Apakah Anda mudah lelah?",
    "Apakah ada orang yang mencoba melukai atau menyakiti Anda?",
    "Apakah Anda orang yang jauh lebih penting daripada yang dipikirkan orang lain?",
    "Apakah Anda pernah mengalami hal-hal aneh yang tidak dapat dijelaskan?",
    "Apakah ada orang lain yang dapat mengetahui pikiran Anda?",
    "Apakah ada suara-suara tanpa sumber yang jelas?",
    "Apakah Anda pernah mengalami kejang-kejang?",
    "Apakah ada sesuatu yang mengganggu pikiran Anda?",
    "Apakah Anda merasa malu karena salah satu dari masalah di atas?",
    "Apakah masalah-masalah tersebut mengganggu pekerjaan Anda?"
  ];

  const questionsPerPage = 5;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const startIndex = currentPage * questionsPerPage;
  const endIndex = Math.min(startIndex + questionsPerPage, questions.length);
  const currentQuestions = questions.slice(startIndex, endIndex);

  const progress = ((Object.keys(answers).length) / questions.length) * 100;

  const handleAnswer = (questionIndex: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: value === "ya"
    }));
  };

  const canProceed = currentQuestions.every((_, index) => 
    answers.hasOwnProperty(startIndex + index)
  );

  const isLastPage = currentPage === totalPages - 1;
  const allQuestionsAnswered = Object.keys(answers).length === questions.length;

  const handleNext = () => {
    if (canProceed && !isLastPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleShowResults = () => {
    if (allQuestionsAnswered) {
      setShowResults(true);
      
      // Save test result
      const score = Object.values(answers).filter(answer => answer === true).length;
      const testResult = {
        score,
        totalQuestions: questions.length,
        completedAt: new Date().toISOString(),
        answers
      };
      
      const existingResults = JSON.parse(localStorage.getItem('srq29_results') || '[]');
      existingResults.push(testResult);
      localStorage.setItem('srq29_results', JSON.stringify(existingResults));
      
      toast({
        title: "Tes Selesai",
        description: "Hasil tes SRQ-29 Anda telah tersimpan",
      });
    }
  };

  const getScore = () => {
    return Object.values(answers).filter(answer => answer === true).length;
  };

  const getInterpretation = (score: number) => {
    if (score >= 8) {
      return {
        level: "Tinggi",
        message: "Hasil Anda menunjukkan kemungkinan adanya masalah kesehatan mental yang perlu perhatian. Sangat disarankan untuk berkonsultasi dengan profesional kesehatan mental.",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200"
      };
    } else if (score >= 4) {
      return {
        level: "Sedang",
        message: "Hasil Anda menunjukkan beberapa gejala yang perlu diperhatikan. Disarankan untuk melakukan konseling atau pemeriksaan lebih lanjut.",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200"
      };
    } else {
      return {
        level: "Rendah",
        message: "Hasil Anda menunjukkan kondisi kesehatan mental yang baik. Tetap jaga kesehatan mental dengan pola hidup sehat dan aktivitas positif.",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200"
      };
    }
  };

  if (showResults) {
    const score = getScore();
    const interpretation = getInterpretation(score);
    
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
              <div className="flex items-center space-x-3">
                <Brain className="h-6 w-6 text-indigo-600" />
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">Hasil Tes SRQ-29</h1>
                  <p className="text-sm text-gray-600">Self Reporting Questionnaire</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Results */}
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl">Tes Selesai!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-3xl font-bold text-blue-600 mb-2">
                  Skor Anda: {score} dari {questions.length}
                </h3>
                <p className="text-gray-600">Tingkat Risiko: <span className={`font-semibold ${interpretation.color}`}>{interpretation.level}</span></p>
              </div>

              <div className={`${interpretation.bgColor} ${interpretation.borderColor} border rounded-lg p-4`}>
                <p className={`${interpretation.color} text-sm leading-relaxed`}>
                  {interpretation.message}
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Catatan:</strong> Hasil ini bersifat skrining awal dan tidak menggantikan diagnosis profesional. 
                  Untuk evaluasi yang lebih komprehensif, konsultasikan dengan psikolog atau psikiater.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link to="/chat">
              <Button className="w-full bg-indigo-500 hover:bg-indigo-600" size="lg">
                Konsultasi Sekarang
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full" size="lg">
                Kembali ke Beranda
              </Button>
            </Link>
          </div>

          {/* Additional Resources */}
          <Card className="mt-6">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Sumber Bantuan Lainnya:</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Hotline Kesehatan Mental: <span className="font-semibold">119</span></p>
                <p>• Halo Kemkes: <span className="font-semibold">1500-567</span></p>
                <p>• Sejiwa: <span className="font-semibold">119 ext 8</span></p>
                <p>• LSM Jangan Bunuh Diri: <span className="font-semibold">021-9696-9293</span></p>
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
            <div className="flex items-center space-x-3">
              <Brain className="h-6 w-6 text-indigo-600" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Tes SRQ-29</h1>
                <p className="text-sm text-gray-600">Self Reporting Questionnaire - Halaman {currentPage + 1} dari {totalPages}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="mb-2 flex justify-between text-sm text-gray-600">
          <span>Progress: {Object.keys(answers).length} dari {questions.length} pertanyaan</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Questions */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              Pertanyaan {startIndex + 1} - {endIndex}
            </CardTitle>
            <p className="text-center text-sm text-gray-600">
              Jawab setiap pertanyaan dengan jujur berdasarkan kondisi Anda dalam 30 hari terakhir
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentQuestions.map((question, index) => {
              const questionIndex = startIndex + index;
              return (
                <div key={questionIndex} className="space-y-3">
                  <h3 className="font-medium text-gray-900">
                    {questionIndex + 1}. {question}
                  </h3>
                  <RadioGroup
                    value={answers[questionIndex] === true ? "ya" : answers[questionIndex] === false ? "tidak" : ""}
                    onValueChange={(value) => handleAnswer(questionIndex, value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ya" id={`ya-${questionIndex}`} />
                      <Label htmlFor={`ya-${questionIndex}`} className="cursor-pointer">Ya</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tidak" id={`tidak-${questionIndex}`} />
                      <Label htmlFor={`tidak-${questionIndex}`} className="cursor-pointer">Tidak</Label>
                    </div>
                  </RadioGroup>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentPage === 0}
          >
            Sebelumnya
          </Button>

          <div className="flex space-x-3">
            {!isLastPage ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="bg-indigo-500 hover:bg-indigo-600"
              >
                Selanjutnya
              </Button>
            ) : (
              <Button
                onClick={handleShowResults}
                disabled={!allQuestionsAnswered}
                className="bg-green-500 hover:bg-green-600"
              >
                Lihat Hasil
              </Button>
            )}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>💡 Tips:</strong> Jawab dengan jujur dan sesuai kondisi Anda. 
            Tidak ada jawaban yang benar atau salah, yang penting adalah kesesuaian dengan perasaan Anda.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SRQ29;
