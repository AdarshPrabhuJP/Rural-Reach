import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bus, 
  Train, 
  Clock, 
  MapPin, 
  Search, 
  Calendar, 
  ChevronRight, 
  RefreshCw 
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface TransportScheduleProps {
  className?: string;
}

type BusSchedule = {
  id: string;
  busNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  busType: "regular" | "express" | "deluxe";
  via: string[];
  fare: number;
};

type TrainSchedule = {
  id: string;
  trainNumber: string;
  trainName: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  trainType: "passenger" | "express" | "superfast";
  days: string[];
  fare: number;
};

// Demo data for bus schedules
const demoBusSchedules: BusSchedule[] = [
  {
    id: "b1",
    busNumber: "KA-01-F-5678",
    origin: "DSATM Kagalipura",
    destination: "Majestic",
    departureTime: "06:00",
    arrivalTime: "07:30",
    busType: "express",
    via: ["Kengeri", "Vijayanagar"],
    fare: 60
  },
  {
    id: "b2",
    busNumber: "KA-57-F-1234",
    origin: "DSATM Kagalipura",
    destination: "Mysore",
    departureTime: "07:30",
    arrivalTime: "10:00",
    busType: "deluxe",
    via: ["Bidadi", "Ramanagara", "Channapatna"],
    fare: 180
  },
  {
    id: "b3",
    busNumber: "KA-02-F-9876",
    origin: "DSATM Kagalipura",
    destination: "Electronic City",
    departureTime: "08:15",
    arrivalTime: "09:30",
    busType: "express",
    via: ["Kengeri", "Banashankari"],
    fare: 75
  },
  {
    id: "b4",
    busNumber: "KA-05-F-4321",
    origin: "DSATM Kagalipura",
    destination: "MG Road",
    departureTime: "09:00",
    arrivalTime: "10:45",
    busType: "regular",
    via: ["Kengeri", "Jayanagar", "Lalbagh"],
    fare: 70
  },
  {
    id: "b5",
    busNumber: "KA-09-F-8765",
    origin: "DSATM Kagalipura",
    destination: "Whitefield",
    departureTime: "10:30",
    arrivalTime: "12:15",
    busType: "deluxe",
    via: ["Kengeri", "Jayanagar", "Indiranagar"],
    fare: 95
  }
];

// Demo data for train schedules
const demoTrainSchedules: TrainSchedule[] = [
  {
    id: "t1",
    trainNumber: "16215",
    trainName: "Mysuru Shatabdi",
    origin: "Kengeri",
    destination: "Mysuru",
    departureTime: "06:15",
    arrivalTime: "07:45",
    trainType: "superfast",
    days: ["Daily"],
    fare: 120
  },
  {
    id: "t2",
    trainNumber: "12658",
    trainName: "Chennai Mail",
    origin: "Kengeri",
    destination: "Chennai",
    departureTime: "23:30",
    arrivalTime: "05:45",
    trainType: "superfast",
    days: ["Daily"],
    fare: 480
  },
  {
    id: "t3",
    trainNumber: "16557",
    trainName: "Rajya Rani Express",
    origin: "Kengeri",
    destination: "Coimbatore",
    departureTime: "07:10",
    arrivalTime: "14:40",
    trainType: "express",
    days: ["Tuesday", "Thursday", "Saturday"],
    fare: 320
  },
  {
    id: "t4",
    trainNumber: "56503",
    trainName: "Bengaluru Passenger",
    origin: "Kengeri",
    destination: "Bengaluru City",
    departureTime: "08:25",
    arrivalTime: "09:05",
    trainType: "passenger",
    days: ["Daily"],
    fare: 15
  },
  {
    id: "t5",
    trainNumber: "22679",
    trainName: "KSR Bengaluru - Mysuru Express",
    origin: "Kengeri",
    destination: "Mysuru",
    departureTime: "17:45",
    arrivalTime: "19:30",
    trainType: "express",
    days: ["Daily"],
    fare: 90
  }
];

