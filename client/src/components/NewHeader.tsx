import { useState, useEffect } from "react";
import { Link } from "wouter";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Leaf, Menu, X, Mic, Home, BookOpen, HeartPulse, GraduationCap, Bus, Landmark } from "lucide-react";
import VoiceRecognition from "@/components/VoiceRecognition";
import { useLanguage } from "@/context/LanguageContext";

const NewHeader = () => {
  const { language, setLanguage, translate } = useLanguage();
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleVoiceResult = (transcript: string) => {
    const lowercaseTranscript = transcript.toLowerCase();
    
    // Navigation commands
    if (lowercaseTranscript.includes("go to home") || lowercaseTranscript.includes("home page")) {
      window.location.href = "#";
    } else if (lowercaseTranscript.includes("agriculture") || lowercaseTranscript.includes("farming")) {
      window.location.href = "#agriculture";
    } else if (lowercaseTranscript.includes("healthcare") || lowercaseTranscript.includes("health")) {
      window.location.href = "#healthcare";
    } else if (lowercaseTranscript.includes("education") || lowercaseTranscript.includes("school")) {
      window.location.href = "#education";
    } else if (lowercaseTranscript.includes("transport") || lowercaseTranscript.includes("travel")) {
      window.location.href = "#transport";
    } else if (lowercaseTranscript.includes("finance") || lowercaseTranscript.includes("money")) {
      window.location.href = "#finance";
    }
    
    // Language commands
    else if (lowercaseTranscript.includes("change language to english") || lowercaseTranscript.includes("set english")) {
      setLanguage("english");
    } else if (lowercaseTranscript.includes("change language to hindi") || lowercaseTranscript.includes("set hindi")) {
      setLanguage("hindi");
    } else if (lowercaseTranscript.includes("change language to kannada") || lowercaseTranscript.includes("set kannada")) {
      setLanguage("kannada");
    } else if (lowercaseTranscript.includes("change language to tamil") || lowercaseTranscript.includes("set tamil")) {
      setLanguage("tamil");
    }
    
    setIsVoiceActive(false);
  };

  const handleLanguageChange = (value: string) => {
    const lang = value as 'english' | 'hindi' | 'tamil' | 'kannada' | 'bengali' | 'telugu';
    setLanguage(lang);
    // No page reload needed as we're using React context
  };

  const navItems = [
    { href: "#", label: "home", icon: <Home className="h-4 w-4 mr-1" /> },
    { href: "#agriculture", label: "agriculture", icon: <Leaf className="h-4 w-4 mr-1" /> },
    { href: "#healthcare", label: "healthcare", icon: <HeartPulse className="h-4 w-4 mr-1" /> },
    { href: "#education", label: "education", icon: <GraduationCap className="h-4 w-4 mr-1" /> },
    { href: "#transport", label: "transport", icon: <Bus className="h-4 w-4 mr-1" /> },
    { href: "#finance", label: "finance", icon: <Landmark className="h-4 w-4 mr-1" /> }
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-green-950/90 backdrop-blur-md shadow-md" : "bg-green-950"}`}>
        <div className="relative">
          {/* Background Design Elements */}
          <div className="absolute left-0 top-0 h-full w-1/4 overflow-hidden">
            <div className="absolute left-0 top-0 h-20 w-20 -translate-x-1/2 translate-y-1/4">
              <Leaf className="h-full w-full text-lime-500/30" />
            </div>
            <div className="absolute left-16 top-1 h-6 w-6">
              <Leaf className="h-full w-full text-lime-300/40" />
            </div>
            <div className="absolute left-32 top-10 h-4 w-4">
              <Leaf className="h-full w-full text-lime-400/40 rotate-45" />
            </div>
          </div>
          
          <div className="absolute right-0 top-0 h-full w-1/4 overflow-hidden">
            <div className="absolute right-10 top-2 h-16 w-16">
              <svg viewBox="0 0 100 100" className="text-lime-500/20">
                <path d="M20,80 Q50,20 80,80" stroke="currentColor" fill="none" strokeWidth="8" />
                <path d="M30,70 Q50,30 70,70" stroke="currentColor" fill="none" strokeWidth="5" />
                <path d="M40,60 Q50,40 60,60" stroke="currentColor" fill="none" strokeWidth="3" />
              </svg>
            </div>
          </div>
          
          {/* Main Header Content */}
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              {/* Logo and Brand */}
              <Link href="/" className="flex items-center gap-2">
                <div className="relative h-12 w-12 bg-lime-500 rounded-full flex items-center justify-center">
                  <Leaf className="h-7 w-7 text-green-950" />
                  <div className="absolute inset-0 rounded-full border-2 border-lime-300 blur-[1px]"></div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-2xl font-serif font-bold text-lime-300">Rural Reach</h1>
                  <p className="text-xs text-lime-400/70 tracking-wider -mt-1">Empowering Rural Communities</p>
                </div>
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                <nav className="flex items-center">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="px-3 py-2 text-lime-300 hover:text-white hover:bg-green-900/50 rounded-md transition-colors flex items-center mx-1 text-sm font-medium"
                    >
                      {item.icon}
                      {translate(item.label)}
                    </a>
                  ))}
                </nav>
              </div>
              
              {/* Controls */}
              <div className="flex items-center space-x-2">
                {/* Voice Assistant Button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-9 w-9 rounded-full ${isVoiceActive ? 'bg-red-500/20 text-red-500' : 'text-lime-300 hover:text-white hover:bg-green-800/50'}`}
                  onClick={() => setIsVoiceActive(!isVoiceActive)}
                >
                  <Mic className="h-5 w-5" />
                </Button>
                
                {/* Language Selector */}
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-[130px] bg-green-900/50 text-lime-200 border-green-800 hover:bg-green-800 hover:border-green-700 focus:ring-lime-400">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent className="bg-green-900 border-green-800">
                    <SelectItem value="english" className="text-lime-200 focus:bg-green-800 focus:text-white">English</SelectItem>
                    <SelectItem value="hindi" className="text-lime-200 focus:bg-green-800 focus:text-white">हिंदी</SelectItem>
                    <SelectItem value="kannada" className="text-lime-200 focus:bg-green-800 focus:text-white">ಕನ್ನಡ</SelectItem>
                    <SelectItem value="tamil" className="text-lime-200 focus:bg-green-800 focus:text-white">தமிழ்</SelectItem>
                    <SelectItem value="bengali" className="text-lime-200 focus:bg-green-800 focus:text-white">বাংলা</SelectItem>
                    <SelectItem value="telugu" className="text-lime-200 focus:bg-green-800 focus:text-white">తెలుగు</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-lime-300 hover:text-white hover:bg-green-800/50"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                  {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-green-900 border-t border-green-800">
            <div className="container mx-auto px-4 py-2">
              <nav className="flex flex-col">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="px-4 py-3 text-lime-300 hover:text-white hover:bg-green-800/50 rounded-md transition-colors flex items-center"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {item.icon}
                    <span className="ml-2">{translate(item.label)}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>
      
      {/* Voice Recognition Component */}
      {isVoiceActive && (
        <div className="fixed top-20 right-4 z-50 bg-green-950 border border-lime-700 shadow-lg rounded-lg p-4 w-80">
          <VoiceRecognition
            onResult={handleVoiceResult}
            locale={language === 'english' ? 'en-US' : language === 'hindi' ? 'hi-IN' : language === 'kannada' ? 'kn-IN' : 'en-US'}
            placeholder={`${translate('voice.listening')}...`}
          />
        </div>
      )}
    </>
  );
};

export default NewHeader;