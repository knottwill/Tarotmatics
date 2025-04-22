import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ConnectingIndicator,
  FinalTranscript,
  FlowProvider,
  LiveTranscript,
  StartRecordingButton,
  StopRecordingButton,
  useFlow,
} from '@speechmatics/flow-client-react';
import {
  BrowserAudioInputProvider,
  MicrophoneIndicator,
} from '@speechmatics/browser-audio-input-react';
import { useSpeechmaticsAuth } from '@speechmatics/auth';

interface SpeechRecognitionProps {
  apiKey: string;
  onResult: (transcript: string) => void;
  buttonText?: string;
  compact?: boolean;
}

function SpeechRecognitionContent({ onResult, buttonText, compact }: SpeechRecognitionProps) {
  const { finalTranscript, isConnected, isRecording } = useFlow();

  useEffect(() => {
    if (finalTranscript) {
      console.log('Final transcript received:', finalTranscript);
      onResult(finalTranscript);
    }
  }, [finalTranscript, onResult]);

  const buttonClasses = `mystic-button flex items-center justify-center ${compact ? 'text-sm px-4 py-2' : 'w-48 h-12'}`;
  const micSize = compact ? 'w-4 h-4' : 'w-6 h-6';
  const indicatorSize = compact ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <div className={`flex flex-col items-center ${compact ? 'w-full' : 'w-72'}`}>
      {!compact && (
        <div className="mb-6 relative w-32 h-32 flex items-center justify-center">
          <div 
            className={`absolute inset-0 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isRecording ? 'bg-mystical-accent' : 'bg-mystical-medium'
            }`}
          >
            <MicrophoneIndicator 
              className={`text-white z-10 ${micSize}`} 
              iconStrokeWidth={isRecording ? 2 : 1.5}
            />
          </div>
          
          {isRecording && (
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

      {!isConnected && (
        <div className="mb-4 flex items-center text-mystical-accent">
          <ConnectingIndicator className={`mr-2 ${indicatorSize}`} /> Connecting...
        </div>
      )}
      
      {isConnected && !isRecording && (
         <StartRecordingButton className={buttonClasses}>
           {buttonText}
         </StartRecordingButton>
      )}

      {isRecording && (
        <>
          <div className="mb-4 p-3 bg-mystical-dark bg-opacity-50 rounded-lg max-w-md min-h-[3rem] w-full">
            <p className="italic text-mystical-accent">
              <LiveTranscript /> <FinalTranscript />
            </p>
          </div>
          <StopRecordingButton className={buttonClasses}>
            Stop Listening
          </StopRecordingButton>
        </>
      )}
    </div>
  );
}

export default function SpeechRecognition({ apiKey, onResult, buttonText = "Start Speaking", compact = false }: SpeechRecognitionProps) {
  const { authToken, error } = useSpeechmaticsAuth(apiKey);

  if (error) return <p>Error getting auth token: {error}</p>;
  if (!authToken) return <p>Getting auth token...</p>;

  return (
    <BrowserAudioInputProvider>
      <FlowProvider
        authToken={authToken}
        config={{
          language: 'en',
          // Add any other Flow configuration needed here
        }}
      >
        <SpeechRecognitionContent 
          apiKey={apiKey} 
          onResult={onResult} 
          buttonText={buttonText} 
          compact={compact} 
        />
      </FlowProvider>
    </BrowserAudioInputProvider>
  );
} 