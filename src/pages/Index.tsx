
import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Play, FileText } from "lucide-react";

const Index = () => {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-secondary to-background">
      <div className="container px-4 py-8 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            AI-Powered Process Mining Assistant
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            ChatDPT
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your business processes with intelligent conversation. 
            Understand, optimize, and evolve with AI-driven insights.
          </p>
        </motion.div>

        {!isStarted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <button
              onClick={() => setIsStarted(true)}
              className="w-full glass hover:bg-white/90 transition-all p-8 rounded-2xl text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Mic className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Conversation</h3>
              <p className="text-sm text-muted-foreground">
                Begin your journey to process optimization
              </p>
            </button>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <button className="glass hover:bg-white/90 transition-all p-6 rounded-xl text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-sm font-medium mb-1">Watch Demo</h3>
                <p className="text-xs text-muted-foreground">
                  See DPT in action
                </p>
              </button>

              <button className="glass hover:bg-white/90 transition-all p-6 rounded-xl text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-sm font-medium mb-1">PDF Guides</h3>
                <p className="text-xs text-muted-foreground">
                  Learn more
                </p>
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="max-w-4xl mx-auto glass rounded-2xl p-6"
          >
            <div className="h-[600px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Voice chat interface coming soon...
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
