import Link from "next/link";
import { Input } from "./ui/input";
import React from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import dynamic from "next/dynamic";
import { LandingPageProps } from "@/interfaces";
const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

const LandingPage: React.FC<LandingPageProps> = ({
  handleSubmit,
  showConfetti,
  handleResumeUpload,
  error,
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
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold">
          Seek Your{" "}
          <span className="text-[purple] dark:text-blue-500">
            <i>Dream</i>
          </span>{" "}
          Job
        </h1>
        <p className="text-sm sm:text-xl md:text-xl text-muted-foreground max-w-[90%] md:max-w-[80%]">
          Get personalized job recommendations based on your skills and
          interests.
        </p>
      </div>

      <div className="flex flex-col w-full max-w-[90%] sm:max-w-3xl items-center gap-4 md:gap-6">
        <div className="flex w-full items-center space-x-2 relative">
          <Input
            type="text"
            placeholder="Ask a question"
            className="h-[70px] md:h-12 lg:h-[70px] w-full shadow-xl rounded-xl px-4"
            required
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            minLength={7}
            maxLength={100}
          />
          <Button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-[40px] sm:h-[55px]"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>

        <div className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <Input
            id="picture"
            type="file"
            onChange={handleResumeUpload}
            className="w-full sm:w-auto cursor-pointer"
          />
          <Label
            htmlFor="picture"
            className={`text-sm md:text-base cursor-pointer p-2 rounded-xl shadow-xl ${
              resume
                ? "bg-green-500 text-white"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {resumeLoading
              ? "Uploading..."
              : resume
              ? "Resume uploaded"
              : "Upload resume"}
          </Label>
        </div>
        {showConfetti && <ReactConfetti recycle={false} />}

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default LandingPage;
