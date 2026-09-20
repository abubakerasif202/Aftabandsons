import "@/App.css";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Capability from "@/components/Capability";
import About from "@/components/About";
import Signature from "@/components/Signature";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileActions from "@/components/MobileActions";

const LandingPage = () => (
  <div className="min-h-screen bg-[#0A0A0A] pb-28 text-white antialiased lg:pb-0">
    <Header />
    <main id="main-content" tabIndex="-1">
      <Hero />
      <Services />
      <Capability />
      <Signature />
      <About />
      <Contact />
    </main>
    <Footer />
    <MobileActions />
  </div>
);

function App() {
  return (
    <div className="App grain">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <LandingPage />
    </div>
  );
}

export default App;
