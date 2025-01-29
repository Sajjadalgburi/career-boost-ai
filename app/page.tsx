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
      return;
    }
    if (!resume) {
      setError("Please upload a resume");
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
