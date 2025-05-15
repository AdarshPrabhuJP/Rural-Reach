import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, CloudSun, Tractor, Flower2, Building, MapPin } from "lucide-react";
import WeatherForecast from "@/components/WeatherForecast";
import CropPredictor from "@/components/CropPredictor";
import { useLanguage } from "@/context/LanguageContext";

const agricultureServices = [
  {
    icon: <Tractor className="h-10 w-10" />,
    title: "Real-time Crop Prices",
    description: "Get the latest crop price updates from local mandis in your area to help you make informed decisions about when to sell.",
    link: "https://agmarknet.gov.in/",
    linkText: "Check Mandi Prices"
  },
  {
    icon: <Building className="h-10 w-10" />,
    title: "Government Schemes",
    description: "Information about PM-KISAN, fertilizer subsidies, and other government initiatives that benefit farmers.",
    link: "https://pmkisan.gov.in/",
    linkText: "Check Eligibility"
  },
  {
    icon: <MapPin className="h-10 w-10" />,
    title: "Mandi & Support Centers",
    description: "Locate the nearest agricultural mandis and support centers with contact information and directions.",
    link: "https://agmarknet.gov.in/SearchCmmMkt.aspx",
    linkText: "Find Nearest Mandi"
  }
];

const Agriculture = () => {
  const { translate } = useLanguage();
  
  return (
    <section id="agriculture" className="py-16 px-4 agriculture-bg">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 section-title">AGRICULTURE</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-8">
            {translate('agriculture.description')}
          </p>
        </div>
        
        {/* Weather Forecast and Crop Predictor */}
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <WeatherForecast />
          </div>
          <div className="lg:col-span-1">
            <CropPredictor />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agricultureServices.map((service, index) => (
            <Card key={index} className="bg-background border border-gray-800 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-primary text-2xl mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <a 
                  href={service.link}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline inline-flex items-center"
                >
                  {service.linkText}
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button asChild size="lg">
            <a 
              href="https://agricoop.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Visit Agriculture Ministry Website
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Agriculture;