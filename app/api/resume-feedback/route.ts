import { mainSystemPrompt } from "@/helpers/ai-prompts";
import { NextRequest, NextResponse } from "next/server";
import Together from "together-ai";

export const config = {
  runtime: "edge",
};

const together = new Together({
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

  try {
    const response = await together.chat.completions.create({
      messages: [
        { role: "system", content: mainSystemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      temperature: 0.4,
      top_p: 0.8,
      top_k: 40,
      repetition_penalty: 1,
      stop: ["<|eot_id|>", "<|eom_id|>"],
      stream: true,
    });

    // Check if the response is iterable
    if (!response || typeof response[Symbol.asyncIterator] !== "function") {
      throw new Error("Response is not iterable");
    }

    // Create a ReadableStream to send the response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const textPart of response) {
            controller.enqueue(textPart);
          }
          controller.close();
        } catch (error) {
          console.error("Error during streaming:", error);
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
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Error creating completion:", error);
    return NextResponse.json(
      { error: "Failed to create completion" },
      { status: 500 }
    );
  }
}
