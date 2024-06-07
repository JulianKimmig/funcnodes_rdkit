import { IOType } from "@linkdlab/funcnodes_react_flow";
import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
const canvasOptions = {
  includeToolbar: true,
  oneMolecule: true,
};

declare global {
  interface Window {
    ChemDoodle: any;
  }
}

export const SketcherCanvas = ({
  id,
  width,
  height,
  data,
  canvasOptions,
}: {
  id: string;
  width?: number;
  height?: number;
  data?: { value: string; format: "mol" };
  canvasOptions: {
    includeToolbar: boolean;
    oneMolecule: boolean;
  };
}) => {
  const sketcherInstance = useRef(null);

  useEffect(() => {
    const sk = new window.ChemDoodle.SketcherCanvas(
      id,
      undefined,
      undefined,
      canvasOptions
    );
    sk.toolbarManager.setup();

    if (data) {
      console.log("AAA", data);
      if (data.value) {
        let molecule;
        if (data.format === "mol") {
          try {
            molecule = window.ChemDoodle.readMOL(data.value);
          } catch (e) {}
        }
        if (molecule) sk.loadMolecule(molecule);
      }
    }
    sketcherInstance.current = sk;
  }, []);

  return <canvas id={id} width={width} height={height} />;
};

const ChemdoodleSketcherCanvas = ({ io }: { io: IOType }) => {
  return (
    <SketcherCanvas
      id={"sketcher-canvas-" + uuidv4()}
      canvasOptions={canvasOptions}
      data={{ value: io.value, format: "mol" }}
    />
  );
};

export default ChemdoodleSketcherCanvas;
