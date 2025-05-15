import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  Bus, 
  MapPin, 
  Fuel, 
  Phone,
  AlertCircle,
  Train
} from "lucide-react";
import TransportSchedule from "@/components/TransportSchedule";
import { useLanguage } from "@/context/LanguageContext";

const transportServices = [
  {
    icon: <Bus className="h-10 w-10" />,
    title: "Local Transport Schedules",
    description: "Access live schedules for buses and trains serving your area to plan your travel efficiently.",
    link: "https://www.makemytrip.com/bus-tickets/",
    linkText: "View Schedules"
  },
  {
    icon: <Fuel className="h-10 w-10" />,
    title: "Petrol Pump Locator",
    description: "Locate the nearest petrol pumps along with their current fuel prices and operational hours.",
    link: "https://www.petroldieselprice.com/petrol-pumps-in-india",
    linkText: "Find Petrol Pumps"
  },
  {
    icon: <Phone className="h-10 w-10" />,
    title: "Emergency Transport",
    description: "Access emergency transport contact numbers for various situations including medical emergencies.",
    link: "https://www.108ambulanceservices.org/",
    linkText: "Emergency Numbers"
  },
  {
    icon: <AlertCircle className="h-10 w-10" />,
    title: "Road Safety Tips",
    description: "Learn important road safety measures for pedestrians, cyclists, and vehicle passengers.",
    link: "https://morth.nic.in/road-safety",
    linkText: "Safety Guidelines"
  }
];

const Transport = () => {
  const { translate } = useLanguage();
  return (
    <section id="transport" className="py-16 px-4 transport-bg">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 section-title">TRANSPORT</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-8">
            {translate('transport.description')}
          </p>
        </div>
        
        {/* Bus and Train Schedules */}
        <div className="mb-12">
          <TransportSchedule className="w-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {transportServices.map((service, index) => (
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
              href="https://morth.nic.in/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Visit Transport Ministry Website
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Transport;