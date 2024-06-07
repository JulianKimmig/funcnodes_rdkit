import React from "react";
import { Jsme } from "jsme-react";
import { IOType } from "@linkdlab/funcnodes_react_flow";
const JSMEEditorRenderer = ({ io }: { io: IOType }) => {
  const logSmiles = (smiles: string) => {
    console.log(smiles);
  };
  return (
    <Jsme
      height="100%"
      width="100%"
      options="oldlook,star"
      smiles={io.value}
      onChange={logSmiles}
      // src="https://jsme-editor.github.io/dist/jsme/jsme.nocache.js"
    />
  );
};

export default JSMEEditorRenderer;
