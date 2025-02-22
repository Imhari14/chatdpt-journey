
import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { GeminiService } from "@/services/geminiService";
import { pcmToWav } from "@/utils/audioUtils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Video, VideoOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'human' | 'assistant'; content: string }>>([]);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const geminiService = useRef(new GeminiService());
  const { toast } = useToast();

  const speakResponse = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsSpeaking(false);
        toast({
          title: "Speech Error",
          description: "Could not play the voice response",
          variant: "destructive"
        });
      };

      // Get available voices and try to use a preferred one
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang.startsWith('en') && voice.name.includes('Google')
      ) || voices.find(voice => 
        voice.lang.startsWith('en')
      );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis not supported');
      toast({
        title: "Not Supported",
        description: "Speech synthesis is not supported in your browser",
        variant: "destructive"
      });
    }
  }, [toast]);

  // Load voices when the component mounts
  useEffect(() => {
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const processAudio = async (audioData: ArrayBuffer) => {
    try {
      const wavData = await pcmToWav(Buffer.from(audioData).toString('base64'));
      const transcription = await geminiService.current.transcribeAudio(wavData);
      
      if (transcription.trim()) {
        setMessages(prev => [...prev, { role: 'human', content: transcription }]);
        
        // Get Gemini's response
        const response = await geminiService.current.chat(transcription);
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        
        // Speak the response
        speakResponse(response);
      }
    } catch (error) {
      console.error('Error processing audio:', error);
      toast({
        title: "Error",
        description: "Failed to process audio input",
        variant: "destructive"
      });
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        }
      });

      audioContextRef.current = new AudioContext({ sampleRate: 16000 });
      await audioContextRef.current.audioWorklet.addModule('/worklets/audio-processor.js');

      const source = audioContextRef.current.createMediaStreamSource(stream);
      workletNodeRef.current = new AudioWorkletNode(audioContextRef.current, 'audio-processor');

      workletNodeRef.current.port.onmessage = (event) => {
        const { pcmData, level } = event.data;
        setAudioLevel(level);
        processAudio(pcmData);
      };

      source.connect(workletNodeRef.current);
      mediaStreamRef.current = stream;
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Error",
        description: "Failed to start recording",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (workletNodeRef.current) {
      workletNodeRef.current.disconnect();
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsRecording(false);
    setAudioLevel(0);
  };

  useEffect(() => {
    return () => {
      stopRecording();
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container px-4 py-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="px-4 py-2 rounded-full bg-gray-800 text-primary text-sm font-medium border border-gray-700">
            Gemini Voice Assistant
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500">
            Voice Chat
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Talk naturally with Gemini AI using your voice.
          </p>
          {isSpeaking && (
            <span className="mt-4 inline-block px-3 py-1 text-sm bg-primary/20 text-primary rounded-full">
              Speaking...
            </span>
          )}
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="relative">
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                size="icon"
                className={`w-16 h-16 rounded-full ${
                  isRecording 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {isRecording ? <VideoOff className="h-8 w-8" /> : <Video className="h-8 w-8" />}
              </Button>
              
              {isRecording && (
                <div className="mt-4 w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-150"
                    style={{ width: `${audioLevel}%` }}
                  />
                </div>
              )}
            </div>

            <ScrollArea className="h-[400px] rounded-lg border border-gray-800 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2 ${
                      message.role === 'human' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === 'human'
                          ? 'bg-primary text-white ml-auto'
                          : 'bg-gray-800 text-white'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
