import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import Education from "./pages/Education";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Journal from "./pages/Journal";
import Achievements from "./pages/Achievements";
import Relaxation from "./pages/Relaxation";
import SRQ29 from "./pages/SRQ29";
import NotFound from "./pages/NotFound";
import CounselingPackages from "./pages/CounselingPackages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/education" element={<Education />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/relaxation" element={<Relaxation />} />
          <Route path="/srq29" element={<SRQ29 />} />
          <Route path="/counseling-packages" element={<CounselingPackages />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
