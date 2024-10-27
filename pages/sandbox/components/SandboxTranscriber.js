"use client"; 
import React, { useState, useRef } from 'react';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

const SandboxTranscriber = () => {
  const [transcription, setTranscription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognizer = useRef(null);
  const lastRecognizedTextRef = useRef('');

  // check if using sandbox env
  const environment = process.env.NEXT_PUBLIC_ENV;

  if (environment === 'SANDBOX') {
    console.log("Running in sandbox mode")
  }

  const subscriptionKey = process.env.NEXT_PUBLIC_AZURE_API_KEY;
  const serviceRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;

  if (!subscriptionKey || !serviceRegion) {
    console.error("Subscription key or service region is not defined.");
    return <p>Error: Please check your Azure configuration.</p>;
  }

  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

  // toggle recording start/stop
  const toggleRecording = async () => {
    if (isRecording) {
      // stop recognition
      if (recognizer.current) {
        recognizer.current.stopContinuousRecognitionAsync(async () => {
          console.log('Recognition stopped.');
          setIsRecording(false);

          // send transcription to API route
          await sendTranscriptionToAPI(transcription);
        });
      }
    } else {
      const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
      recognizer.current = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

      setTranscription('');
      lastRecognizedTextRef.current = '';

      recognizer.current.recognizing = (s, e) => {
        if (e.result.reason === SpeechSDK.ResultReason.RecognizingSpeech && e.result.text) {
          const trimmedText = e.result.text.trim();
          // debugger;
          if (lastRecognizedTextRef.current !== trimmedText) {
            lastRecognizedTextRef.current = trimmedText;
            // debugger;
            // setTranscription((prev) => prev + (prev ? ' ' : '') + trimmedText); 
            // append text, removing to see if it stops repeating words
          }
        }
      };

      recognizer.current.recognized = (s, e) => {
        if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
          const trimmedText = e.result.text.trim();
          // debugger;
          // only update if the new text is different from the last added transcription
          if (!transcription.endsWith(trimmedText)) {
            // debugger
            setTranscription((prev) => prev + (prev ? ' ' : '') + trimmedText);
          }
        }
      };
      

      recognizer.current.canceled = (s, e) => {
        console.error(`Recognition canceled: ${e.reason}`);
        setIsRecording(false);
        recognizer.current.close();
      };

      recognizer.current.sessionStopped = (s, e) => {
        console.log('Session stopped.');
        setIsRecording(false);
        recognizer.current.close();
      };

      setIsRecording(true);
      recognizer.current.startContinuousRecognitionAsync();
    }
  };

  // send transcription to API route
  const sendTranscriptionToAPI = async (text) => {
    try {
      const response = await fetch('/api/speech-to-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcription: text }), // Send transcription to API
      });

      const data = await response.json();
      console.log('API Response:', data);
    } catch (error) {
      console.error('Error sending transcription to API:', error);
    }
  };

  return (
    <div style={{ width: '250px', padding: '10px' }}>
      <button onClick={toggleRecording}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <h1>Your Response:</h1>
      <p>{transcription}</p>
    </div>
  );
};

export default SandboxTranscriber;
