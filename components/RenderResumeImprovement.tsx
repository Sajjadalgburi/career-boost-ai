/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import ResumeSkeleton from "./ResumeSkeleton";
import { parseAiResponse } from "@/helpers";

interface RenderResumeImprovementProps {
  isLoading: boolean;
  answer: string | null;
}

const RenderResumeImprovement: React.FC<RenderResumeImprovementProps> = ({
  isLoading,
  answer,
}) => {
  if (isLoading && typeof answer == null) {
    return <ResumeSkeleton />;
  }
  if (!answer) return null;

  const [parsedAiRes, setParsedAiRes] = useState<{
    weaknesses: string;
    improvements: string;
    rewrittenResume: string;
  }>({ weaknesses: "", improvements: "", rewrittenResume: "" });

  useEffect(() => {
    const parsedAiRes = parseAiResponse(answer);
    setParsedAiRes(parsedAiRes);
  }, [answer]);

  if (answer) {
    return (
      <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
        {/* Weaknesses Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Areas for Improvement
          </h2>
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-gray-700 whitespace-pre-wrap">
              {parsedAiRes.weaknesses}
            </p>
          </div>
        </section>

        {/* Improvements Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Suggested Improvements
          </h2>
          <div className="bg-green-50 p-4 rounded-md">
            <p className="text-gray-700 whitespace-pre-wrap">
              {parsedAiRes.improvements}
            </p>
          </div>
        </section>

        {/* Rewritten Resume Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Improved Resume
          </h2>
          <div className="bg-blue-50 p-4 rounded-md">
            <p className="text-gray-700 whitespace-pre-wrap">
              {parsedAiRes.rewrittenResume}
            </p>
          </div>
        </section>
      </div>
    );
  }
};

export default RenderResumeImprovement;
