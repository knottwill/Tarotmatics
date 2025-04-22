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
      <div className="flex flex-col container m-auto gap-4 p-4">
        <h1>Starting Tarot Reading...</h1>
        <div className="loading loading-spinner loading-lg"></div>
        {!!state?.error && (
          <div role="alert" className="alert alert-error">
            <span>{state.error}</span>
          </div>
        )}
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
      className="flex flex-col h-screen"
    >
      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`btn ${isPaused ? 'btn-primary' : 'btn-secondary'}`}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        </div>
        <Transcript sessionId={sessionID} isPaused={isPaused} />
      </div>
      <RoomAudioRenderer />
      <ControlBar controls={{ camera: false, screenShare: false }} />
    </LiveKitRoom>
  );
}

function Transcript({ sessionId, isPaused }: { sessionId: string; isPaused: boolean }) {
  const [transcriptGroups, setTranscriptGroups] = useState<TranscriptGroup[]>([]);
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
    };

    transcriptManager.addEventListener('update', handleUpdate);
    return () => {
      transcriptManager.removeEventListener('update', handleUpdate);
    };
  }, [transcriptManager]);

  return (
    <div className="flex flex-col gap-4">
      <TranscriptContainer transcripts={transcriptGroups} />
      <TarotReading 
        transcriptGroups={transcriptGroups} 
        onReadingComplete={(cards) => {
          console.log('Tarot reading completed with cards:', cards);
        }}
      />
    </div>
  );
}
