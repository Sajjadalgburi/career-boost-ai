import * as pdfjs from "pdfjs-dist/build/pdf.min.mjs";
import type { TextContent, TextItem } from "pdfjs-dist/types/src/display/api";

import { NextRequest, NextResponse } from "next/server";

function mergeTextItems(textContent: TextContent) {
  return textContent.items
    .map((item) => {
      const { str, hasEOL } = item as TextItem;
      return hasEOL ? `${str}\n` : str;
    })
    .join("");
}

export async function POST(req: NextRequest) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
      );
    }

    console.log("Initializing extract-text route");
    const formData = await req.formData();
    const [file] = formData.getAll("file") as unknown as File[];

    // if not file uploaded, return error
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!file.type.includes("pdf")) {
      return NextResponse.json({ error: "File is not a PDF" }, { status: 429 });
    }

    const fileBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(fileBuffer);

    // initialize pdfjs
    await import("pdfjs-dist/build/pdf.worker.mjs");

    // load the pdf from the buffer
    const loadingTask = pdfjs.getDocument({ data: fileData });
    const pdf = await loadingTask.promise;

    if (!pdf.numPages) {
      return NextResponse.json(
        { text: null },
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // get the text content of the pdf
    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();

    // merge the text items because pdfjs returns an array of text items
    const extractedText = mergeTextItems(textContent);

    console.log("Resume uploaded successfully");
    return NextResponse.json({ text: extractedText });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
