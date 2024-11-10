"use client"; 
import React, { useEffect, useRef, useState } from 'react';
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';

export default function Transcriber({ isRecording, setTranscription }) {
  const recognizer = useRef(null);
  const lastRecognizedTextRef = useRef('');

  const subscriptionKey = process.env.NEXT_PUBLIC_AZURE_API_KEY;
  const serviceRegion = process.env.NEXT_PUBLIC_AZURE_SPEECH_REGION;

  if (!subscriptionKey || !serviceRegion) {
    console.error("Subscription key or service region is not defined.");
    return null;
  }

  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

  const startRecognition = () => {
    const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput();
    recognizer.current = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    setTranscription('');
    lastRecognizedTextRef.current = '';

    recognizer.current.recognizing = (s, e) => {
      if (e.result.reason === SpeechSDK.ResultReason.RecognizingSpeech && e.result.text) {
        const trimmedText = e.result.text.trim();
        if (lastRecognizedTextRef.current !== trimmedText) {
          lastRecognizedTextRef.current = trimmedText;
        }
      }
    };

    recognizer.current.recognized = (s, e) => {
      if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
        const trimmedText = e.result.text.trim();
        setTranscription((prev) => prev + (prev ? ' ' : '') + trimmedText);
      }
    };

    recognizer.current.canceled = (s, e) => {
      console.error(`Recognition canceled: ${e.reason}`);
      stopRecognition();
    };

    recognizer.current.sessionStopped = (s, e) => {
      console.log('Session stopped.');
      stopRecognition();
    };

    recognizer.current.startContinuousRecognitionAsync();
  };

  const stopRecognition = () => {
    if (recognizer.current) {
      recognizer.current.stopContinuousRecognitionAsync(() => {
        console.log('Recognition stopped.');
      });
    }
  };

  useEffect(() => {
    if (isRecording) {
      startRecognition();
    } else {
      stopRecognition();
    }
    return () => stopRecognition();
  }, [isRecording]);

  return null;
  // button & output are in answerPractice component
}
