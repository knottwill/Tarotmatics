'use client';

import { useActionState, useEffect, useMemo, useState, startTransition } from 'react';
import { start, type StartLivekitResponse } from '../actions';
import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
  useDataChannel,
} from '@livekit/components-react';
import '@livekit/components-styles';
import type { fetchPersonas } from '@speechmatics/flow-client-react';
import TranscriptManager from '@/lib/transcript-manager';
import type {
  TranscriptGroup,
  TranscriptUpdateEvent,
} from '@/lib/transcript-types';
import { TranscriptContainer } from '@/components/TranscriptView';
import { TarotReading } from './TarotReading';
import { CrystalBallAnimation } from '@/components/CrystalBallAnimation';

const DEFAULT_TAROT_PERSONA = '';

const TAROT_AGENT_ID = '03c6fc36-d033-4bec-9625-f0e74fad5602:en::latest';

export function Room({
  personas,
}: {
  personas: Awaited<ReturnType<typeof fetchPersonas>>;
}) {
  const [state, formAction, pending] = useActionState<
    StartLivekitResponse | null,
    FormData
  >((_, formData: FormData) => start(formData), null);
  const [isPaused, setIsPaused] = useState(false);

  // Automatically start the session when component mounts
  useEffect(() => {
    if (!state) {
      const formData = new FormData();
      formData.append('template', TAROT_AGENT_ID);
      formData.append('persona', DEFAULT_TAROT_PERSONA);
      startTransition(() => {
        formAction(formData);
      });
    }
  }, [state, formAction]);

  if (!state || !state.success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Preparing Your Tarot Reading...
          </h1>
          <div className="loading loading-spinner loading-lg text-purple-500"></div>
          {!!state?.error && (
            <div role="alert" className="alert alert-error bg-red-900/50 border-red-500/50">
              <span className="text-red-200">{state.error}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  const { livekitURL, livekitToken, sessionID } = state;

  return (
    <LiveKitRoom
      serverUrl={livekitURL}
      token={livekitToken}
      onDisconnected={() => {
        // TODO find a better way to reset
        window.location.reload();
      }}
      className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="flex-1 overflow-auto p-6">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`px-6 py-3 rounded-lg transition-all duration-300 ${
              isPaused 
                ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-purple-500/20 hover:border-purple-500/50'
            }`}
          >
            {isPaused ? 'Resume Reading' : 'Pause Reading'}
          </button>
        </div>
        <Transcript sessionId={sessionID} isPaused={isPaused} />
      </div>
      <RoomAudioRenderer />
      <ControlBar 
        controls={{ camera: false, screenShare: false }} 
        className="bg-gray-800/50 border-t border-purple-500/20"
      />
    </LiveKitRoom>
  );
}

function Transcript({ sessionId, isPaused }: { sessionId: string; isPaused: boolean }) {
  const [transcriptGroups, setTranscriptGroups] = useState<TranscriptGroup[]>([]);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const decoder = useMemo(() => new TextDecoder(), []);
  const transcriptManager = useMemo(() => new TranscriptManager(), []);

  useDataChannel((e) => {
    if (!isPaused) {
      const stringData = decoder.decode(e.payload);
      const data = JSON.parse(stringData);
      transcriptManager.handleMessage(data);
    }
  });

  // Clear transcripts when session changes
  useEffect(() => {
    if (sessionId) {
      transcriptManager.clearTranscripts();
    }
  }, [sessionId, transcriptManager]);

  useEffect(() => {
    const handleUpdate = (event: TranscriptUpdateEvent) => {
      setTranscriptGroups(event.transcriptGroups);
      
      // Check if the last message is from the agent and is recent
      const lastGroup = event.transcriptGroups[event.transcriptGroups.length - 1];
      if (lastGroup && lastGroup.type === 'agent') {
        setIsAgentSpeaking(true);
        // Reset speaking state after a delay
        setTimeout(() => setIsAgentSpeaking(false), 2000);
      }
    };

    transcriptManager.addEventListener('update', handleUpdate);
    return () => {
      transcriptManager.removeEventListener('update', handleUpdate);
    };
  }, [transcriptManager]);

  return (
    <div className="flex flex-col gap-6">
      <CrystalBallAnimation isSpeaking={isAgentSpeaking} />
      <TarotReading 
        transcriptGroups={transcriptGroups} 
        onReadingComplete={(cards) => {
          console.log('Tarot reading completed with cards:', cards);
        }}
      />
    </div>
  );
}
