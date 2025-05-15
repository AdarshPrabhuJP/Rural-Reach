import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Ambulance, Hospital, Shield } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface EmergencyContactsProps {
  className?: string;
}

const EmergencyContacts = ({ className = "" }: EmergencyContactsProps) => {
  const { translate } = useLanguage();

  const emergencyNumbers = [
    {
      name: "National Emergency Number",
      number: "112",
      icon: <Phone className="h-5 w-5 text-red-500" />
    },
    {
      name: "Ambulance",
      number: "108",
      icon: <Ambulance className="h-5 w-5 text-red-500" />
    },
    {
      name: "Police",
      number: "100",
      icon: <Shield className="h-5 w-5 text-blue-500" />
    },
    {
      name: "Women Helpline",
      number: "181",
      icon: <Phone className="h-5 w-5 text-pink-500" />
    },
    {
      name: "Child Helpline",
      number: "1098",
      icon: <Phone className="h-5 w-5 text-yellow-500" />
    },
    {
      name: "COVID-19 Helpline",
      number: "1075",
      icon: <Hospital className="h-5 w-5 text-green-500" />
    }
  ];

  return (
    <Card className={`${className} bg-background border border-gray-800`}>
      <CardHeader>
        <CardTitle className="text-lg">Emergency Contact Numbers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {emergencyNumbers.map((contact, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-md hover:bg-primary/10 transition-colors">
              <div className="flex-shrink-0">
                {contact.icon}
              </div>
              <div className="flex-grow">
                <div className="text-sm font-medium">{contact.name}</div>
                <div className="text-xs text-muted-foreground">{contact.number}</div>
              </div>
              <a 
                href={`tel:${contact.number}`} 
                className="flex-shrink-0 p-2 bg-background rounded-full hover:bg-primary/20 transition-colors"
                aria-label={`Call ${contact.name}`}
              >
                <Phone className="h-4 w-4 text-primary" />
              </a>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyContacts;