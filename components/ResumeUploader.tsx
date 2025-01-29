import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const ResumeUploader = ({
  handleResumeUpload,
  resumeLoading,
  resume,
}: {
  handleResumeUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resumeLoading: boolean;
  resume: File | null;
}) => {
  return (
    <div className="flex w-full flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
      <Input
        id="picture"
        type="file"
        onChange={handleResumeUpload}
        className="w-full sm:w-auto cursor-pointer"
      />
      <Label
        htmlFor="picture"
        className={`text-sm md:text-base cursor-pointer p-2 rounded-lg shadow-lg ${
          resume
            ? "bg-green-500 text-white"
            : "dark:bg-blue-500 bg-[purple] text-white"
        }`}
      >
        {resumeLoading
          ? "Uploading..."
          : resume
          ? "Resume uploaded"
          : "Upload resume"}
      </Label>
    </div>
  );
};

export default ResumeUploader;
