import { NextRequest, NextResponse } from "next/server";
import latex from "node-latex";
import fs from "fs";
import path from "path";
import { promisify } from "util";

export const runtime = "nodejs";

const writeFileAsync = promisify(fs.writeFile);

export const POST = async (req: NextRequest) => {
  try {
    const { latex_resume } = await req.json();

    // Trim the returned latex resume to only include the LaTeX code
    // const latex_resume_trimmed = latex_resume.slice(latex_resume.indexOf("%"));

    if (!latex_resume) {
      return NextResponse.json(
        { error: "No latex resume provided" },
        { status: 400 }
      );
    }

    // Create a temporary file to store the LaTeX content
    const tempFilePath = path.join(process.cwd(), "temp", "resume.tex");
    const outputPath = path.join(process.cwd(), "temp", "resume.pdf");

    // Ensure temp directory exists
    await fs.promises.mkdir(path.join(process.cwd(), "temp"), {
      recursive: true,
    });

    // Write LaTeX content to temporary file
    await writeFileAsync(tempFilePath, latex_resume);

    // Create read stream from the temporary file
    const input = fs.createReadStream(tempFilePath);
    const output = fs.createWriteStream(outputPath);

    // Convert to PDF
    return new Promise((resolve, reject) => {
      const pdf = latex(input);

      pdf.pipe(output);

      pdf.on("error", (err) => {
        console.error("Error creating PDF:", err);
        fs.unlinkSync(tempFilePath); // Clean up temp file
        reject(
          NextResponse.json({ error: "Error creating PDF" }, { status: 500 })
        );
      });

      pdf.on("end", () => {
        fs.unlinkSync(tempFilePath); // Clean up temp file
        resolve(
          NextResponse.json(
            {
              message: "PDF created successfully",
              path: outputPath,
            },
            { status: 200 }
          )
        );
      });
    });
  } catch (error) {
    console.error("Error in PDF generation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
