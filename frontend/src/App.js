import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Capability from "@/components/Capability";
import About from "@/components/About";
import Signature from "@/components/Signature";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const LandingPage = () => (
  <div className="min-h-screen bg-[#0A0A0A] text-white antialiased">
    <Header />
    <main>
      <Hero />
      <Services />
      <Capability />
      <Signature />
      <About />
      <Contact />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster theme="dark" position="top-center" richColors />
    </div>
  );
}

export default App;
