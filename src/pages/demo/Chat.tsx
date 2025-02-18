
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const DemoChat = () => {
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
          <h1 className="text-3xl font-bold mb-6">Interactive Demo</h1>
          <p className="text-gray-400 mb-8">
            Experience how our AI assistant can help optimize your business processes through natural conversation.
          </p>
          
          <div className="space-y-6">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-gray-400 text-sm mb-2">User Question</p>
              <p>"How can process mining help identify bottlenecks in our order fulfillment process?"</p>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-gray-400 text-sm mb-2">AI Response</p>
              <p>
                Process mining can analyze your order fulfillment event logs to:
                <br />1. Map actual process flows
                <br />2. Identify delays and deviations
                <br />3. Highlight resource constraints
                <br />4. Quantify impact on cycle times
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DemoChat;
