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

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResume(file);
    if (file) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
    }
  };

  const handleSubmit = () => {
    if (!prompt) {
      setError("Please enter a prompt");
      setTimeout(() => setError(""), 2000);
      return;
    }
    if (!resume) {
      setError("Please upload a resume");
      setTimeout(() => setError(""), 2000);
      return;
    }
    if (prompt.length > 100) {
      setError("Prompt must be less than 100 characters");
      setTimeout(() => setError(""), 2000);
      return;
    }
    if (prompt.length < 7) {
      setError("Prompt must be more than 7 characters");
      setTimeout(() => setError(""), 2000);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log("submitted");
      setLoading(false);
      setShowResults(true);
      setError("");
      setPrompt("");
      setError("");
      console.log({
        prompt,
        resume,
      });
    }, 2000);
  };

  return (
    <section>
      {!showResults ? (
        <LandingPage
          handleResumeUpload={handleResumeUpload}
          showConfetti={showConfetti}
          handleSubmit={handleSubmit}
          setResume={setResume}
          setPrompt={setPrompt}
          loading={loading}
          resume={resume}
          prompt={prompt}
          error={error}
          setError={setError}
        />
      ) : (
        <div>Results</div>
      )}
    </section>
  );
};

export default Page;
