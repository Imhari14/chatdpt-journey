
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { StoryData } from "@/types/story";

interface StoryStepThreeProps {
  storyData: StoryData;
  onDataChange: (data: Partial<StoryData>) => void;
  onComplete: () => void;
  onBack: () => void;
}

export const StoryStepThree = ({ storyData, onDataChange, onComplete, onBack }: StoryStepThreeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto neo-blur rounded-2xl p-8"
    >
      <h2 className="text-2xl font-bold mb-6">Share Your Challenges</h2>
      <div className="space-y-6">
        <p className="text-gray-400 text-lg leading-relaxed">
          The main challenges we face with this process are{" "}
          <Textarea
            placeholder="e.g., long processing times, lack of visibility into bottlenecks, and inconsistent quality"
            value={storyData.painPoints}
            onChange={(e) => onDataChange({ painPoints: e.target.value })}
            className="bg-gray-800/50 border-gray-700 text-white inline-block w-full my-2"
          />
          . I'm looking to understand how process mining can help address these issues.
        </p>
        <div className="flex gap-4">
          <Button 
            variant="outline"
            onClick={onBack}
          >
            Back
          </Button>
          <Button 
            className="flex-1"
            onClick={onComplete}
            disabled={!storyData.painPoints}
          >
            Start Conversation <MessageSquare className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
