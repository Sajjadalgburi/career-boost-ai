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
