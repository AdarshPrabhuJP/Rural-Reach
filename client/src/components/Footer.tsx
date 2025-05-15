import { Link } from "wouter";
import { Headphones, Phone, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/#agriculture", label: "Agriculture" },
    { href: "/#healthcare", label: "Healthcare" },
    { href: "/#education", label: "Education" },
    { href: "/#transport", label: "Transport" },
    { href: "/#finance", label: "Finance" },
    { href: "/#contact", label: "Contact" },
  ];

  const resourceLinks = [
    { href: "https://agricoop.gov.in/", label: "Ministry of Agriculture" },
    { href: "https://www.nhm.gov.in/", label: "National Health Mission" },
    { href: "https://www.education.gov.in/en", label: "Ministry of Education" },
    { href: "https://morth.nic.in/", label: "Ministry of Road Transport" },
    { href: "https://pmjdy.gov.in/", label: "Jan Dhan Yojana" },
    { href: "https://www.india.gov.in/", label: "Government Services" },
  ];

  const legalLinks = [
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Accessibility" },
    { href: "#", label: "Sitemap" },
  ];

  return (
    <footer className="bg-background border-t border-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">GraminSeva</h3>
            <p className="text-muted-foreground mb-6">
              Empowering rural communities with essential information and services to improve quality of life across agriculture, healthcare, education, transport, and finance.
            </p>
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} GraminSeva. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Government Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-bold mb-4">Accessibility</h4>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Volume2 className="h-4 w-4" />
                  <span>Text to Speech</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Headphones className="h-4 w-4" />
                  <span>Audio Guide</span>
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Helpline</h4>
              <a href="tel:18001801551" className="flex items-center text-primary hover:underline">
                <Phone className="h-4 w-4 mr-2" />
                <span>1800-180-1551</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
