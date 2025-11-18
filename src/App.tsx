import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Tools from "./pages/Tools";
import SpinWheelPage from "./pages/SpinWheelPage";
import NumberGeneratorPage from "./pages/NumberGeneratorPage";
import NamePickerPage from "./pages/NamePickerPage";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/page/:page" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/spin-wheel" element={<SpinWheelPage />} />
            <Route path="/number-generator" element={<NumberGeneratorPage />} />
            <Route path="/name-picker" element={<NamePickerPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
