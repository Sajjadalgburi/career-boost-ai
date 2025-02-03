/**
 * This is a GET route to read the resume.pdf file from the temp folder and return it as a response.
 */

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const GET = async () => {
  try {
    const pdfPath = path.join(process.cwd(), "temp", "resume.pdf");

    if (!fs.existsSync(pdfPath)) {
      return NextResponse.json(
        { error: "PDF file not found" },
        { status: 404 }
      );
    }

    const pdfBuffer = await fs.promises.readFile(pdfPath);

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=resume.pdf",
      },
    });
  } catch (error) {
    console.error("Error serving PDF:", error);
    return NextResponse.json({ error: "Error serving PDF" }, { status: 500 });
  }
};
