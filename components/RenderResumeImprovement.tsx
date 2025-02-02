/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useRef } from "react";
import ResumeSkeleton from "./ResumeSkeleton";
import { parseAiResponse } from "@/helpers";
import { ResumeInterface } from "@/interfaces";

interface RenderResumeImprovementProps {
  isLoading: boolean;
  answer: string | null;
}

const RenderResumeImprovement: React.FC<RenderResumeImprovementProps> = ({
  isLoading,
  answer,
}) => {
  const [parsedAiRes, setParsedAiRes] = useState<ResumeInterface>(
    {} as ResumeInterface
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = () => {
    if (containerRef.current) {
      const { offsetHeight, scrollHeight, scrollTop } = containerRef.current;
      if (scrollHeight >= scrollTop + offsetHeight) {
        containerRef.current.scrollTo({
          top: scrollHeight + 200,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    if (answer) {
      // Parse new AI response and save to state and localStorage
      const parsed = parseAiResponse(answer);
      setParsedAiRes(parsed);
      localStorage.setItem("resumeImprovement", JSON.stringify(parsed));
    } else if (!isLoading) {
      // If no answer and not loading, try to get from localStorage
      try {
        const savedResponse = localStorage.getItem("resumeImprovement");
        if (savedResponse) {
          const parsed = JSON.parse(savedResponse);
          setParsedAiRes(parsed);
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error);
      }
    }
  }, [answer, isLoading]);

  useEffect(() => {
    scroll();
  }, [parsedAiRes]);

  if (isLoading) {
    return <ResumeSkeleton />;
  }

  return (
    <div ref={containerRef} className="space-y-6 p-6">
      {/* Weaknesses Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Areas for Improvement
        </h2>
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-gray-700 whitespace-pre-wrap">
            {parsedAiRes.weaknesses?.content ||
              "No weaknesses analysis available"}
          </p>
        </div>
        <ul className="list-disc list-inside">
          {parsedAiRes.weaknesses?.list?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Improvements Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Suggested Improvements
        </h2>
        <div className="bg-green-50 p-4 rounded-md">
          <p className="text-gray-700 whitespace-pre-wrap">
            {parsedAiRes.improvements?.content || "No improvements available"}
          </p>
        </div>
        <ul className="list-disc list-inside">
          {parsedAiRes.improvements?.list?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Rewritten Resume Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Improved Resume
        </h2>
        <div className="bg-blue-50 p-4 rounded-md">
          <div
            className="text-gray-700 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html:
                parsedAiRes.rewrittenResume || "No improved resume available",
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default RenderResumeImprovement;
