import { mainSystemPrompt } from "@/helpers/ai-prompts";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

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

  const userPrompt = `
User request: ${prompt}. Current resume: ${userResume}
`;

  const result = streamText({
    model: together("meta-llama/Llama-3.3-70B-Instruct-Turbo"),
    messages: [
      { role: "system", content: mainSystemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  // ! NOTE; Make sure that the response is ACTUALLY streamed.
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
