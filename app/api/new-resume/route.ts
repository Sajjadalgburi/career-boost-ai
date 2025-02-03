import { NextRequest, NextResponse } from "next/server";
import Together from "together-ai";
import { LATEX_CONTENT } from "@/helpers/ai-prompts";

export const runtime = "edge";

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY!,
  baseURL: "https://api.together.xyz/v1",
});

const systemPrompt = `
You are a LaTeX resume formatter. You will process:
1. Original resume content
2. Weaknesses list
3. LaTeX template with placeholders

CRITICAL RULES:
1. Output ONLY pure LaTeX code - no explanations, no markdown, no code blocks
2. Never add messages before or after the LaTeX code
3. Preserve ALL LaTeX formatting, commands, and structure
4. Always include ALL closing tags and commands
5. Replace ONLY the placeholder content:
   - IMPROVED NAME → Enhanced name
   - IMPROVED PHONE → Phone number
   - IMPROVED EMAIL → Email
   - IMPROVED BULLET POINT X → Enhanced bullet points
   - href → User's links (remove if none)

FORBIDDEN:
- DO NOT add "Here's the result:"
- DO NOT wrap output in any markdown code blocks
- DO NOT add any commentary
- DO NOT modify LaTeX structure
- DO NOT remove LaTeX styling

Your entire response must be valid LaTeX code that starts with \documentclass and ends with \end{document}

MAKE SURE THE ENTIER RESUME IS RETURNED/FINISHED BEFORE YOU RETURN THE RESPONSE. MY LIFE DEPENDS ON IT.
LaTeX Template:
${LATEX_CONTENT}
`;

export const POST = async (req: NextRequest) => {
  console.log("----New Resume API is called----");
  const { weaknesses, improvements, originalResume } = await req.json();

  if (!weaknesses || !improvements || !originalResume) {
    console.error(
      "Missing weaknesses, improvements, or original resume content"
    );
    return NextResponse.json(
      { error: "Missing weaknesses, improvements, or original resume content" },
      { status: 400 }
    );
  }

  try {
    const response = await together.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `Original Resume: ${originalResume}\n\nWeaknesses: ${JSON.stringify(
            weaknesses
          )}\n\nImprovements: ${JSON.stringify(improvements)}`,
        },
      ],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      temperature: 0.4,
      top_p: 0.8,
      top_k: 40,
      repetition_penalty: 1,
      stop: ["<|eot_id|>", "<|eom_id|>"],
    });

    const results = response?.choices[0]?.message?.content;

    return NextResponse.json(results, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Error during streaming:", error);
    return NextResponse.json(
      { error: "Error during streaming" },
      { status: 500 }
    );
  }
};
