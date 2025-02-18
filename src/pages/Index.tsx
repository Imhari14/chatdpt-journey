
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Play, FileText, Send, ChevronRight } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Index = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
            className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <Link to="/demo/chat" className="col-span-1 md:col-span-3">
              <button className="w-full neo-blur hover:bg-gray-800/50 transition-all p-8 rounded-2xl text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center group-hover:bg-gray-700/50 transition-colors">
                  <Mic className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Start Conversation</h3>
                <p className="text-sm text-gray-400">
                  Begin your journey to process optimization
                </p>
              </button>
            </Link>

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

