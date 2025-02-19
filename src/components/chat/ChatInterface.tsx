
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "@/types/chat";

interface ChatInterfaceProps {
  messages: Message[];
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
}

export const ChatInterface = ({ messages, input, isLoading, onInputChange, onSend }: ChatInterfaceProps) => {
  return (
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
              onChange={(e) => onInputChange(e.target.value)}
              placeholder="Type your message..."
              className="resize-none bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
            />
            <button
              onClick={onSend}
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
