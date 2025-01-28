import Link from "next/link";
import { Input } from "./ui/input";
import React from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

const LandingPage = () => {
  return (
    <div className="max-w-5xl container w-full flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground p-2 rounded-xl bg-muted">
          Powered By{" "}
          <Link href="https://www.tobias.ai">
            <span className="font-bold text-[purple] dark:text-blue-500">
              Together
            </span>{" "}
            AI
          </Link>
        </span>
        <h1 className="lg:text-8xl text-2xl font-bold">
          Seek Your{" "}
          <span className="text-[purple] dark:text-blue-500">
            <i>Dream</i>
          </span>{" "}
          Job
        </h1>
        <p className="text-xl text-muted-foreground">
          Get personalized job recommendations based on your skills and
          interests.
        </p>
      </div>

      <div className="flex flex-col w-full sm:max-w-3xl items-center gap-2">
        <div className="flex w-full max-w-sm md:max-w-3xl items-center space-x-2 relative">
          <Input
            type="text"
            placeholder="Ask a question"
            className="h-12 md:h-[70px] w-full shadow-xl rounded-xl"
            required
            minLength={7}
            maxLength={100}
          />
          <Button
            type="submit"
            className="absolute right-2 top-[10px] h-12 md:h-[50px]"
          >
            Submit
          </Button>
        </div>

        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input id="picture" type="file" />
          <Label htmlFor="picture">Add resume</Label>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
