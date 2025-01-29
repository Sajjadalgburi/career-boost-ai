"use client";

import LandingPage from "@/components/LandingPage";
import { setErrorToast } from "@/helpers";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

const Page = () => {
  // ! TESTING
  const [showResults, setShowResults] = React.useState<boolean>(true); // ! TESTING
  // ! TESTING
  const [resume, setResume] = React.useState<File | null>(null);
  const [resumeText, setResumeText] = React.useState<string>("");
  const [prompt, setPrompt] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [isPageLoaded, setIsPageLoaded] = React.useState(false);
  const [resumeLoading, setResumeLoading] = React.useState(false);
  const [answer, setAnswer] = React.useState<string>("");

  // Makes sure that the page is loaded to ensure there are no 'Hydration' errors
  React.useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setResumeLoading(true);
      const file = e.target.files?.[0] ?? null;
      // If no file is uploaded, return
      if (!file) return;

      if (file.type !== "application/pdf") {
        setErrorToast("File is not a PDF. Please upload a PDF file.", 3000);
        setResume(null);
        return;
      }

      // Send the resume as form data
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/extract-text", {
        method: "POST",
        body: formData,
      });

      // If the file is not a PDF, set the error
      if (res.status === 429) {
        setErrorToast("File is not a PDF. Please upload a PDF file.", 3000);
        return;
      }

      // If the response is not ok, set the error
      if (!res.ok) {
        setErrorToast("Failed to upload resume. Try again.", 3000);
        return;
      }

      const { text } = await res.json();
      setResumeText(text);
      setResume(file);
      setResumeLoading(false);
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

      setError(""); // Clear error if validation passes
      setLoading(true);

      /**
       * 3.
       * 3a. Make API call to get chat response from AI
       * 3b. Scrape LinkedIn profile based on user resume
       */
      const res = await fetch("/api/improvedResume", {
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
      setShowResults(true);
    } catch (error) {
      console.error(error);
      setErrorToast("An unexpected error occurred", 3000);
    } finally {
      setLoading(false);
    }
  };

  return isPageLoaded ? (
    <section>
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
          error={error}
        />
      ) : (
        <div className="w-full flex min-h-fit items-center  gap-3 px-3">
          {/* Resume Improvement from AI */}
          <div className="w-2/3 h-[750px] backdrop-blur-lg p-5 shadow-2xl rounded-xl border  border-white/65">
            <div className="w-full backdrop-blur-lg p-4  flex items-start gap-2 border  border-white/65">
              <Image src="globe.svg" alt="resume" width={25} height={25} />
              <p className="dark:text-white text-black">{answer}</p>
            </div>
          </div>

          <div className="w-1/3 h-[500px] flex flex-col">
            {/* Copy Resume */}
            <div className="w-full bg-black text-white p-5 rounded-xl">
              <p>Copy Resume</p>
            </div>
            <div className=" flex backdrop-blur-lg p-5 shadow-xl rounded-xl border border-white/45">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">
                  Job Search
                </h3>
                <p className="dark:text-white">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem nulla distinctio commodi temporibus nisi accusamus
                  laborum aperiam repudiandae facere tempore voluptates
                  exercitationem eveniet atque magni officia, enim neque dolorem
                  porro?
                </p>
              </div>
            </div>
          </div>
          {/* Job Search Board */}
        </div>
      )}
    </section>
  ) : (
    // add a loading spinner later on
    <div>Loading...</div>
  );
};

export default Page;