const TransportSchedule = ({ className = "" }: TransportScheduleProps) => {
  const { translate } = useLanguage();
  const [currentLocation, setCurrentLocation] = useState("DSATM Kagalipura");
  const [destination, setDestination] = useState("");
  const [activeTab, setActiveTab] = useState("bus");
  const [filteredBusSchedules, setFilteredBusSchedules] = useState<BusSchedule[]>(demoBusSchedules);
  const [filteredTrainSchedules, setFilteredTrainSchedules] = useState<TrainSchedule[]>(demoTrainSchedules);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSearch = () => {
    // Filter bus schedules based on destination
    if (activeTab === "bus") {
      if (destination) {
        const filtered = demoBusSchedules.filter(schedule => 
          schedule.destination.toLowerCase().includes(destination.toLowerCase())
        );
        setFilteredBusSchedules(filtered);
      } else {
        setFilteredBusSchedules(demoBusSchedules);
      }
    } 
    // Filter train schedules based on destination
    else {
      if (destination) {
        const filtered = demoTrainSchedules.filter(schedule => 
          schedule.destination.toLowerCase().includes(destination.toLowerCase())
        );
        setFilteredTrainSchedules(filtered);
      } else {
        setFilteredTrainSchedules(demoTrainSchedules);
      }
    }
  };

  const refreshSchedules = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    handleSearch();
  }, [destination, activeTab]);

  const getBusTypeStyle = (type: string) => {
    switch(type) {
      case 'regular':
        return 'bg-blue-500/10 text-blue-500';
      case 'express':
        return 'bg-green-500/10 text-green-500';
      case 'deluxe':
        return 'bg-purple-500/10 text-purple-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getTrainTypeStyle = (type: string) => {
    switch(type) {
      case 'passenger':
        return 'bg-blue-500/10 text-blue-500';
      case 'express':
        return 'bg-green-500/10 text-green-500';
      case 'superfast':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <Card className={`${className} bg-background border border-gray-800`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            {activeTab === "bus" ? (
              <Bus className="h-5 w-5 text-primary" />
            ) : (
              <Train className="h-5 w-5 text-primary" />
            )}
            Transport Schedules
          </CardTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={refreshSchedules} 
            className={`h-8 w-8 ${isRefreshing ? 'animate-spin' : ''}`}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <MapPin className="h-4 w-4" />
            <span>Your location: <strong>{currentLocation}</strong></span>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Enter destination city..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch} size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bus" className="flex items-center gap-2">
              <Bus className="h-4 w-4" />
              <span>Bus</span>
            </TabsTrigger>
            <TabsTrigger value="train" className="flex items-center gap-2">
              <Train className="h-4 w-4" />
              <span>Train</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="bus" className="mt-4">
            {filteredBusSchedules.length > 0 ? (
              <div className="space-y-3">
                {filteredBusSchedules.map((schedule) => (
                  <div key={schedule.id} className="p-3 border border-gray-800 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-base flex items-center gap-1">
                          <span>{schedule.origin}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          <span>{schedule.destination}</span>
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Via: {schedule.via.join(", ")}
                        </p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getBusTypeStyle(schedule.busType)}`}>
                        {schedule.busType.charAt(0).toUpperCase() + schedule.busType.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-sm mt-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Bus Number</span>
                        <span className="font-medium">{schedule.busNumber}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Departure</span>
                        <span className="font-medium flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {schedule.departureTime}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Fare</span>
                        <span className="font-medium">₹{schedule.fare}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button variant="outline" size="sm" className="h-7 px-2 py-0" asChild>
                        <a 
                          href="https://www.redbus.in/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Book Ticket
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No bus schedules found for {destination}. Try another destination.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="train" className="mt-4">
            {filteredTrainSchedules.length > 0 ? (
              <div className="space-y-3">
                {filteredTrainSchedules.map((schedule) => (
                  <div key={schedule.id} className="p-3 border border-gray-800 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-base">{schedule.trainName}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <span>{schedule.origin}</span>
                          <ChevronRight className="h-3 w-3" />
                          <span>{schedule.destination}</span>
                        </p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTrainTypeStyle(schedule.trainType)}`}>
                        {schedule.trainType.charAt(0).toUpperCase() + schedule.trainType.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-sm mt-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Train Number</span>
                        <span className="font-medium">{schedule.trainNumber}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Departure</span>
                        <span className="font-medium flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {schedule.departureTime}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Fare</span>
                        <span className="font-medium">₹{schedule.fare}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        {schedule.days.join(", ")}
                      </div>
                      <Button variant="outline" size="sm" className="h-7 px-2 py-0" asChild>
                        <a 
                          href="https://www.irctc.co.in/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Book Ticket
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No train schedules found for {destination}. Try another destination.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TransportSchedule;