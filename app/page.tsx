"use client";

import LandingPage from "@/components/LandingPage";
import React from "react";

const Page = () => {
  const [showResults, setShowResults] = React.useState<boolean>(false);

  return (
    <section>{!showResults ? <LandingPage /> : <div>Results</div>}</section>
  );
};

export default Page;
