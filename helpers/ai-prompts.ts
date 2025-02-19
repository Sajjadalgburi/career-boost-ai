export const LATEX_CONTENT = `
%-------------------------
% Resume in Latex
% Author : Jake Gutierrez
% Based off of: https://github.com/sb2nov/resume
% License : MIT
%------------------------


$ ----- Leave this section alone and this tag -----

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


$ ----- Leave this section alone and this tag -----
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

%-- You're almost there, just make sure to close the document tag at the end of the response --%

\\section{Work Experience}
\\resumeSubHeadingListStart
\\ % ---- REPEAT FOR EACH JOB ----
\\resumeProjectHeading
    {\\textbf{IMPROVED JOB TITLE} $|$ \\emph{IMPROVED COMPANY} $|$
    \\href{ADD LINK OF LIVE SITE}{\\underline{Live Site}} $|$
    \\href{ADD LINK OF GITHUB> IF THERE ISNT THEN REMOVE THIS PIECE}{\\underline{Github}} } {IMPROVED DATES}
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
    \\href{ADD LINK OF LIVE SITE}{\\underline{Live Site}} $|$
    \\href{ADD LINK OF GITHUB> IF THERE ISNT THEN REMOVE THIS PIECE}{\\underline{Github}} }{DATE IF THERE ISN'T, THEN REMOVE THE DATE}
    \\resumeItemListStart
        \\resumeItem{IMPROVED PROJECT BULLET 1}
        \\resumeItem{IMPROVED PROJECT BULLET 2}
        \\resumeItem{IMPROVED PROJECT BULLET 3}
    \\resumeItemListEnd
\\resumeSubHeadingListEnd

\\section{Coursework \& Certifications}
    %----- if both courses and certifications are not present, then remove the section -----
    \\resumeSubHeadingListStart
          \\resumeSubSubheading{Relevant Coursework:}{IMPROVED COURSEWORK IF THERE ISN'T, THEN REMOVE THE COURSEWORK}
    \\resumeSubHeadingListEnd
    \\resumeSubHeadingListStart
        \\resumeSubSubheading{Certifications:}{IMPROVED CERTIFICATIONS IF THERE ISN'T, THEN REMOVE THE CERTIFICATIONS}
\\resumeSubHeadingListEnd
\\ % ---- ALWAYS CLOSE OFF THE DOCUMENT TAG ----
\\end{document}
`;

export const mainSystemPrompt = `
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
        <item>Specific weakness point 3</item>
      </list>
    </weaknesses>
    <improvements>
      <list>
        <item>Specific improvement suggestion 1</item>
        <item>Specific improvement suggestion 2</item>
        <item>Specific improvement suggestion 3</item>
      </list>
    </improvements>
    <linkedIn-Job-Queries>
      <country>
          <item>List the users country</item>
      </country>

      <job-title>
        <list>
          <item>List the user's wanted job or current job as title to be searched for on linkedin</item>
          <item>List the user's wanted job or current job as title to be searched for on linkedin</item>
        </list>
      </job-title>

      <programing-languages>
        <item>List of programing languages the userrr is proficient in</item>
        <item>List of programing languages the userrr is proficient in</item>
        <item>List of programing languages the userrr is proficient in</item>
      </programing-languages>
    </linkedIn-Job-Queries>
  </resume-analysis>


Important Notes:
- Provide actionable suggestions to improve the resume.
- Make sure to properly close ALL XML tags, especially </resume-analysis>
- The entire response must be valid XML with no unclosed tags
- Try to be as specific as possible with the suggestions To help the user.
`;
