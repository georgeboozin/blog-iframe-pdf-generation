import { PropsWithChildren } from "react";
import { GenerationContainer } from "./generation-container";

interface Props extends PropsWithChildren {
  isGenerating?: boolean;
  width?: number;
  debug?: boolean;
  onGenerate: () => void;
}

export function PDFGeneration({
  isGenerating,
  width = 1000,
  debug,
  onGenerate,
  children,
}: Props) {
  return (
    <div
      style={{
        position: "fixed",
        opacity: debug ? 1 : 0,
        top: debug ? 0 : "100vh",
        backgroundColor: debug ? "#fff" : "none",
      }}
    >
      {isGenerating && (
        <GenerationContainer width={width} onGenerate={onGenerate}>
          {children}
        </GenerationContainer>
      )}
    </div>
  );
}
