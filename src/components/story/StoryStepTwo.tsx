
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { StoryData } from "@/types/story";

interface StoryStepTwoProps {
  storyData: StoryData;
  onDataChange: (data: Partial<StoryData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StoryStepTwo = ({ storyData, onDataChange, onNext, onBack }: StoryStepTwoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto neo-blur rounded-2xl p-8"
    >
      <h2 className="text-2xl font-bold mb-6">Tell Us About Your Process</h2>
      <div className="space-y-6">
        <p className="text-gray-400 text-lg leading-relaxed">
          In my organization, one of our key processes that I want to improve is{" "}
          <Textarea
            placeholder="e.g., the customer onboarding process which involves multiple departments"
            value={storyData.processDescription}
            onChange={(e) => onDataChange({ processDescription: e.target.value })}
            className="bg-gray-800/50 border-gray-700 text-white inline-block w-full my-2"
          />
          .
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
            onClick={onNext}
            disabled={!storyData.processDescription}
          >
            Continue <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
