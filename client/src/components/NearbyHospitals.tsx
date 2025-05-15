import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, ExternalLink, Navigation } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface NearbyHospitalsProps {
  className?: string;
}

// Sample data for nearby hospitals
const hospitalData = [
  {
    name: "City General Hospital",
    address: "123 Main St, Bangalore, Karnataka",
    distance: "2.3 km",
    phone: "080-2345-6789",
    type: "Government",
    services: ["Emergency", "General Medicine", "Surgery"]
  },
  {
    name: "Mother Teresa Medical Center",
    address: "456 Park Ave, Bangalore, Karnataka",
    distance: "3.5 km",
    phone: "080-3456-7890",
    type: "Private",
    services: ["Emergency", "Cardiology", "Pediatrics"]
  },
  {
    name: "Primary Health Center, Jayanagar",
    address: "789 South End, Bangalore, Karnataka",
    distance: "1.8 km",
    phone: "080-4567-8901",
    type: "Government",
    services: ["Primary Care", "Maternal Health", "Vaccinations"]
  },
  {
    name: "AIIMS Bangalore",
    address: "234 Hospital Road, Bangalore, Karnataka",
    distance: "5.1 km",
    phone: "080-5678-9012",
    type: "Government",
    services: ["Emergency", "All Specialties", "Trauma Center"]
  }
];

const NearbyHospitals = ({ className = "" }: NearbyHospitalsProps) => {
  const { translate } = useLanguage();
  const [locationAccess, setLocationAccess] = useState(false);

  const requestLocation = () => {
    // This would normally use the browser's geolocation API
    // For this demo, we'll just set the state to true
    setLocationAccess(true);
  };

  return (
    <Card className={`${className} bg-background border border-gray-800`}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Nearby Hospitals & Clinics</CardTitle>
        {!locationAccess && (
          <Button variant="outline" size="sm" onClick={requestLocation} className="text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            Use My Location
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {!locationAccess ? (
          <div className="text-center py-6">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-4">
              Grant location access to see hospitals and clinics near you
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {hospitalData.map((hospital, index) => (
              <div key={index} className="p-3 bg-gray-800/50 rounded-md hover:bg-primary/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{hospital.name}</h4>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                    {hospital.distance}
                  </span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mb-2">
                  <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{hospital.address}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mb-3">
                  <Phone className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span>{hospital.phone}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {hospital.services.map((service, idx) => (
                    <span key={idx} className="text-xs bg-gray-800 px-2 py-0.5 rounded">
                      {service}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" asChild className="text-xs flex-1">
                    <a href={`tel:${hospital.phone.replace(/[^0-9]/g, '')}`}>
                      <Phone className="h-3 w-3 mr-1" />
                      Call
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="text-xs flex-1">
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hospital.name + ' ' + hospital.address)}`} target="_blank" rel="noopener noreferrer">
                      <Navigation className="h-3 w-3 mr-1" />
                      Directions
                    </a>
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="text-center mt-4">
              <Button variant="link" size="sm" asChild>
                <a href="https://www.google.com/maps/search/hospitals+near+me" target="_blank" rel="noopener noreferrer" className="text-primary inline-flex items-center">
                  View All Nearby Hospitals
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NearbyHospitals;