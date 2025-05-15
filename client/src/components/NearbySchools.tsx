import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, School, GraduationCap, Phone, Clock, Navigation } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface NearbySchoolsProps {
  className?: string;
}

type School = {
  id: number;
  name: string;
  type: "primary" | "secondary" | "college";
  address: string;
  distance: number;
  contactNumber: string;
  timings: string;
};

const demoSchools: School[] = [
  {
    id: 1,
    name: "Delhi Public School",
    type: "primary",
    address: "Near NICE Road, Kengeri, Bangalore - 560060",
    distance: 1.7,
    contactNumber: "080-2271-5678",
    timings: "8:00 AM - 3:30 PM"
  },
  {
    id: 2,
    name: "Presidency School",
    type: "secondary",
    address: "Bangalore Mysore Road, Kengeri, Bangalore - 560060",
    distance: 2.2,
    contactNumber: "080-2273-4567",
    timings: "8:30 AM - 4:30 PM"
  },
  {
    id: 3,
    name: "Dayananda Sagar College of Engineering",
    type: "college",
    address: "Shavige Malleshwara Hills, Kumaraswamy Layout, Bangalore - 560078",
    distance: 4.5,
    contactNumber: "080-2661-2345",
    timings: "9:00 AM - 5:00 PM"
  },
  {
    id: 4,
    name: "BGS National Public School",
    type: "primary",
    address: "BGS Health & Education City, Kengeri, Bangalore - 560060",
    distance: 2.8,
    contactNumber: "080-2278-8912",
    timings: "8:15 AM - 3:00 PM"
  },
  {
    id: 5,
    name: "RV College of Engineering",
    type: "college",
    address: "Mysore Road, Bangalore - 560059",
    distance: 5.3,
    contactNumber: "080-6717-8042",
    timings: "9:30 AM - 4:30 PM"
  }
];

const NearbySchools = ({ className = "" }: NearbySchoolsProps) => {
  const { translate } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  
  const filteredSchools = demoSchools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === null || school.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <Card className={`${className} bg-background border border-gray-800`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <School className="h-5 w-5 text-primary" />
          Nearby Schools & Colleges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <div className="flex gap-2">
            <Button 
              size="sm"
              variant={selectedType === null ? "default" : "outline"}
              onClick={() => setSelectedType(null)}
            >
              All
            </Button>
            <Button 
              size="sm"
              variant={selectedType === "primary" ? "default" : "outline"}
              onClick={() => setSelectedType("primary")}
            >
              Primary
            </Button>
            <Button 
              size="sm"
              variant={selectedType === "secondary" ? "default" : "outline"}
              onClick={() => setSelectedType("secondary")}
            >
              Secondary
            </Button>
            <Button 
              size="sm"
              variant={selectedType === "college" ? "default" : "outline"}
              onClick={() => setSelectedType("college")}
            >
              College
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredSchools.length > 0 ? (
            filteredSchools.map((school) => (
              <div key={school.id} className="p-3 border border-gray-800 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-start gap-2">
                    {school.type === "primary" || school.type === "secondary" ? (
                      <School className="h-5 w-5 text-primary mt-1" />
                    ) : (
                      <GraduationCap className="h-5 w-5 text-primary mt-1" />
                    )}
                    <div>
                      <h3 className="font-medium text-lg">{school.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {school.address}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-primary font-medium">
                    {school.distance} km
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-sm mt-2">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    {school.contactNumber}
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {school.timings}
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button variant="link" size="sm" className="h-6 px-0 py-0 flex items-center gap-1 text-primary">
                    <Navigation className="h-3 w-3" />
                    Get Directions
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No schools or colleges found matching your criteria.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NearbySchools;