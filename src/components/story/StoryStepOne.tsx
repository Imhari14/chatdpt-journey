
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { StoryData } from "@/types/story";

interface StoryStepOneProps {
  storyData: StoryData;
  onDataChange: (data: Partial<StoryData>) => void;
  onNext: () => void;
}

export const StoryStepOne = ({ storyData, onDataChange, onNext }: StoryStepOneProps) => {
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
            onChange={(e) => onDataChange({ sector: e.target.value })}
            className="bg-gray-800/50 border-gray-700 text-white inline-block w-64 mx-2"
          />
          {" "}as a{" "}
          <Input
            placeholder="e.g., Process Manager, Analyst"
            value={storyData.role}
            onChange={(e) => onDataChange({ role: e.target.value })}
            className="bg-gray-800/50 border-gray-700 text-white inline-block w-64 mx-2"
          />.
        </p>
        <Button 
          className="w-full mt-6"
          onClick={onNext}
          disabled={!storyData.sector || !storyData.role}
        >
          Continue <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};
