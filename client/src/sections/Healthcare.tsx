import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  Building, 
  Syringe, 
  Stethoscope,
  HeartPulse 
} from "lucide-react";
import EmergencyContacts from "@/components/EmergencyContacts";
import NearbyHospitals from "@/components/NearbyHospitals";
import HealthPredictor from "@/components/HealthPredictor";
import { useLanguage } from "@/context/LanguageContext";

const healthcareServices = [
  {
    icon: <Syringe className="h-10 w-10" />,
    title: "Vaccination & Maternal Care",
    description: "Vaccination schedules for children and information about maternal care programs available for expectant mothers.",
    link: "https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=824&lid=220",
    linkText: "Vaccination Info"
  },
  {
    icon: <Stethoscope className="h-10 w-10" />,
    title: "Health Schemes",
    description: "Details about public health schemes like Ayushman Bharat and how to enroll in them for affordable healthcare.",
    link: "https://pmjay.gov.in/",
    linkText: "Check Eligibility"
  },
  {
    icon: <HeartPulse className="h-10 w-10" />,
    title: "Health & Nutrition Tips",
    description: "Guidance on personal hygiene, nutrition, and preventive healthcare practices for overall wellbeing.",
    link: "https://www.nhp.gov.in/healthlyliving/healthy-diet",
    linkText: "View Health Tips"
  }
];

const Healthcare = () => {
  const { translate } = useLanguage();
  
  return (
    <section id="healthcare" className="py-16 px-4 healthcare-bg">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 section-title">HEALTHCARE</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-8">
            {translate('healthcare.description')}
          </p>
        </div>
        
        {/* Health Predictor, Emergency Contacts and Nearby Hospitals */}
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-8">
              <EmergencyContacts />
              <HealthPredictor />
            </div>
          </div>
          <div className="lg:col-span-2">
            <NearbyHospitals className="h-full" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthcareServices.map((service, index) => (
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
              href="https://www.mohfw.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Visit Health Ministry Website
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Healthcare;