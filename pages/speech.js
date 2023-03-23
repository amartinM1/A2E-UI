import React, { useState } from 'react';
import Voice from '@react-native-voice/voice';

const Speech_Text = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');

  const handleStartRecording = async () => {
    setIsRecording(true);
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error(error);
    }
  };

  const handleStopRecording = async () => {
    setIsRecording(false);
    try {
      await Voice.stop();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelRecording = async () => {
    setIsRecording(false);
    try {
      await Voice.cancel();
    } catch (error) {
      console.error(error);
    }
  };

  const handleVoiceResults = (event) => {
    setTranscription(event.value[0]);
    console.log('Transcription:', event.value[0]);
  };

  Voice.onSpeechResults = handleVoiceResults;

  return (
    <>
      {isRecording ? (
        <button onPress={handleStopRecording}>Stop Recording</button>
      ) : (
        <button onPress={handleStartRecording}>Start Recording</button>
      )}
      <button onPress={handleCancelRecording}>Cancel Recording</button>
      <text>{transcription}</text>
    </>
  );
};

export default Speech_Text;
