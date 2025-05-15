import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, Globe } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "../context/LanguageContext";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, translate } = useLanguage();
  const [currentLang, setCurrentLang] = useState<string>(language);

  // Update current language display when language context changes
  useEffect(() => {
    setCurrentLang(language);
  }, [language]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  type LanguageOption = {
    value: string;
    label: string;
  };

  const languages: LanguageOption[] = [
    { value: "english", label: "English" },
    { value: "hindi", label: "हिंदी (Hindi)" },
    { value: "tamil", label: "தமிழ் (Tamil)" },
    { value: "kannada", label: "ಕನ್ನಡ (Kannada)" },
    { value: "bengali", label: "বাংলა (Bengali)" },
    { value: "telugu", label: "తెలుగు (Telugu)" },
  ];

  const handleLanguageChange = (value: string) => {
    // Force re-render of the component when language changes
    console.log("Changing language to:", value);
    setCurrentLang(value);
    setLanguage(value as any);
    
    // Reload page to apply language changes (for demo purposes)
    window.location.reload();
  };

  const navLinks = [
    { href: "/", key: "home", onClick: closeMobileMenu },
    { href: "/#agriculture", key: "agriculture", onClick: closeMobileMenu },
    { href: "/#healthcare", key: "healthcare", onClick: closeMobileMenu },
    { href: "/#education", key: "education", onClick: closeMobileMenu },
    { href: "/#transport", key: "transport", onClick: closeMobileMenu },
    { href: "/#finance", key: "finance", onClick: closeMobileMenu },
    { href: "/#contact", key: "contact", onClick: closeMobileMenu },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Rural Reach
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.key}
                href={link.href} 
                className="hover:text-primary transition-colors"
                onClick={link.onClick}
              >
                {translate(link.key)}
              </a>
            ))}
          </nav>
          
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{languages.find(lang => lang.value === language)?.label || 'English'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.value}
                  onClick={() => handleLanguageChange(lang.value)}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          {/* Language Selector for Mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.value}
                  onClick={() => handleLanguageChange(lang.value)}
                >
                  {lang.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden bg-background border-t border-gray-700 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
          {navLinks.map((link) => (
            <a 
              key={link.key}
              href={link.href} 
              className="py-2 hover:text-primary transition-colors"
              onClick={link.onClick}
            >
              {translate(link.key)}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
