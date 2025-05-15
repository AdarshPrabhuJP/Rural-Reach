import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CloudSun, CloudRain, Sun, Wind } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Mock data for the 3-day weather forecast
const weatherData = [
  {
    day: "Today",
    temp: "32°C",
    condition: "Sunny",
    icon: <Sun className="h-8 w-8 text-yellow-400" />,
    humidity: "60%",
    wind: "12 km/h"
  },
  {
    day: "Tomorrow",
    temp: "30°C",
    condition: "Partly Cloudy",
    icon: <CloudSun className="h-8 w-8 text-blue-400" />,
    humidity: "65%",
    wind: "10 km/h"
  },
  {
    day: "Day After",
    temp: "29°C",
    condition: "Rainy",
    icon: <CloudRain className="h-8 w-8 text-blue-500" />,
    humidity: "75%",
    wind: "15 km/h"
  }
];

interface WeatherForecastProps {
  className?: string;
}

const WeatherForecast = ({ className = "" }: WeatherForecastProps) => {
  const { translate } = useLanguage();
  const [location, setLocation] = useState("Karnataka, IN");

  return (
    <div className={`${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">3-Day Weather Forecast</h3>
        <p className="text-sm text-muted-foreground">{location}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {weatherData.map((day, index) => (
          <Card key={index} className="bg-background border border-gray-800">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">{day.day}</p>
                <span className="text-xl font-bold">{day.temp}</span>
              </div>
              <div className="flex items-center mb-2">
                {day.icon}
                <span className="ml-2">{day.condition}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="mr-3">Humidity: {day.humidity}</span>
                <Wind className="h-3 w-3 mr-1" />
                <span>Wind: {day.wind}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;