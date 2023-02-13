import {
  PropsWithChildren,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";
import usePDFGeneration from "./use-pdf-generation";
import { replaceCanvasToImage } from "./utils";

const CONTAINER_ID = "pdf-generation";

interface GenerationContainerProps extends PropsWithChildren {
  width?: number;
  onGenerate?: (url?: URL) => void;
}

export function GenerationContainer({
  onGenerate,
  width = 1250,
  children,
}: GenerationContainerProps) {
  const [srcDoc, setSrcDoc] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { printReport } = usePDFGeneration<HTMLIFrameElement>({
    iframeRef,
    containerId: CONTAINER_ID,
  });

  useEffect(() => {
    if (contentRef.current?.outerHTML) {
      const styles = [...window.document.querySelectorAll("style")];
      const inlineStyles = styles.map((style) => style.outerHTML).join("");
      setSrcDoc(inlineStyles);
    }
  }, []);
  const handleLoadIframe = useCallback(async () => {
    await replaceCanvasToImage(contentRef.current as Element);
    iframeRef.current?.contentWindow?.document.body.appendChild(
      contentRef?.current as Element
    );
    const url = await printReport();
    onGenerate?.(url);
  }, [printReport, onGenerate]);
  return (
    <>
      <div>
        <div
          id={CONTAINER_ID}
          style={{ width: "100%", boxSizing: "border-box" }}
          ref={contentRef}
        >
          {children}
        </div>
      </div>
      {srcDoc && (
        <iframe
          srcDoc={`<html><body>${srcDoc}</body></html>`}
          width={width}
          height={600}
          title="PDF Generation Frame"
          ref={iframeRef}
          style={{
            border: 0,
            overflow: "hidden",
          }}
          onLoad={handleLoadIframe}
        ></iframe>
      )}
    </>
  );
}
