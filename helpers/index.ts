import { ResumeInterface } from "@/interfaces";
import { toast } from "react-hot-toast";

export const setErrorToast = (error: string, duration = 3000) => {
  toast.error(error, { duration });
};

export const examples = [
  {
    title: "Help me find a job",
  },
  {
    title: "Improve my resume",
  },
  {
    title: "I want to work in a startup",
  },

  {
    title: "Suggest career paths based on my skills",
  },
  {
    title: "Help me negotiate a better salary",
  },
  {
    title: "Find remote job opportunities",
  },

  {
    title: "I want to transition into software development",
  },
];

// This parses the AI's response because at first it is a string of html
// Returns an object with the weaknesses, improvements, and rewritten resume
export const parseAiResponse = (htmlString: string): ResumeInterface => {
  // Remove old data from local storage
  localStorage.removeItem("resume-feedback");

  // Create a DOM parser
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Find the resume elements
  const resumeEl = doc.querySelector("resume-analysis");

  // Weaknesses Section
  const weaknessesSection = resumeEl?.querySelector("weaknesses");
  // const weaknessesContent = weaknessesSection?.textContent?.trim();
  const weaknessesList = weaknessesSection?.querySelector("list");
  const weaknessesListItems = Array.from(
    weaknessesList?.querySelectorAll("item") || []
  )
    .map((item) => item.textContent?.trim())
    .filter(Boolean);

  // Improvments Section
  const improvementsSection = resumeEl?.querySelector("improvements");
  // const improvementsContent = improvementsSection?.textContent?.trim();
  const improvementsList = improvementsSection?.querySelector("list");
  const improvementsListItems = Array.from(
    improvementsList?.querySelectorAll("item") || []
  )
    .map((item) => item.textContent?.trim())
    .filter(Boolean);

  const res: ResumeInterface = {
    weaknesses: {
      content: "weaknessesContent",
      list: weaknessesListItems,
    },
    improvements: {
      content: "improvementsContent",
      list: improvementsListItems,
    },
  };

  // Save the new data to local storage
  localStorage.setItem("resume-feedback", JSON.stringify(res));

  return res;
};
