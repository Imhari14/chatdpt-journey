import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Play, FileText, Send, ChevronRight, MessageSquare, Building2, ArrowRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface StoryData {
  sector: string;
  role: string;
  painPoints: string;
  processDescription: string;
}

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

  const renderStoryStep = () => {
    switch (storyStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto neo-blur rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Share Your Business Story</h2>
            <div className="space-y-6">
              <p className="text-gray-400 text-lg leading-relaxed">
                Hello! I'm working in the industry of{" "}
                <Input
                  placeholder="e.g., Healthcare, Banking, Manufacturing"
                  value={storyData.sector}
                  onChange={(e) => setStoryData(prev => ({ ...prev, sector: e.target.value }))}
                  className="bg-gray-800/50 border-gray-700 text-white inline-block w-64 mx-2"
                />
                {" "}as a{" "}
                <Input
                  placeholder="e.g., Process Manager, Analyst"
                  value={storyData.role}
                  onChange={(e) => setStoryData(prev => ({ ...prev, role: e.target.value }))}
                  className="bg-gray-800/50 border-gray-700 text-white inline-block w-64 mx-2"
                />.
              </p>
              <Button 
                className="w-full mt-6"
                onClick={() => setStoryStep(1)}
                disabled={!storyData.sector || !storyData.role}
              >
                Continue <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto neo-blur rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Tell Us About Your Process</h2>
            <div className="space-y-6">
              <p className="text-gray-400 text-lg leading-relaxed">
                In my organization, one of our key processes that I want to improve is{" "}
                <Textarea
                  placeholder="e.g., the customer onboarding process which involves multiple departments"
                  value={storyData.processDescription}
                  onChange={(e) => setStoryData(prev => ({ ...prev, processDescription: e.target.value }))}
                  className="bg-gray-800/50 border-gray-700 text-white inline-block w-full my-2"
                />
                .
              </p>
              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  onClick={() => setStoryStep(0)}
                >
                  Back
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => setStoryStep(2)}
                  disabled={!storyData.processDescription}
                >
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl mx-auto neo-blur rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Share Your Challenges</h2>
            <div className="space-y-6">
              <p className="text-gray-400 text-lg leading-relaxed">
                The main challenges we face with this process are{" "}
                <Textarea
                  placeholder="e.g., long processing times, lack of visibility into bottlenecks, and inconsistent quality"
                  value={storyData.painPoints}
                  onChange={(e) => setStoryData(prev => ({ ...prev, painPoints: e.target.value }))}
                  className="bg-gray-800/50 border-gray-700 text-white inline-block w-full my-2"
                />
                . I'm looking to understand how process mining can help address these issues.
              </p>
              <div className="flex gap-4">
                <Button 
                  variant="outline"
                  onClick={() => setStoryStep(1)}
                >
                  Back
                </Button>
                <Button 
                  className="flex-1"
                  onClick={handleStoryComplete}
                  disabled={!storyData.painPoints}
                >
                  Start Conversation <MessageSquare className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button 
                  onClick={() => setStoryStep(1)}
                  className="col-span-1 md:col-span-3 neo-blur hover:bg-gray-800/50 transition-all p-8 rounded-2xl text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center group-hover:bg-gray-700/50 transition-colors">
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Start Your Journey</h3>
                  <p className="text-sm text-gray-400">
                    Share your story and discover how process mining can transform your business
                  </p>
                </button>

                <Link to="/demo/guide" className="w-full">
                  <button className="w-full h-full neo-blur hover:bg-gray-800/50 transition-all p-6 rounded-xl text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-800/50 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-sm font-medium mb-1">Interactive Guide</h3>
                    <p className="text-xs text-gray-400">Learn the basics</p>
                    <ChevronRight className="w-4 h-4 mx-auto mt-2 text-gray-400" />
                  </button>
                </Link>

                <Link to="/demo/business-dialogue" className="w-full">
                  <button className="w-full h-full neo-blur hover:bg-gray-800/50 transition-all p-6 rounded-xl text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-800/50 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-sm font-medium mb-1">Business Translation</h3>
                    <p className="text-xs text-gray-400">Bridge the gap</p>
                    <ChevronRight className="w-4 h-4 mx-auto mt-2 text-gray-400" />
                  </button>
                </Link>

                <Link to="/demo/video" className="w-full">
                  <button className="w-full h-full neo-blur hover:bg-gray-800/50 transition-all p-6 rounded-xl text-center">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-800/50 flex items-center justify-center">
                      <Play className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-sm font-medium mb-1">Watch Demo</h3>
                    <p className="text-xs text-gray-400">See it in action</p>
                    <ChevronRight className="w-4 h-4 mx-auto mt-2 text-gray-400" />
                  </button>
                </Link>
              </div>
            ) : (
              renderStoryStep()
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="max-w-4xl mx-auto neo-blur rounded-2xl p-6"
          >
            <div className="h-[600px] flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 p-4 scrollbar-none">
                <AnimatePresence>
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.role === "user"
                            ? "bg-primary text-white"
                            : "bg-gray-800 text-white"
                        }`}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              <div className="border-t border-gray-800 p-4">
                <div className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="resize-none bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                  <button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="p-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
