
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MessageSquare, Code, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

interface DialogueItem {
  business: string;
  technical: string;
  explanation: string;
}

const BusinessDialogue = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const dialogues: DialogueItem[] = [
    {
      business: "How long does it typically take for a trade to settle, and where are the delays happening?",
      technical: "What is the average cycle time for trade settlement, and can we identify process bottlenecks through event log analysis?",
      explanation: "Process mining can analyze timestamps between trade execution and settlement, creating a detailed timeline view that highlights delays and their root causes."
    },
    {
      business: "Why do some suppliers have longer lead times than others?",
      technical: "Can we perform comparative process analysis across different supplier pathways?",
      explanation: "By mapping process variants for each supplier, we can identify efficiency patterns and deviations that impact lead times."
    },
    {
      business: "How often do trades need manual intervention, and why?",
      technical: "What is the automation rate of our trade processing, and what triggers exceptional flows?",
      explanation: "Process mining identifies patterns in manual interventions by analyzing event logs, helping optimize automation rules."
    },
    {
      business: "Which compliance checks are causing the most delays in our trading operations?",
      technical: "What are the time-intensive compliance validation steps in our process flow?",
      explanation: "Through process discovery and conformance checking, we can measure the duration of each compliance step."
    },
    {
      business: "Can we predict which trades are likely to fail settlement?",
      technical: "Is it possible to implement predictive analytics for settlement risk based on process patterns?",
      explanation: "Machine learning combined with process mining can identify patterns that typically lead to settlement failures."
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="neo-blur rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-6">Business Process Understanding</h1>
          <p className="text-gray-400 mb-8">
            Explore how process mining bridges the gap between business operations and technical implementation in trading and supply chain.
          </p>
          
          <div className="space-y-6">
            {dialogues.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 rounded-lg overflow-hidden"
              >
                <div 
                  className="p-4 cursor-pointer hover:bg-gray-700/50 transition-colors"
                  onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <MessageSquare className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">{item.business}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Code className="w-4 h-4" />
                        Technical Translation
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-700"
                  >
                    <div className="p-4 bg-gray-800/30">
                      <p className="text-gray-300 mb-4">{item.technical}</p>
                      <div className="flex items-start gap-3 text-sm">
                        <Lightbulb className="w-4 h-4 text-primary mt-1" />
                        <p className="text-gray-400">{item.explanation}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BusinessDialogue;
