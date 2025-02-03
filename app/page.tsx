"use client";

import LandingPage from "@/components/LandingPage";
import { setErrorToast } from "@/helpers";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import RenderResumeImprovement from "@/components/RenderResumeImprovement";
import ResumeDocument from "@/components/ResumeDocument";

const Page = () => {
  // ! TESTING
  const [showResults, setShowResults] = React.useState<boolean>(true); // ! TESTING
  // ! TESTING
  const [resume, setResume] = React.useState<File | null>(null);
  const [resumeText, setResumeText] = React.useState<string>("");
  const [prompt, setPrompt] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [isPageLoaded, setIsPageLoaded] = React.useState(false);
  const [resumeLoading, setResumeLoading] = React.useState(false);
  const [answer, setAnswer] = React.useState<string | null>(null);

  // Makes sure that the page is loaded to ensure there are no 'Hydration' errors
  React.useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setResumeLoading(true);
      const file = e.target.files?.[0] ?? null;
      if (!file) return;

      if (file.type !== "application/pdf") {
        setErrorToast("File is not a PDF. Please upload a PDF file.", 3000);
        setResume(null);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      localStorage.removeItem("scraped-resume");

      const res = await fetch("/api/extract-text", {
        method: "POST",
        body: formData,
      });

      if (res.status === 429) {
        setErrorToast("File is not a PDF. Please upload a PDF file.", 3000);
        return;
      }

      if (!res.ok) {
        setErrorToast("Failed to upload resume. Try again.", 3000);
        return;
      }

      const { text } = await res.json();
      setResumeText(text);
      localStorage.setItem("scraped-resume", text);
      setResume(file);
      setShowConfetti(true);
      toast.success("Resume uploaded successfully", { duration: 1500 });
    } catch (error) {
      console.error(error);
      setErrorToast("An unexpected error occurred", 3000);
    } finally {
      setResumeLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!prompt) {
        setErrorToast("Please enter a prompt", 3000);
        return;
      }
      if (!resume) {
        setErrorToast("Please upload a resume", 3000);
        return;
      }
      if (prompt.length > 100) {
        setErrorToast("Prompt must be less than 100 characters", 3000);
        return;
      }
      if (prompt.length < 7) {
        setErrorToast("Prompt must be more than 7 characters", 3000);
        return;
      }

      setLoading(true);
      setShowResults(true);

      const res = await fetch("/api/resume-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt as string,
          userResume: resumeText as string,
        }),
      });

      if (res.status === 400) {
        setErrorToast("Missing prompt or userResume", 3000);
        return;
      }

      if (!res.ok) {
        setErrorToast("Failed to get improved resume");
        return;
      }

      const data = await res.text();
      setAnswer(data);
    } catch (error) {
      console.error(error);
      setErrorToast("An unexpected error occurred", 3000);
    } finally {
      setLoading(false);
    }
  };

  // This makes sure that the page is loaded to ensure there are no 'Hydration' errors
  return isPageLoaded ? (
    <section>
      {/* This is the alert at the top of the page */}
      <Toaster position="top-center" reverseOrder={false} />

      {!showResults ? (
        <LandingPage
          handleResumeUpload={handleResumeUpload}
          showConfetti={showConfetti}
          handleSubmit={handleSubmit}
          setResume={setResume}
          setPrompt={setPrompt}
          resumeLoading={resumeLoading}
          loading={loading}
          resume={resume}
          prompt={prompt}
        />
      ) : (
        <div className="w-full flex min-h-fit items-center gap-3 px-3">
          {/* Resume Improvement from AI */}
          <div className="w-2/3 h-[750px] backdrop-blur-lg  p-5 shadow-2xl chat-scroll overflow-y-auto rounded-xl border border-white/65">
            <RenderResumeImprovement isLoading={loading} answer={answer} />
          </div>

          <div className="w-1/3 h-[500px] flex flex-col gap-4">
            {/* Copy Resume */}
            <div className="w-full bg-black  p-5 rounded-xl">
              <ResumeDocument />
            </div>
            <div className="flex-1 backdrop-blur-lg p-5 shadow-xl rounded-xl border border-white/45">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">
                  Job Search
                </h3>
                <p className="dark:text-white mt-2">
                  Based on your resume analysis, we&apos;ll help you find
                  relevant job opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
    </div>
  );
};

export default Page;
