import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, AlertCircle } from 'lucide-react';

interface VoiceRecognitionProps {
  onResult: (transcript: string) => void;
  locale?: string;
  placeholder?: string;
  className?: string;
}

const VoiceRecognition = ({ 
  onResult, 
  locale = 'en-US', 
  placeholder = 'Press to speak',
  className = '' 
}: VoiceRecognitionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setErrorMessage("Your browser doesn't support speech recognition");
      return;
    }
    
    // Initialize speech recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = locale;
    
    // Set up event handlers
    recognition.onstart = () => {
      setIsListening(true);
      setErrorMessage(null);
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setErrorMessage(`Error: ${event.error}`);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.onresult = (event: any) => {
      const resultIndex = event.resultIndex;
      const transcript = event.results[resultIndex][0].transcript;
      
      // If this is a final result (not interim)
      if (event.results[resultIndex].isFinal) {
        onResult(transcript);
      }
    };
    
    recognitionRef.current = recognition;
    
    // Cleanup
    return () => {
      if (recognition && isListening) {
        recognition.stop();
      }
    };
  }, [locale, onResult]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setErrorMessage("Speech recognition not available");
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setErrorMessage('Could not start speech recognition');
      }
    }
  };

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <Button
        variant={isListening ? "default" : "outline"}
        size="sm"
        onClick={toggleListening}
        disabled={!!errorMessage && !isListening}
        className={`gap-1 ${isListening ? 'bg-red-500 hover:bg-red-600' : ''}`}
        title={isListening ? "Stop listening" : "Start voice input"}
      >
        {isListening ? (
          <>
            <MicOff className="h-4 w-4" />
            <span>Stop</span>
          </>
        ) : (
          <>
            <Mic className="h-4 w-4" />
            <span>{placeholder}</span>
          </>
        )}
      </Button>
      
      {errorMessage && (
        <div className="text-xs text-red-500 flex items-center mt-1">
          <AlertCircle className="h-3 w-3 mr-1" />
          <span>{errorMessage}</span>
        </div>
      )}
      
      {isListening && (
        <div className="text-xs text-primary mt-1">Listening...</div>
      )}
    </div>
  );
};

export default VoiceRecognition;