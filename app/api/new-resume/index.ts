import { NextRequest, NextResponse } from "next/server";
import Together from "together-ai";
import { LATEX_CONTENT } from "@/helpers/ai-prompts";

export const config = {
  runtime: "edge",
};

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY!,
  baseURL: "https://api.together.xyz/v1",
});

const systemPrompt = `
You are a resume writer. You will be given:
1. A list of weaknesses and improvements identified from the user's resume
2. The user's original resume content
3. A LaTeX template structure

Your TASK is to:
1. Take the user's original resume content and improve it based on the provided weaknesses and improvements
2. Replace ONLY the placeholder values in the LaTeX template (marked as IMPROVED_*) with the enhanced content from the user's resume
3. Maintain the EXACT LaTeX structure and formatting - do not modify any LaTeX commands or styling

IMPORTANT RULES:
- Only replace placeholder values (e.g., IMPROVED NAME, IMPROVED PHONE, etc.)
- Keep all LaTeX commands, structure, and formatting exactly as provided
- Use the improvements list to enhance the content while maintaining professional tone
- If certain sections don't exist in the original resume, keep them empty or remove them
- Ensure all LaTeX syntax remains valid

Example of what to replace:
- IMPROVED NAME -> Enhanced version of user's name
- IMPROVED PHONE -> User's phone number
- IMPROVED EMAIL -> User's email
- IMPROVED BULLET POINT 1 -> Enhanced version of user's bullet point
etc.

The output should be the complete LaTeX document with ONLY the placeholder values replaced with improved content from the user's resume.

LaTeX Content Format:
${LATEX_CONTENT}
`;

export const POST = async (req: NextRequest) => {
  const { weaknesses, improvements, originalResume } = await req.json();

  if (!weaknesses || !improvements || !originalResume) {
    console.log("Missing weaknesses, improvements, or original resume content");
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

    return NextResponse.json(response, {
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
