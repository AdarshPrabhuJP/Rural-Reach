import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mic, Leaf, Droplets, Sun, Calendar, BarChart3, Sprout } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface CropPredictorProps {
  className?: string;
}

type CropPrediction = {
  crop: string;
  secondaryCrops: string[];
  successRate: number;
  soilSuitability: number;
  waterRequirement: number;
  climateSuitability: number;
  growthDuration: number;
  reason: string;
};

const CropPredictor = ({ className = "" }: CropPredictorProps) => {
  const { translate } = useLanguage();
  const [soilType, setSoilType] = useState("");
  const [season, setSeason] = useState("");
  const [predictionResult, setPredictionResult] = useState<CropPrediction | null>(null);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const soilTypes = [
    { value: "clay", label: "Clay" },
    { value: "sandy", label: "Sandy" },
    { value: "loamy", label: "Loamy" },
    { value: "black", label: "Black" },
    { value: "red", label: "Red" },
  ];

  const seasons = [
    { value: "kharif", label: "Kharif (June-October)" },
    { value: "rabi", label: "Rabi (October-March)" },
    { value: "zaid", label: "Zaid (March-June)" },
  ];

  const handleVoiceInput = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Your browser doesn't support speech recognition.");
      return;
    }

    setIsVoiceActive(true);
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      
      if (transcript.includes("clay") || transcript.includes("sandy") || 
          transcript.includes("loamy") || transcript.includes("black") || 
          transcript.includes("red")) {
        
        if (transcript.includes("clay")) setSoilType("clay");
        else if (transcript.includes("sandy")) setSoilType("sandy");
        else if (transcript.includes("loamy")) setSoilType("loamy");
        else if (transcript.includes("black")) setSoilType("black");
        else if (transcript.includes("red")) setSoilType("red");
      }
      
      if (transcript.includes("kharif") || transcript.includes("rabi") || 
          transcript.includes("zaid")) {
        
        if (transcript.includes("kharif")) setSeason("kharif");
        else if (transcript.includes("rabi")) setSeason("rabi");
        else if (transcript.includes("zaid")) setSeason("zaid");
      }
      
      if (transcript.includes("predict") || transcript.includes("recommend") || 
          transcript.includes("suggest")) {
        setTimeout(predictCrop, 500);
      }
      
      setIsVoiceActive(false);
    };
    
    recognition.onend = () => {
      setIsVoiceActive(false);
    };
    
    recognition.onerror = () => {
      setIsVoiceActive(false);
    };
    
    recognition.start();
  };

  const predictCrop = () => {
    if (!soilType || !season) {
      setPredictionResult(null);
      return;
    }
    
    let prediction: CropPrediction;
    
    if (soilType === "clay" && season === "kharif") {
      prediction = {
        crop: "Rice",
        secondaryCrops: ["Jute", "Sugarcane"],
        successRate: 85,
        soilSuitability: 95,
        waterRequirement: 90,
        climateSuitability: 85,
        growthDuration: 120,
        reason: "Clay soil retains water well, making it perfect for paddy cultivation in the monsoon season."
      };
    } else if (soilType === "clay" && season === "rabi") {
      prediction = {
        crop: "Wheat",
        secondaryCrops: ["Mustard", "Gram"],
        successRate: 80,
        soilSuitability: 75,
        waterRequirement: 65,
        climateSuitability: 90,
        growthDuration: 150,
        reason: "Wheat grows well in moderately moist clay soil during winter months with reduced watering needs."
      };
    } else if (soilType === "sandy" && season === "kharif") {
      prediction = {
        crop: "Groundnut",
        secondaryCrops: ["Pearl Millet", "Sesame"],
        successRate: 75,
        soilSuitability: 85,
        waterRequirement: 60,
        climateSuitability: 80,
        growthDuration: 110,
        reason: "Sandy soil's good drainage supports groundnut's need for aeration while monsoon provides adequate moisture."
      };
    } else if (soilType === "sandy" && season === "rabi") {
      prediction = {
        crop: "Chickpea",
        secondaryCrops: ["Cumin", "Coriander"],
        successRate: 70,
        soilSuitability: 75,
        waterRequirement: 50,
        climateSuitability: 85,
        growthDuration: 90,
        reason: "Chickpea thrives in well-drained sandy soil with minimal water requirements during the winter season."
      };
    } else if (soilType === "loamy" && season === "kharif") {
      prediction = {
        crop: "Cotton",
        secondaryCrops: ["Soybean", "Maize"],
        successRate: 90,
        soilSuitability: 95,
        waterRequirement: 75,
        climateSuitability: 90,
        growthDuration: 180,
        reason: "Loamy soil provides ideal drainage and nutrient balance for cotton during the monsoon season."
      };
    } else if (soilType === "loamy" && season === "rabi") {
      prediction = {
        crop: "Potato",
        secondaryCrops: ["Tomato", "Peas"],
        successRate: 85,
        soilSuitability: 90,
        waterRequirement: 70,
        climateSuitability: 85,
        growthDuration: 90,
        reason: "Loamy soil's structure allows easy tuber development for potatoes in the cooler rabi season."
      };
    } else if (soilType === "black" && season === "kharif") {
      prediction = {
        crop: "Cotton",
        secondaryCrops: ["Sorghum", "Pigeon Pea"],
        successRate: 88,
        soilSuitability: 90,
        waterRequirement: 70,
        climateSuitability: 85,
        growthDuration: 180,
        reason: "Black soil's high water retention and nutrient content support cotton growth during monsoon."
      };
    } else if (soilType === "black" && season === "rabi") {
      prediction = {
        crop: "Chickpea",
        secondaryCrops: ["Safflower", "Linseed"],
        successRate: 80,
        soilSuitability: 85,
        waterRequirement: 60,
        climateSuitability: 80,
        growthDuration: 100,
        reason: "Black soil retains moisture well for chickpea cultivation during the dry winter season."
      };
    } else if (soilType === "red" && season === "kharif") {
      prediction = {
        crop: "Groundnut",
        secondaryCrops: ["Finger Millet", "Red Gram"],
        successRate: 78,
        soilSuitability: 85,
        waterRequirement: 65,
        climateSuitability: 80,
        growthDuration: 110,
        reason: "Red soil's good drainage supports groundnut cultivation with monsoon rainfall."
      };
    } else if (soilType === "red" && season === "rabi") {
      prediction = {
        crop: "Sorghum",
        secondaryCrops: ["Sunflower", "Safflower"],
        successRate: 75,
        soilSuitability: 80,
        waterRequirement: 55,
        climateSuitability: 75,
        growthDuration: 120,
        reason: "Sorghum can thrive in red soil with limited moisture availability during rabi season."
      };
    } else {
      prediction = {
        crop: "Mixed Pulses",
        secondaryCrops: ["Oilseeds", "Millets"],
        successRate: 65,
        soilSuitability: 70,
        waterRequirement: 60,
        climateSuitability: 75,
        growthDuration: 100,
        reason: "Pulses are adaptable crops that can grow in various soil types with moderate water requirements."
      };
    }
    
    setPredictionResult(prediction);
  };

  return (
    <Card className={`${className} bg-background border border-gray-800`}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Sprout className="h-5 w-5 text-primary" />
          Crop Predictor Tool
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="soil-type">Soil Type</Label>
            <Select value={soilType} onValueChange={setSoilType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select soil type" />
              </SelectTrigger>
              <SelectContent>
                {soilTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="season">Growing Season</Label>
            <Select value={season} onValueChange={setSeason}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select season" />
              </SelectTrigger>
              <SelectContent>
                {seasons.map((season) => (
                  <SelectItem key={season.value} value={season.value}>
                    {season.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={predictCrop} className="flex-1 flex items-center gap-1">
              <Leaf className="h-4 w-4" />
              Predict Best Crops
            </Button>
            <Button 
              variant={isVoiceActive ? "default" : "outline"} 
              size="icon"
              onClick={handleVoiceInput}
              className={isVoiceActive ? "bg-red-500 text-white border-red-500" : ""}
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
          
          {predictionResult && (
            <div className="mt-4 p-4 bg-primary/10 rounded-md">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-primary">
                  {predictionResult.crop}
                </h3>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <BarChart3 className="h-4 w-4" />
                  <span>{predictionResult.successRate}%</span>
                </div>
              </div>
              
              <p className="text-sm mt-1 mb-3">{predictionResult.reason}</p>
              
              {/* Secondary Crops */}
              <div className="mb-3">
                <p className="text-xs text-muted-foreground mb-1">Alternative Crops:</p>
                <div className="flex gap-1 flex-wrap">
                  {predictionResult.secondaryCrops.map((crop, i) => (
                    <span 
                      key={i} 
                      className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Success Rate Gauge */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-muted-foreground">Success Rate:</span>
                  <span className="text-xs font-medium">{predictionResult.successRate}%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-600"
                    style={{ width: `${predictionResult.successRate}%` }}
                  />
                </div>
              </div>
              
              {/* Factors Visual Chart */}
              <div>
                <h4 className="text-sm font-medium mb-2">Key Growing Factors</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1">
                        <Leaf className="h-3 w-3 text-green-500" />
                        <span className="text-xs">Soil Suitability</span>
                      </div>
                      <span className="text-xs font-medium">{predictionResult.soilSuitability}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500"
                        style={{ width: `${predictionResult.soilSuitability}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1">
                        <Sun className="h-3 w-3 text-amber-500" />
                        <span className="text-xs">Climate Suitability</span>
                      </div>
                      <span className="text-xs font-medium">{predictionResult.climateSuitability}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500"
                        style={{ width: `${predictionResult.climateSuitability}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1">
                        <Droplets className="h-3 w-3 text-blue-500" />
                        <span className="text-xs">Water Requirement</span>
                      </div>
                      <span className="text-xs font-medium">{predictionResult.waterRequirement}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500"
                        style={{ width: `${predictionResult.waterRequirement}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-purple-500" />
                        <span className="text-xs">Growth Duration</span>
                      </div>
                      <span className="text-xs font-medium">{predictionResult.growthDuration} days</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500"
                        style={{ width: `${Math.min(100, (predictionResult.growthDuration / 180) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CropPredictor;