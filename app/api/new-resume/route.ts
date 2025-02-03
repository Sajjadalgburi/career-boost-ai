import { NextRequest, NextResponse } from "next/server";
import Together from "together-ai";
import { LATEX_CONTENT } from "@/helpers/ai-prompts";

export const runtime = "edge";

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY!,
  baseURL: "https://api.together.xyz/v1",
});

const systemPrompt = `
You are a professional resume writer specializing in LaTeX formatting. You will receive:
1. The user's original resume content.
2. A list of weaknesses and suggested improvements.
3. A LaTeX template containing placeholders.

## TASK:
Your job is to **enhance** the resume content based on the provided weaknesses while **strictly maintaining** the LaTeX template structure.  

## INSTRUCTIONS:
- **Replace ONLY placeholders** (e.g., IMPROVED NAME, IMPROVED PHONE, IMPROVED BULLET POINT 1) with the **improved** resume content.
- **DO NOT** alter any LaTeX commands, structure, or styling.
- If a section from the template is **not present** in the original resume, **remove it** entirely.
- Ensure **all LaTeX syntax remains valid**.

## PLACEHOLDER REPLACEMENTS:
- **IMPROVED NAME** → User's enhanced name.
- **IMPROVED PHONE** → User's phone number.
- **IMPROVED EMAIL** → User's email.
- **IMPROVED BULLET POINT 1** → Enhanced bullet point from the user's resume.
- **href** → Replace with the user's project/work link if available; otherwise, **remove it** (same applies to GitHub links).

## OUTPUT REQUIREMENTS:
- **Return ONLY the LaTeX code** with placeholders replaced.  
- **DO NOT** add any explanations, comments, or extra text before or after the output.  

Here is the LaTeX template:
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
      model: "deepseek-ai/DeepSeek-V3",
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
