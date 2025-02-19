
import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Message } from "@/types/chat";
import { StoryData } from "@/types/story";
import { StoryStepOne } from "@/components/story/StoryStepOne";
import { StoryStepTwo } from "@/components/story/StoryStepTwo";
import { StoryStepThree } from "@/components/story/StoryStepThree";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { DemoCards } from "@/components/navigation/DemoCards";

const Index = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [storyStep, setStoryStep] = useState(0);
  const [storyData, setStoryData] = useState<StoryData>({
    sector: "",
    role: "",
    painPoints: "",
    processDescription: "",
  });

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const newMessage = { role: "user", content: input } as const;
    setMessages(prev => [...prev, newMessage]);
    setInput("");

    try {
      const { data: response, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [...messages, newMessage],
        },
      });

      if (error) throw error;

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      let assistantMessage = "";
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(5);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content || '';
              assistantMessage += content;
              
              setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content = assistantMessage;
                return newMessages;
              });
            } catch (e) {
              console.error('Error parsing chunk:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStoryComplete = () => {
    setIsStarted(true);
    const initialMessage: Message = {
      role: "assistant",
      content: `Thank you for sharing your story! I understand you're in the ${storyData.sector} sector as a ${storyData.role}. 
      Based on your process description and pain points, I can help you understand how process mining can specifically address your challenges. 
      Feel free to ask any questions about how we can optimize your processes and solve the issues you're facing.`
    };
    setMessages([initialMessage]);
  };

  const handleStoryDataChange = (data: Partial<StoryData>) => {
    setStoryData(prev => ({ ...prev, ...data }));
  };

  const renderStoryStep = () => {
    switch (storyStep) {
      case 0:
        return (
          <StoryStepOne 
            storyData={storyData} 
            onDataChange={handleStoryDataChange}
            onNext={() => setStoryStep(1)}
          />
        );
      case 1:
        return (
          <StoryStepTwo
            storyData={storyData}
            onDataChange={handleStoryDataChange}
            onNext={() => setStoryStep(2)}
            onBack={() => setStoryStep(0)}
          />
        );
      case 2:
        return (
          <StoryStepThree
            storyData={storyData}
            onDataChange={handleStoryDataChange}
            onComplete={handleStoryComplete}
            onBack={() => setStoryStep(1)}
          />
        );
      default:
        return null;
    }
  };

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
            AI-Powered Process Mining Assistant
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500">
            ChatDPT
          </h1>
          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
            Transform your business processes with intelligent conversation. 
            Understand, optimize, and evolve with AI-driven insights.
          </p>
        </motion.div>

        {!isStarted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            {storyStep === 0 ? (
              <DemoCards onStartJourney={() => setStoryStep(1)} />
            ) : (
              renderStoryStep()
            )}
          </motion.div>
        ) : (
          <ChatInterface
            messages={messages}
            input={input}
            isLoading={isLoading}
            onInputChange={setInput}
            onSend={handleSend}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
