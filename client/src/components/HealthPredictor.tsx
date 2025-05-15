import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  CheckCircle2, 
  BadgeAlert,
  Thermometer,
  Droplets,
  HeartPulse,
  Clock
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface HealthPredictorProps {
  className?: string;
}

const HealthPredictor = ({ className = "" }: HealthPredictorProps) => {
  const { translate } = useLanguage();
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [exposure, setExposure] = useState("");
  const [predictionResult, setPredictionResult] = useState<{
    condition: string;
    severity: "low" | "medium" | "high";
    advice: string;
    icon: JSX.Element;
  } | null>(null);

  const symptomOptions = [
    { value: "headache", label: "Headache" },
    { value: "dizziness", label: "Dizziness" },
    { value: "fatigue", label: "Fatigue or Weakness" },
    { value: "thirst", label: "Extreme Thirst" },
    { value: "confusion", label: "Confusion" },
    { value: "nausea", label: "Nausea" },
    { value: "muscle_cramps", label: "Muscle Cramps" },
    { value: "rapid_heartbeat", label: "Rapid Heartbeat" },
    { value: "heavy_sweating", label: "Heavy Sweating" },
    { value: "no_sweating", label: "Lack of Sweating (despite heat)" },
    { value: "red_skin", label: "Red, Hot, Dry Skin" },
  ];

  const exposureOptions = [
    { value: "heavy", label: "Heavy sun exposure (6+ hours)" },
    { value: "moderate", label: "Moderate sun exposure (3-6 hours)" },
    { value: "light", label: "Light sun exposure (less than 3 hours)" },
    { value: "dehydration", label: "No water for several hours" },
    { value: "physical_labor", label: "Physical labor outdoors" },
  ];

  const handleSymptomChange = (value: string) => {
    if (symptoms.includes(value)) {
      setSymptoms(symptoms.filter(s => s !== value));
    } else {
      setSymptoms([...symptoms, value]);
    }
  };

  const predictCondition = () => {
    // Logic to determine heat-related illness based on symptoms and exposure
    if (symptoms.length === 0 || !exposure) {
      setPredictionResult(null);
      return;
    }

    // Check for heat stroke (most severe)
    if (
      (symptoms.includes("no_sweating") || symptoms.includes("red_skin")) && 
      symptoms.includes("confusion") && 
      (exposure === "heavy" || exposure === "physical_labor")
    ) {
      setPredictionResult({
        condition: "Heat Stroke",
        severity: "high",
        advice: "EMERGENCY! Cool the person immediately. Move to shade, apply cool water, and seek medical help right away.",
        icon: <BadgeAlert className="h-6 w-6 text-red-500" />
      });
      return;
    }

    // Check for heat exhaustion
    if (
      (symptoms.includes("heavy_sweating") || symptoms.includes("fatigue")) && 
      (symptoms.includes("headache") || symptoms.includes("dizziness") || symptoms.includes("nausea")) &&
      (exposure === "moderate" || exposure === "heavy")
    ) {
      setPredictionResult({
        condition: "Heat Exhaustion",
        severity: "medium",
        advice: "Rest in a cool place, drink water slowly, and use cool compresses. Seek medical help if symptoms worsen.",
        icon: <Thermometer className="h-6 w-6 text-orange-500" />
      });
      return;
    }

    // Check for dehydration
    if (
      symptoms.includes("thirst") && 
      (symptoms.includes("fatigue") || symptoms.includes("dizziness")) &&
      (exposure === "dehydration" || exposure === "moderate" || exposure === "heavy")
    ) {
      setPredictionResult({
        condition: "Dehydration",
        severity: "low",
        advice: "Drink water slowly but regularly. Rest in a cool place. Add a pinch of salt to water or drink ORS if available.",
        icon: <Droplets className="h-6 w-6 text-blue-500" />
      });
      return;
    }

    // Default case - mild heat stress
    setPredictionResult({
      condition: "Mild Heat Stress",
      severity: "low",
      advice: "Take a break in the shade, drink water, and monitor for worsening symptoms.",
      icon: <HeartPulse className="h-6 w-6 text-green-500" />
    });
  };

  return (
    <Card className={`${className} bg-background border border-gray-800`}>
      <CardHeader>
        <CardTitle className="text-lg">Heat Illness Predictor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label className="mb-2 block">Select Symptoms (choose all that apply)</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {symptomOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={symptoms.includes(option.value) ? "default" : "outline"}
                  size="sm" 
                  className="justify-start"
                  onClick={() => handleSymptomChange(option.value)}
                >
                  {symptoms.includes(option.value) && (
                    <CheckCircle2 className="h-3.5 w-3.5 mr-2" />
                  )}
                  <span>{option.label}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="exposure">Sun Exposure Level</Label>
            <Select value={exposure} onValueChange={setExposure}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select exposure level" />
              </SelectTrigger>
              <SelectContent>
                {exposureOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={predictCondition} 
            className="w-full"
            disabled={symptoms.length === 0 || !exposure}
          >
            Check Possible Condition
          </Button>
          
          {predictionResult && (
            <div className="mt-4 p-4 bg-primary/10 rounded-md">
              <div className="flex items-center mb-2">
                {predictionResult.icon}
                <h4 className="text-lg font-medium ml-2">{predictionResult.condition}</h4>
              </div>
              <div className="flex items-center mb-3">
                <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                <p className="text-sm">
                  Severity: 
                  <span className={
                    predictionResult.severity === "high" ? "text-red-500 font-bold ml-1" :
                    predictionResult.severity === "medium" ? "text-orange-500 font-bold ml-1" :
                    "text-green-500 font-bold ml-1"
                  }>
                    {predictionResult.severity === "high" ? "High - Seek immediate medical attention" :
                     predictionResult.severity === "medium" ? "Medium - Medical attention recommended" :
                     "Low - Can be managed at home with care"}
                  </span>
                </p>
              </div>
              <p className="text-sm">{predictionResult.advice}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HealthPredictor;