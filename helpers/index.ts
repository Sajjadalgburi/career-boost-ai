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
export const parseAiResponse = (
  htmlString: string
): { weaknesses: string; improvements: string; rewrittenResume: string } => {
  // Create a DOM parser
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // Find the resume elements
  /**
 * <resume-analysis>
    <weaknesses>
      --YOUR CONTENT HERE--
    </weaknesses>
    <improvements>
      --YOUR CONTENT HERE--
    </improvements>
    <rewritten-resume>
      --YOUR CONTENT HERE--
    </rewritten-resume>
  </resume-analysis>
 */
  const resumeEl = doc.querySelector("resume-analysis");
  const weaknesses = resumeEl?.querySelector("weaknesses")?.textContent?.trim();

  const improvements = resumeEl
    ?.querySelector("improvements")
    ?.textContent?.trim();
  const rewrittenResume = resumeEl
    ?.querySelector("rewritten-resume")
    ?.textContent?.trim();

  return {
    weaknesses: weaknesses || "",
    improvements: improvements || "",
    rewrittenResume: rewrittenResume || "",
  };
};