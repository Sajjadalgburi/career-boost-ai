import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import { LandingPageProps } from "@/interfaces";
import InputArea from "./InputArea";
import ResumeUploader from "./ResumeUploader";
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

const LandingPage: React.FC<LandingPageProps> = ({
  handleSubmit,
  showConfetti,
  handleResumeUpload,
  setPrompt,
  resumeLoading,
  resume,
  loading,
  prompt,
}) => {
  return (
    <div className="max-w-5xl container w-full flex flex-col items-center justify-center gap-6 md:gap-10 mb-[100px]">
      <div className="flex flex-col items-center justify-center gap-4 md:gap-6 text-center">
        <span className="text-xs md:text-sm text-muted-foreground p-2 rounded-xl bg-muted shadow-xl">
          Powered By{" "}
          <Link href="https://www.tobias.ai">
            <span className="font-bold text-[purple] dark:text-blue-500">
              Together
            </span>{" "}
            AI
          </Link>
        </span>

        {/* Title */}
        <h1 className="text-4xl mt-3 sm:text-6xl lg:text-8xl font-bold">
          Seek Your{" "}
          <span className="text-[purple] dark:text-blue-500 dark:bg-white bg-gray-200 rounded-lg px-2">
            <i>Dream</i>
          </span>{" "}
          Job
        </h1>
        <p className="text-sm sm:text-xl md:text-xl text-muted-foreground max-w-[90%] md:max-w-[80%]">
          Get personalized job recommendations based on your resume and feedback
          from AI.
        </p>
      </div>

      <div className="flex flex-col w-full max-w-[90%] sm:max-w-3xl items-center gap-4 md:gap-6">
        <InputArea
          prompt={prompt}
          setPrompt={setPrompt}
          loading={loading}
          handleSubmit={handleSubmit}
        />
        <ResumeUploader
          handleResumeUpload={handleResumeUpload}
          resumeLoading={resumeLoading}
          resume={resume}
        />
        {showConfetti && <ReactConfetti recycle={false} />}

      </div>
    </div>
  );
};

export default LandingPage;
