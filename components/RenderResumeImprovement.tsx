import React, { useEffect, useState, useRef } from "react";
import ResumeSkeleton from "./ResumeSkeleton";
import { parseAiResponse, setErrorToast } from "@/helpers";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newResume, setNewResume] = useState<string>("");
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
      try {
        const parsed = parseAiResponse(answer);
        setParsedAiRes(parsed);

        // Only make the new resume request if we have valid parsed data
        if (
          parsed?.weaknesses?.list?.length > 0 &&
          parsed?.improvements?.list?.length > 0
        ) {
          const fetchNewResume = async () => {
            try {
              const originalResume = localStorage.getItem("scraped-resume");
              if (!originalResume) {
                setErrorToast("Original resume not found", 3000);
                return;
              }

              const res = await fetch("/api/new-resume", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  weaknesses: parsed.weaknesses?.list.map((item) => item),
                  improvements: parsed.improvements?.list.map((item) => item),
                  originalResume,
                }),
              });

              if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
              }

              const data: string = await res.json();
              console.log("----Got back AI Response for resume----\n");
              console.log(data);

              const pdfRes = await fetch("/api/laTex-to-pdf", {
                method: "POST",
                body: JSON.stringify({ latex_resume: data }),
              });

              if (!pdfRes.ok) {
                throw new Error(`Error creating PDF: ${pdfRes.status}`);
              }

              if (pdfRes.ok) {
                console.log("----Pdf Successfully Created----");
              }
            } catch (error) {
              console.error("Error fetching new resume:", error);
              setErrorToast("Error generating new resume", 3000);
            }
          };

          fetchNewResume();
        }
      } catch (error) {
        console.error("Error parsing AI response:", error);
        setErrorToast("Error parsing AI response", 3000);
      }
    }
  }, [answer]);

  useEffect(() => {
    scroll();
  }, [parsedAiRes]);

  if (isLoading) {
    return <ResumeSkeleton />;
  }

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto space-y-8 p-8">
      {/* Weaknesses Section */}
      <section className="resume-section">
        <div className="resume-section-div">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Areas for Improvement
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-red-500/50 to-transparent rounded-full" />
        </div>

        <div className="bg-gradient-to-br from-red-50/80 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 backdrop-blur-sm border border-red-200/50 dark:border-red-800/50 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <ul className="space-y-2">
              {parsedAiRes.weaknesses?.list?.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-gray-800 dark:text-gray-200"
                >
                  <span className="mt-1.5">
                    <svg
                      className="w-4 h-4 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </span>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Improvements Section */}
      <section className="resume-section">
        <div className="resume-section-div">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
            Suggested Improvements
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent rounded-full" />
        </div>
        <div className="bg-gradient-to-br from-emerald-50/80 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <ul className="space-y-2">
              {parsedAiRes.improvements?.list?.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-gray-800 dark:text-gray-200"
                >
                  <span className="mt-1.5">
                    <svg
                      className="w-4 h-4 text-emerald-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RenderResumeImprovement;
