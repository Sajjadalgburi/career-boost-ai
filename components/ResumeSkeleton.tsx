import React from "react";
import { Skeleton } from "./ui/skeleton";
const ResumeSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Analyzing your resume...</h1>
      <Skeleton className="w-full h-[150px]" />
      <Skeleton className="w-full h-[50px]" />
      <Skeleton className="w-full h-[250px]" />
    </div>
  );
};

export default ResumeSkeleton;
