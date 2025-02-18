
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MessageSquare, Code, Lightbulb, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

interface DialogueItem {
  business: string;
  technical: string;
  explanation: string;
  benefit: string;
  category: string;
}

const BusinessDialogue = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const dialogues: DialogueItem[] = [
    {
      category: "Operations",
      business: "How can we reduce the time it takes from trade execution to settlement?",
      technical: "What is the current process cycle time, and where are the bottlenecks in the trade processing workflow?",
      explanation: "Process mining analyzes your transaction logs to create a visual map of how trades actually flow through your systems, highlighting where delays occur.",
      benefit: "Identify and eliminate bottlenecks to reduce settlement time by up to 30%, improving client satisfaction and reducing operational risk."
    },
    {
      category: "Risk",
      business: "Which trades have the highest risk of failing to settle on time?",
      technical: "Can we implement predictive analytics based on historical process patterns to identify high-risk transactions?",
      explanation: "By analyzing patterns in historical trade data, we can identify characteristics that typically lead to settlement delays or failures.",
      benefit: "Proactively manage risk by identifying potential settlement issues before they occur, reducing failed trades by up to 40%."
    },
    {
      category: "Operations",
      business: "Why do similar trades sometimes take different routes through our systems?",
      technical: "What process variants exist in our trade processing workflow, and what triggers these variations?",
      explanation: "Process mining reveals all possible paths trades can take, helping understand why some trades follow different routes.",
      benefit: "Standardize processes where possible and ensure variations only occur when necessary, improving efficiency by 25%."
    },
    {
      category: "Compliance",
      business: "How can we ensure all trades follow the correct compliance checks?",
      technical: "What is our conformance rate to the defined compliance process, and where do deviations occur?",
      explanation: "Compare actual trade processing paths against required compliance steps to identify any missing or incorrect checks.",
      benefit: "Achieve 100% compliance by identifying and addressing process gaps before they become regulatory issues."
    },
    {
      category: "Cost",
      business: "Which parts of our trading process are the most expensive to run?",
      technical: "Can we perform cost analysis based on process mining data to identify resource-intensive activities?",
      explanation: "Map resource utilization and processing time to identify the most costly steps in your trading workflow.",
      benefit: "Reduce operational costs by up to 20% by optimizing resource-intensive processes and automating where possible."
    },
    {
      category: "Technology",
      business: "How can we know if our new trading system is actually improving efficiency?",
      technical: "Can we compare process performance metrics before and after system implementation?",
      explanation: "Process mining provides clear before/after comparisons of processing times, error rates, and throughput.",
      benefit: "Quantify ROI of technology investments with concrete metrics and identify areas for further optimization."
    },
    {
      category: "Risk",
      business: "How do we identify potential fraud patterns in trading activity?",
      technical: "Can we detect anomalous process patterns that might indicate suspicious behavior?",
      explanation: "Process mining identifies unusual trading patterns and suspicious deviations from normal processes.",
      benefit: "Early detection of potential fraud saves millions in potential losses and regulatory fines."
    }
  ];

  const categories = ["all", ...new Set(dialogues.map(item => item.category))];
  const filteredDialogues = selectedCategory === "all" 
    ? dialogues 
    : dialogues.filter(item => item.category === selectedCategory);

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
          <h1 className="text-3xl font-bold mb-6">Stakeholder Discussion Guide</h1>
          <p className="text-gray-400 mb-8">
            Explore common business challenges and discover how process mining provides actionable insights. Click on any question to see the technical perspective and business benefits.
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="space-y-6">
            {filteredDialogues.map((item, index) => (
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
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-primary/80 mb-1">{item.category}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
                          selectedIndex === index ? 'transform rotate-180' : ''
                        }`} />
                      </div>
                      <h3 className="font-semibold text-white mb-2">{item.business}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Code className="w-4 h-4" />
                        Click to see technical perspective
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
                    <div className="p-6 bg-gray-800/30 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Technical Perspective</h4>
                        <p className="text-gray-300">{item.technical}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">How Process Mining Helps</h4>
                        <div className="flex items-start gap-3">
                          <Lightbulb className="w-4 h-4 text-primary mt-1" />
                          <p className="text-gray-400">{item.explanation}</p>
                        </div>
                      </div>

                      <div className="bg-primary/10 rounded-lg p-4 mt-4">
                        <h4 className="text-sm font-medium text-primary mb-2">Business Benefit</h4>
                        <p className="text-gray-300">{item.benefit}</p>
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
