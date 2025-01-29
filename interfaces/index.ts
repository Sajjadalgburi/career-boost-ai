import React from "react";

export interface LandingPageProps {
  setResume: React.Dispatch<React.SetStateAction<File | null>>;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  prompt: string;
  resume: File | null;
  showConfetti: boolean;
  handleResumeUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
}
