import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, Pause, VolumeX } from 'lucide-react';

interface TextToSpeechProps {
  text: string;
  locale?: string;
  className?: string;
}

const TextToSpeech = ({ text, locale = 'en-US', className = '' }: TextToSpeechProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Initialize utterance and voice
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const u = new SpeechSynthesisUtterance(text);
      
      // Handle voices loaded
      const loadVoices = () => {
        const voices = synth.getVoices();
        
        // Find a voice for the specified locale, default to the first available
        const voiceForLocale = voices.find(v => v.lang.startsWith(locale.split('-')[0])) || voices[0];
        
        if (voiceForLocale) {
          u.voice = voiceForLocale;
          setVoice(voiceForLocale);
        }
        
        setVoicesLoaded(true);
      };
      
      // Chrome loads voices asynchronously
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
      }
      
      // Try to load voices immediately for other browsers
      loadVoices();
      
      setUtterance(u);
      
      // Cleanup
      return () => {
        synth.cancel();
      };
    }
  }, [text, locale]);

  // Play speech
  const speak = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && utterance) {
      const synth = window.speechSynthesis;
      
      // Cancel any ongoing speech
      synth.cancel();
      
      // Set up event handlers
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      utterance.onpause = () => setIsPaused(true);
      utterance.onresume = () => setIsPaused(false);
      
      // Apply current voice
      if (voice) {
        utterance.voice = voice;
      }
      
      // Speak
      synth.speak(utterance);
    }
  };

  // Pause speech
  const pause = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      
      if (synth.speaking) {
        synth.pause();
        setIsPaused(true);
      }
    }
  };

  // Resume speech
  const resume = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      
      if (synth.paused) {
        synth.resume();
        setIsPaused(false);
      }
    }
  };

  // Stop speech
  const stop = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      
      synth.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  const toggleSpeech = () => {
    if (!isSpeaking) {
      speak();
    } else if (isPaused) {
      resume();
    } else {
      pause();
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleSpeech}
      disabled={!voicesLoaded}
      className={`gap-1 ${className}`}
      title={isSpeaking ? (isPaused ? "Resume" : "Pause") : "Listen to text"}
    >
      {isSpeaking ? (
        isPaused ? (
          <>
            <Volume2 className="h-4 w-4" />
            <span>Resume</span>
          </>
        ) : (
          <>
            <Pause className="h-4 w-4" />
            <span>Pause</span>
          </>
        )
      ) : (
        <>
          <Volume2 className="h-4 w-4" />
          <span>Listen</span>
        </>
      )}
      {!voicesLoaded && <span className="text-xs ml-1">Loading...</span>}
    </Button>
  );
};

export default TextToSpeech;