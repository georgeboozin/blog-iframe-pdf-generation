import { useState } from "react";
import { MaterialTable } from "../components/material-table";
import { PDFGeneration } from "../components/pdf-generation/pdf-generation";

export function CssInJs() {
  const [isGenerating, setGenerating] = useState(false);
  const handleGenerate = () => {
    setGenerating(false);
  };
  return (
    <div>
      <MaterialTable />
      <button style={{ margin: 20 }} onClick={() => setGenerating(true)}>
        Generate PDF File
      </button>
      <PDFGeneration
        debug
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
      >
        <div style={{ padding: 20 }}>
          <MaterialTable />
        </div>
      </PDFGeneration>
    </div>
  );
}
