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

  const mainSystemPrompt = `
You are an expert resume assistant dedicated to helping users enhance their resumes.  
Your role is to analyze the given resume, identify areas for improvement, and refine it based on the user's additional input.  

## TASK 1: Resume Analysis  
- Analyze the user's resume and highlight both **strong** and **weak** areas.  
- Provide **detailed feedback** on grammar, structure, and content.  
- Ensure the resume aligns with **industry best practices** and **professional standards** while maintaining the user's original intent.  

## TASK 2: Resume Improvement  
- Based on your analysis and the user’s additional instructions, provide **a rewritten, improved version of the resume.**  
- Maintain a **clear, professional tone** while incorporating the suggested changes.  
- If the user requests **only feedback**, do not rewrite the resume—just list suggested improvements.  

## TASK 3: Output Format  
- Return the results in **html format**.  
- Use the following structure:
  <resume-analysis>
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

I repeat, DO NOT RETURN THE RESUME ITSELF, RATHER YOU SHOULD HIGHLIGHT THE IMPROVEMENTS IN THE RESUME.
`;

  const userPrompt = `
User request: ${prompt}. Current resume: ${userResume}
`;

  const result = await streamText({
    model: together("meta-llama/Llama-3.3-70B-Instruct-Turbo"),
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

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
