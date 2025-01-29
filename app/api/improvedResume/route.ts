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
  You are a helpful assistant that helps users improve their resume.
  You are given a user's resume and a prompt.
  You are to improve the resume based on the prompt.
  `;

  const userPrompt = `
  User prompt: ${prompt}
  User resume: ${userResume}
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
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
