
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const DemoGuide = () => {
  const steps = [
    {
      title: "Process Discovery",
      description: "Automatically map your actual business processes from event logs",
    },
    {
      title: "Performance Analysis",
      description: "Identify bottlenecks and inefficiencies in your workflows",
    },
    {
      title: "Conformance Checking",
      description: "Compare actual processes against intended procedures",
    },
    {
      title: "Enhancement",
      description: "Get AI-powered recommendations for process optimization",
    },
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
          <h1 className="text-3xl font-bold mb-6">Getting Started Guide</h1>
          <p className="text-gray-400 mb-8">
            Learn how to leverage AI-powered process mining to transform your business operations.
          </p>
          
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 p-6 rounded-lg flex items-center justify-between group hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <div>
                  <h3 className="font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DemoGuide;
