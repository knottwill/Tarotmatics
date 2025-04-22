import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SpeechRecognitionProps {
  onResult: (transcript: string) => void;
  buttonText?: string;
  compact?: boolean;
}

export default function SpeechRecognition({ 
  onResult, 
  buttonText = "Start Speaking",
  compact = false
}: SpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [visualizerData, setVisualizerData] = useState<number[]>(Array(20).fill(5));
  
  // Controls for the microphone animation
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Start/stop speech recognition
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    
    // For this prototype, we'll simulate speech recognition with a timer
    // In production, this would connect to Speechmatics API
    
    // Start the audio visualization animation
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }
    
    animationIntervalRef.current = setInterval(() => {
      // Generate random audio visualization data
      setVisualizerData(
        Array(20).fill(0).map(() => Math.random() * 50 + 5)
      );
    }, 100);
    
    // Simulate speech recognition completion after a few seconds
    setTimeout(() => {
      const simulatedTranscript = "I want to know about my career prospects for the next six months";
      setTranscript(simulatedTranscript);
      
      // Wait a moment for the user to see the transcript
      setTimeout(() => {
        stopListening();
        onResult(simulatedTranscript);
      }, 1500);
    }, 5000);
  };
  
  const stopListening = () => {
    setIsListening(false);
    
    // Stop animation
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, []);
  
  return (
    <div className={`flex flex-col items-center ${compact ? 'w-full' : 'w-72 h-72'}`}>
      {!compact && (
        <div className="mb-6 relative">
          <div 
            className={`w-32 h-32 rounded-full flex items-center justify-center ${
              isListening ? 'bg-mystical-accent' : 'bg-mystical-medium'
            } transition-colors duration-300`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {isListening && (
                <>
                  {/* Audio visualizer circles */}
                  {visualizerData.map((height, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 bg-white opacity-70 rounded-full"
                      style={{
                        height: `${height}%`,
                        transform: `rotate(${i * 18}deg) translateY(-60%)`,
                        transformOrigin: 'bottom center',
                      }}
                      animate={{
                        height: [`${height}%`, `${height/2}%`, `${height}%`],
                      }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  ))}
                </>
              )}
              
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-12 h-12 text-white z-10"
              >
                <path d="M8 11a1 1 0 112 0v4a1 1 0 11-2 0v-4zm4-1a1 1 0 00-1 1v4a1 1 0 102 0v-4a1 1 0 00-1-1zm5 1a1 1 0 112 0v4a1 1 0 11-2 0v-4z" />
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
              </svg>
            </div>
          </div>
          
          {isListening && (
            <motion.div 
              className="absolute -inset-4 rounded-full border-4 border-mystical-accent"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.2, 0.5] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          )}
        </div>
      )}
      
      {transcript && (
        <div className="mb-4 p-3 bg-mystical-dark bg-opacity-50 rounded-lg max-w-md">
          <p className="italic text-mystical-accent">{transcript}</p>
        </div>
      )}
      
      <button
        onClick={toggleListening}
        className={`mystic-button flex items-center ${compact ? 'text-sm px-4 py-2' : ''}`}
      >
        {compact ? (
          <>
            {isListening ? (
              <>
                <span className="relative w-3 h-3 mr-2">
                  <span className="absolute inset-0 rounded-full bg-red-500 animate-pulse"></span>
                </span>
                Listening...
              </>
            ) : (
              buttonText
            )}
          </>
        ) : (
          isListening ? "Stop Listening" : buttonText
        )}
      </button>
    </div>
  );
} 