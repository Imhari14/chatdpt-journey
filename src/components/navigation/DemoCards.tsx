
import { Link } from "react-router-dom";
import { Building2, FileText, MessageSquare, Play, ChevronRight } from "lucide-react";

interface DemoCardsProps {
  onStartJourney: () => void;
}

export const DemoCards = ({ onStartJourney }: DemoCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <button 
        onClick={onStartJourney}
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
  );
};
