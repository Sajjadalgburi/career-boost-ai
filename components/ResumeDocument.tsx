import React, { useEffect, useState } from "react";

const ResumeDocument = () => {
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [isFetched, setIsFetched] = useState<boolean>(false);

  useEffect(() => {
    if (!isFetched) {
      const fetchPdf = async () => {
        try {
          const response = await fetch("/api/get-resume-pdf");
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setPdfUrl(url);
        } catch (error) {
          console.error("Error fetching PDF:", error);
        }
      };

      fetchPdf();
      setIsFetched(true);
    }
    // Cleanup
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [isFetched, pdfUrl]);

  if (!pdfUrl) {
    return <div>Loading PDF...</div>;
  }

  return (
    <div className="w-full h-screen">
      <object
        data={`${pdfUrl}#page=1`}
        type="application/pdf"
        width="100%"
        height="100%"
        className="rounded-lg shadow-lg"
      >
        <p>Unable to display PDF file.</p>
      </object>
    </div>
  );
};

export default ResumeDocument;
