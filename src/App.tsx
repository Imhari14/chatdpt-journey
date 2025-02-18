
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DemoChat from "./pages/demo/Chat";
import DemoGuide from "./pages/demo/Guide";
import DemoVideo from "./pages/demo/Video";
import BusinessDialogue from "./pages/demo/BusinessDialogue";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/demo/chat" element={<DemoChat />} />
          <Route path="/demo/guide" element={<DemoGuide />} />
          <Route path="/demo/video" element={<DemoVideo />} />
          <Route path="/demo/business-dialogue" element={<BusinessDialogue />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
