
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MessageSquare, Code, Lightbulb, ChevronDown, Database } from "lucide-react";
import { Link } from "react-router-dom";

interface DialogueItem {
  stakeholder: {
    question: string;
    context: string;
    businessValue: string;
  };
  technical: {
    question: string;
    implementation: string;
    methodology: string;
    dataRequirements: {
      tables: string[];
      fields: string[];
      description: string;
    };
  };
  category: string;
}

const BusinessDialogue = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"stakeholder" | "technical">("stakeholder");

  const dialogues: DialogueItem[] = [
    {
      category: "Process Analysis",
      stakeholder: {
        question: "Why do some trades take longer to process than others?",
        context: "When trades take longer than expected, it impacts our client relationships and increases our operational costs.",
        businessValue: "By identifying and fixing slow processes, we can reduce processing time by 40%, improve client satisfaction, and reduce operational costs."
      },
      technical: {
        question: "How can we implement process variant analysis to identify performance bottlenecks?",
        implementation: "Using process mining algorithms to analyze event logs and identify process variants with statistical significance.",
        methodology: "Apply clustering algorithms to detect process variants, calculate performance metrics per variant, and identify root causes of delays.",
        dataRequirements: {
          tables: ["trade_execution", "trade_status_history", "trade_settlement"],
          fields: [
            "trade_id", 
            "execution_timestamp",
            "status_change_timestamp",
            "current_status",
            "previous_status",
            "settlement_timestamp",
            "processing_duration"
          ],
          description: "We need comprehensive trade lifecycle data with timestamps for each status change to analyze processing times and identify bottlenecks. Historical status changes are crucial for pattern detection."
        }
      }
    },
    {
      category: "Automation",
      stakeholder: {
        question: "Can we reduce the manual work our team does for routine trades?",
        context: "Our team spends too much time on routine tasks that should be automated, leading to higher costs and potential errors.",
        businessValue: "Automation of routine processes can reduce manual work by 60%, decrease errors by 80%, and free up staff for more valuable tasks."
      },
      technical: {
        question: "What machine learning approaches can we use to identify automation opportunities in the trade processing workflow?",
        implementation: "Combine process mining with ML to identify patterns in manual interventions and assess automation potential.",
        methodology: "Use sequence mining and pattern recognition to identify repetitive tasks suitable for RPA implementation.",
        dataRequirements: {
          tables: ["manual_interventions", "trade_processing", "user_actions"],
          fields: [
            "intervention_id",
            "trade_id",
            "action_type",
            "user_id",
            "timestamp",
            "intervention_reason",
            "resolution_steps"
          ],
          description: "Access to manual intervention logs and user action data will help identify patterns in routine tasks that could be automated. Include resolution steps to understand the logic needed for automation."
        }
      }
    },
    {
      category: "Risk Management",
      stakeholder: {
        question: "How can we spot potential trade issues before they become problems?",
        context: "Delayed or failed trades cost us money and damage our reputation with clients.",
        businessValue: "Early detection of potential issues can prevent 90% of trade failures and maintain strong client relationships."
      },
      technical: {
        question: "What predictive models can we build using process mining data to forecast settlement risks?",
        implementation: "Develop predictive models using historical process data to identify risk patterns.",
        methodology: "Combine process mining metrics with machine learning to create real-time risk scoring models.",
        dataRequirements: {
          tables: ["trade_risk_factors", "historical_failures", "trade_attributes"],
          fields: [
            "risk_score",
            "failure_reason",
            "trade_characteristics",
            "counterparty_info",
            "market_conditions",
            "historical_performance"
          ],
          description: "Historical trade failure data combined with risk factors and trade attributes will enable predictive modeling. Include market conditions and counterparty information for comprehensive risk assessment."
        }
      }
    },
    {
      category: "Compliance",
      stakeholder: {
        question: "Are we following all required steps for regulatory compliance?",
        context: "Missing compliance steps can lead to fines and regulatory issues.",
        businessValue: "Ensure 100% compliance and avoid potential fines while maintaining audit readiness."
      },
      technical: {
        question: "How can we implement continuous compliance monitoring using process mining?",
        implementation: "Create conformance checking algorithms to compare actual vs. required processes.",
        methodology: "Apply temporal logic and pattern matching to verify compliance rules in real-time.",
        dataRequirements: {
          tables: ["compliance_rules", "trade_compliance_checks", "regulatory_requirements"],
          fields: [
            "rule_id",
            "check_timestamp",
            "compliance_status",
            "rule_type",
            "violation_details",
            "resolution_status",
            "audit_trail"
          ],
          description: "Complete compliance check history with detailed rule definitions and audit trails. Include both passed and failed checks to build comprehensive compliance patterns."
        }
      }
    },
    {
      category: "Performance",
      stakeholder: {
        question: "Which parts of our trading process are slowing us down the most?",
        context: "Slow processes affect our competitiveness and client satisfaction.",
        businessValue: "Identifying and fixing bottlenecks can improve overall processing speed by 50%."
      },
      technical: {
        question: "How can we optimize the end-to-end process latency using performance mining?",
        implementation: "Apply performance mining techniques to identify bottlenecks and optimization opportunities.",
        methodology: "Use critical path analysis and bottleneck detection algorithms on process event logs.",
        dataRequirements: {
          tables: ["process_steps", "system_performance", "resource_utilization"],
          fields: [
            "step_id",
            "step_duration",
            "start_time",
            "end_time",
            "resource_id",
            "queue_time",
            "processing_time",
            "system_load"
          ],
          description: "Detailed timing data for each process step, including both queue and processing times. Resource utilization metrics help identify capacity-related bottlenecks."
        }
      }
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Interactive Process Guide</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("stakeholder")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "stakeholder"
                    ? "bg-primary text-white"
                    : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
                }`}
              >
                Business View
              </button>
              <button
                onClick={() => setViewMode("technical")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === "technical"
                    ? "bg-primary text-white"
                    : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
                }`}
              >
                Technical View
              </button>
            </div>
          </div>

          <p className="text-gray-400 mb-8">
            {viewMode === "stakeholder" 
              ? "Explore how process mining can solve your business challenges and deliver measurable value."
              : "Discover technical implementations and methodologies for process mining solutions."}
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
                      <h3 className="font-semibold text-white mb-2">
                        {viewMode === "stakeholder" 
                          ? item.stakeholder.question 
                          : item.technical.question}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Code className="w-4 h-4" />
                        Click to learn more
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
                      {viewMode === "stakeholder" ? (
                        <>
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Business Context</h4>
                            <p className="text-gray-300">{item.stakeholder.context}</p>
                          </div>
                          <div className="bg-primary/10 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-primary mb-2">Business Value</h4>
                            <p className="text-gray-300">{item.stakeholder.businessValue}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Implementation Approach</h4>
                            <p className="text-gray-300">{item.technical.implementation}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Technical Methodology</h4>
                            <div className="flex items-start gap-3">
                              <Lightbulb className="w-4 h-4 text-primary mt-1" />
                              <p className="text-gray-400">{item.technical.methodology}</p>
                            </div>
                          </div>
                          <div className="bg-gray-900/50 rounded-lg p-4 mt-4">
                            <div className="flex items-center gap-2 mb-3">
                              <Database className="w-4 h-4 text-primary" />
                              <h4 className="text-sm font-medium text-primary">Required Data Schema</h4>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <h5 className="text-xs font-medium text-gray-400 mb-1">Required Tables</h5>
                                <div className="flex flex-wrap gap-2">
                                  {item.technical.dataRequirements.tables.map((table, i) => (
                                    <span key={i} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                                      {table}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h5 className="text-xs font-medium text-gray-400 mb-1">Key Fields</h5>
                                <div className="flex flex-wrap gap-2">
                                  {item.technical.dataRequirements.fields.map((field, i) => (
                                    <span key={i} className="px-2 py-1 bg-gray-800/50 rounded text-xs text-gray-400">
                                      {field}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <h5 className="text-xs font-medium text-gray-400 mb-1">Data Context</h5>
                                <p className="text-sm text-gray-400">
                                  {item.technical.dataRequirements.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
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
