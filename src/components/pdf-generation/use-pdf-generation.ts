import { useCallback } from "react";
import html2canvas from "html2canvas"; // https://github.com/cburgmer/rasterizeHTML.js
import { jsPDF } from "jspdf";

export default function useGeneration<T extends HTMLIFrameElement>({
  iframeRef,
  containerId,
  defaultHeight = 1200,
  defaultWidth = 1200,
}: {
  iframeRef: React.RefObject<T>;
  containerId: string;
  defaultHeight?: number;
  defaultWidth?: number;
}) {
  const generatePDF = useCallback(() => {
    if (!iframeRef.current) return;

    const height =
      iframeRef.current?.contentWindow?.window.document.getElementById(
        containerId
      )?.clientHeight || defaultHeight;

    const width =
      iframeRef.current?.contentWindow?.window.document.getElementById(
        containerId
      )?.clientWidth || defaultWidth;

    const container =
      iframeRef.current?.contentWindow?.window.document.getElementById(
        containerId
      ) || iframeRef.current;

    return html2canvas(container, {
      width,
      height,
    }).then((canvas: HTMLCanvasElement) => {
      const imgData = canvas.toDataURL("image/png", 1);
      const orientation = width > height ? "l" : "p";
      const pdf = new jsPDF(orientation, "pt", [width, height]);
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      const pdfBlobUrl = pdf.output("bloburl");
      window.open(pdfBlobUrl);

      return pdfBlobUrl;
    });
  }, [defaultHeight, defaultWidth, iframeRef, containerId]);

  const printReport = useCallback(() => {
    return generatePDF();
  }, [generatePDF]);

  return { printReport };
}
