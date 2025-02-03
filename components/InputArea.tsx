import React, { useCallback } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { examples } from "@/helpers";

const InputArea = ({
  prompt,
  setPrompt,
  loading,
  handleSubmit,
}: {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  handleSubmit: () => void;
}) => {
  const updatePrompt = useCallback(
    (newPrompt: string) => {
      console.log("---Updating prompt to---", newPrompt);
      setPrompt(newPrompt);
    },
    [setPrompt]
  );

  return (
    <div className="flex flex-col w-full items-center gap-2">
      <div className="flex w-full items-center space-x-2 relative">
        <Input
          type="text"
          placeholder="Ask a question"
          className="h-[70px] md:h-12 lg:h-[70px] w-full  rounded-xl px-4"
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
          className="absolute right-2 top-1/2 -translate-y-1/2 h-[45px] md:h-[43px] lg:h-[55px]"
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
      <div className="flex mx-auto w-full justify-center items-center gap-2">
        <InfiniteMovingCards
          items={examples}
          direction="right"
          speed="normal"
          updatePrompt={updatePrompt}
        />
      </div>
    </div>
  );
};

export default InputArea;
