import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    return (
      <Button className="flex items-center gap-2">
        {/* add spinner later on */}
        Loading PDF... <span className="animate-spin"></span>
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-gray-100 transition-colors"
        >
          View Improved Resume
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[1200px] h-[90vh] p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold">
            Your Improved Resume
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Review your AI-enhanced resume below. You can scroll, zoom, and
            download the PDF.
          </DialogDescription>
        </DialogHeader>

        {/* Make embed responsive on smaller screens */}
        <div className="flex-1 w-full h-[calc(90vh-120px)] overflow-hidden">
          <embed
            src={`${pdfUrl}#page=1&zoom=page-width`}
            type="application/pdf"
            className="w-full h-full object-contain rounded-lg shadow-lg border border-gray-200"
            style={{
              minHeight: "300px",
              maxHeight: "100%",
              WebkitOverflowScrolling: "touch",
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeDocument;
