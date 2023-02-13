import { useState } from "react";
import { BootstrapTable } from "../components/bootstrap-table";
import { PDFGeneration } from "../components/pdf-generation/pdf-generation";
import "bootstrap/dist/css/bootstrap.min.css";

export function Classic() {
  const [isGenerating, setGenerating] = useState(false);
  const handleGenerate = () => {
    setGenerating(false);
  };
  return (
    <div>
      <BootstrapTable />
      <button style={{ margin: 20 }} onClick={() => setGenerating(true)}>
        Generate PDF File
      </button>
      <PDFGeneration
        debug
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
      >
        <div style={{ padding: 20 }}>
          <BootstrapTable />
        </div>
      </PDFGeneration>
    </div>
  );
}
