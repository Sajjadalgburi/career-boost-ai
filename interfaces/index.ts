import React from "react";

export interface LandingPageProps {
  setResume: React.Dispatch<React.SetStateAction<File | null>>;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  prompt: string;
  resumeLoading: boolean;
  resume: File | null;
  showConfetti: boolean;
  handleResumeUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
}
