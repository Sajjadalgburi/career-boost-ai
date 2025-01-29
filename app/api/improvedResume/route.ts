import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

const together = createOpenAI({
  apiKey: process.env.TOGETHER_API_KEY!,
  baseURL: "https://api.together.xyz/v1",
});

export async function POST(req: NextRequest) {
  const { prompt, userResume } = await req.json();

  if (!prompt || !userResume) {
    return NextResponse.json(
      { error: "Missing prompt or userResume" },
      { status: 400 }
    );
  }

  // Place holder system prompt
  // Change later
  const mainSystemPrompt = `
You are an expert resume assistant dedicated to helping users enhance their resumes. 
Your role is to analyze the given resume, identify areas for improvement, and refine it based on the user's prompt. 

Responsibilities:
- Provide constructive feedback on clarity, structure, formatting, and content.
- Improve wording, highlight achievements, and optimize for readability and impact.
- Ensure the resume aligns with best practices and industry standards.
- Maintain professionalism and clarity while preserving the user's original intent.

Return an improved version of the resume with all suggested changes incorporated.
DO NOT RETURN THE RESUME ITSELF, RATHER YOU SHOULD HIGHLIGHT THE IMPROVEMENTS IN THE RESUME.
`;

  const userPrompt = `
User request: ${prompt}
Current resume: ${userResume}
`;

  const result = await streamText({
    model: together("meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"),
    messages: [
      { role: "system", content: mainSystemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  // Create a ReadableStream to send the response
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const textPart of result.textStream) {
          controller.enqueue(textPart);
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  // Return the stream with appropriate headers

  // ! TESTING - REMOVE LATER
  return new Response("Hello World", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
