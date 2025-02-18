
import { motion } from "framer-motion";
import { ArrowLeft, Play } from "lucide-react";
import { Link } from "react-router-dom";

const DemoVideo = () => {
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
          <h1 className="text-3xl font-bold mb-6">Product Demo</h1>
          <p className="text-gray-400 mb-8">
            Watch how our AI-powered process mining solution works in action.
          </p>
          
          <div className="aspect-video bg-gray-800/50 rounded-lg overflow-hidden relative group cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Play className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
              <h3 className="font-semibold">Process Mining in Action</h3>
              <p className="text-sm text-gray-300">Learn how to analyze and optimize your business processes</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DemoVideo;
