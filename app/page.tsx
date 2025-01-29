"use client";

import LandingPage from "@/components/LandingPage";
import React from "react";

const Page = () => {
  const [showResults, setShowResults] = React.useState<boolean>(false);
  const [resume, setResume] = React.useState<File | null>(null);
  const [prompt, setPrompt] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [isPageLoaded, setIsPageLoaded] = React.useState(false);
  const [resumeLoading, setResumeLoading] = React.useState(false);

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

      // Send the resume as form data
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/extract-text", {
        method: "POST",
        body: formData,
      });

      // If the file is not a PDF, set the error
      if (res.status === 429) {
        setError("File is not a PDF. Please upload a PDF file.");

        setTimeout(() => {
          setResume(null);
          setError("");
        }, 3000);
        return;
      }

      // If the response is not ok, set the error
      if (!res.ok) {
        setError("Failed to upload resume. Try again.");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }

      const { text } = await res.json();
      console.log(text);

      // Show confetti if a file is uploaded
      setResumeLoading(false);
      setShowConfetti(true);
      setResume(text);
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
    } finally {
      setResumeLoading(false);
    }
  };

  const handleSubmit = () => {
    try {
      if (!prompt) {
        setError("Please enter a prompt");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }
      if (!resume) {
        setError("Please upload a resume");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }
      if (prompt.length > 100) {
        setError("Prompt must be less than 100 characters");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }
      if (prompt.length < 7) {
        setError("Prompt must be more than 7 characters");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }

      setError(""); // Clear error if validation passes
      setLoading(true);

      /**
       * 3.
       * 3a. Make API call to get chat response from AI
       * 3b. Scrape LinkedIn profile based on user resume
       */
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return isPageLoaded ? (
    <section>
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
        <div>Results</div>
      )}
    </section>
  ) : (
    // add a loading spinner later on
    <div>Loading...</div>
  );
};

export default Page;
