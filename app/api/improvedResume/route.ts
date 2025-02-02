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

  const mainSystemPrompt = `
You are an expert resume assistant dedicated to helping users enhance their resumes.  
Your role is to analyze the given resume and ONLY replace the placeholder values while maintaining the exact LaTeX structure.

## TASK 1: Resume Analysis  
- Analyze the user's resume and highlight both **strong** and **weak** areas.  
- Provide **detailed feedback** on content and presentation.
- Ensure suggestions align with **industry best practices**.

## TASK 2: Resume Improvement  
- Based on your analysis, provide an improved version by ONLY replacing the placeholder values.
- Maintain ALL existing LaTeX commands, structure, and formatting exactly as provided.
- DO NOT modify any LaTeX formatting or structure - only replace placeholder content.

## TASK 3: Output Format. MAKE SURE TO FOLLOW THIS FORMAT.   
Return the results in the following XML structure:
<resume-analysis>
  <weaknesses>
    <list>
      <item>Specific weakness point 1</item>
      <item>Specific weakness point 2</item>
    </list>
  </weaknesses>
  
    <improvements>
    <improvements>
      --YOUR CONTENT HERE--
      Provide actionable suggestions to improve the resume.
  <improvements>
      --YOUR CONTENT HERE--
      Provide actionable suggestions to improve the resume.
    <list>
      <item>Specific improvement suggestion 1</item>
      <item>Specific improvement suggestion 2</item>
    </list>
  </improvements>
  
  <rewritten-resume>
%-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{} % clear all header and footer fields
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

%-------------------------
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}
\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\begin{document}

\\begin{center}
    \\textbf{\\Huge \\scshape {IMPROVED NAME}} \\\\ \\vspace{1pt}
    {{IMPROVED PHONE}} $|$
    \\small \\href{mailto:IMPROVED EMAIL}{\\underline{IMPROVED EMAIL}} $|$ 
    \\href{https://linkedin.com/in/PROFILE}{\\underline{linkedin.com/in/IMPROVED PROFILE}} $|$
    \\href{https://github.com/USERNAME}{\\underline{github.com/IMPROVED USERNAME}} $|$ {IMPROVED LOCATION}
\\end{center}

\\section{Education}
\\resumeSubHeadingListStart
\\resumeSubheading
    {IMPROVED UNIVERSITY NAME}{IMPROVED GRADUATION DATE}
    {IMPROVED DEGREE PROGRAM}{}
\\resumeSubHeadingListEnd

\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{Languages}{: IMPROVED LANGUAGES} \\\\
     \\textbf{Frameworks}{: IMPROVED FRAMEWORKS} \\\\
     \\textbf{Databases}{: IMPROVED DATABASES} \\\\
     \\textbf{Developer Tools}{: IMPROVED TOOLS} \\\\
     \\textbf{Libraries}{: IMPROVED LIBRARIES}
    }}
\\end{itemize}

\\section{Work Experience}
\\resumeSubHeadingListStart
\\ % ---- REPEAT FOR EACH JOB ----
\\resumeProjectHeading
    {\\textbf{IMPROVED JOB TITLE} $|$ \\emph{IMPROVED COMPANY} $|$
    \\href{LINK OF LIVE SITE}{\\underline{Live Site}} $|$
    \\href{LINK OF GITHUB. IF THERE ISNT, THEN GITHUB HOMEPAGE}{\\underline{Github}} } {IMPROVED DATES}
    \\resumeItemListStart
        \\resumeItem{IMPROVED BULLET POINT 1}


        \\resumeItem{IMPROVED BULLET POINT 2}
        \\resumeItem{IMPROVED BULLET POINT 3}
    \\resumeItemListEnd
\\resumeSubHeadingListEnd

\\section{Projects}
\\resumeSubHeadingListStart
\\ % ---- REPEAT FOR EACH PROJECT ----
\\resumeProjectHeading
    {\\textbf{IMPROVED PROJECT NAME} $|$ \\emph{IMPROVED TECHNOLOGIES} $|$
    \\href{LINK OF LIVE SITE}{\\underline{Live Site}} $|$
    \\href{LINK OF GITHUB. IF THERE ISNT, THEN GITHUB HOMEPAGE}{\\underline{Github}} }{DATE IF THERE ISN'T, THEN REMOVE THE DATE}
    \\resumeItemListStart
        \\resumeItem{IMPROVED PROJECT BULLET 1}
        \\resumeItem{IMPROVED PROJECT BULLET 2}
        \\resumeItem{IMPROVED PROJECT BULLET 3}
    \\resumeItemListEnd
\\resumeSubHeadingListEnd

\\section{Coursework \\& Certifications}
    \\resumeSubSubheadingLeft{Relevant Coursework:}{IMPROVED COURSEWORK IF THERE ISN'T, THEN REMOVE THE COURSEWORK}
    \\vspace{-14pt}
    \\resumeSubSubheadingLeft{Certifications:}{IMPROVED CERTIFICATIONS IF THERE ISN'T, THEN REMOVE THE CERTIFICATIONS}

\\ % ---- ALWAYS CLOSE OFF THE DOCUMENT TAG ----
\\end{document}
  </rewritten-resume>
</resume-analysis>

Important Notes:
1. DO NOT modify any LaTeX commands or structure
2. ONLY replace the IMPROVED placeholder text
3. Maintain all existing formatting, spacing, and commands exactly as provided
4. Ensure proper escaping of LaTeX special characters
5. Keep all sections in the same order and with the same formatting.
6. Do not add any additional sections or content.
7. Lastly, make sure you closes off the \\end{document} tag after completing the task.
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
