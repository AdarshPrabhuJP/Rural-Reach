import { Button } from "@/components/ui/button";
import { Volume2, Mic } from "lucide-react";
import TextToSpeech from "@/components/TextToSpeech";
import VoiceRecognition from "@/components/VoiceRecognition";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";

const Hero = () => {
  const { translate, language } = useLanguage();
  const [voiceCommand, setVoiceCommand] = useState("");
  
  // Get speech locale based on the selected language
  const getSpeechLocale = () => {
    switch (language) {
      case 'hindi': return 'hi-IN';
      case 'tamil': return 'ta-IN';
      case 'kannada': return 'kn-IN';
      case 'bengali': return 'bn-IN';
      case 'telugu': return 'te-IN';
      default: return 'en-IN';
    }
  };
  
  // Handle voice command
  const handleVoiceResult = (transcript: string) => {
    setVoiceCommand(transcript);
    
    // Simple voice navigation
    const lowerTranscript = transcript.toLowerCase();
    
    if (lowerTranscript.includes('agriculture') || lowerTranscript.includes('farm')) {
      window.location.href = '#agriculture';
    } else if (lowerTranscript.includes('health') || lowerTranscript.includes('medical')) {
      window.location.href = '#healthcare';
    } else if (lowerTranscript.includes('education') || lowerTranscript.includes('school')) {
      window.location.href = '#education';
    } else if (lowerTranscript.includes('transport') || lowerTranscript.includes('travel')) {
      window.location.href = '#transport';
    } else if (lowerTranscript.includes('finance') || lowerTranscript.includes('money')) {
      window.location.href = '#finance';
    } else if (lowerTranscript.includes('contact') || lowerTranscript.includes('help')) {
      window.location.href = '#contact';
    }
  };
  
  // Generate content for text to speech
  const getPageContentForSpeech = () => {
    return `${translate('hero.title')}. ${translate('hero.description')}. 
    This website provides information about Agriculture, Healthcare, Education, Transport, and Finance 
    services for rural communities in India. Use the voice navigation button to navigate between sections.`;
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {translate('hero.title')}
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              {translate('hero.description')}
            </p>
            
            {/* Accessibility Options */}
            <div className="flex flex-wrap gap-3 mb-8">
              <TextToSpeech 
                text={getPageContentForSpeech()} 
                locale={getSpeechLocale()}
              />
              
              <VoiceRecognition 
                onResult={handleVoiceResult}
                locale={getSpeechLocale()}
                placeholder={translate('voice.navigation')}
              />
              
              {voiceCommand && (
                <div className="w-full mt-2 p-2 bg-primary/10 rounded text-sm">
                  <p className="font-medium">Command heard:</p>
                  <p className="text-muted-foreground">{voiceCommand}</p>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild size="lg">
                <a href="#agriculture">{translate('agriculture')}</a>
              </Button>
              <Button variant="outline" asChild size="lg">
                <a href="#healthcare">{translate('healthcare')}</a>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1594014302883-c5c70187c79d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Rural Indian village with agricultural fields" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
