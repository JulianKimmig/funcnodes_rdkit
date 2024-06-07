import {
  RendererPlugin,
  FuncNodesReactPlugin,
} from "@linkdlab/funcnodes_react_flow";
import ChemdoodleSketcherCanvas from "./chemdoodle/chemdoodle_renderer";

const ChemEditorRendererPlugin: RendererPlugin = {
  handle_preview_renderers: {},
  data_overlay_renderers: {
    "rdkit.Chem.rdchem.EditableMol": ChemdoodleSketcherCanvas,
  },
  data_preview_renderers: {},
  data_view_renderers: {
    "rdkit.Chem.rdchem.EditableMol": ChemdoodleSketcherCanvas,
  },
  input_renderers: {},
};

const Plugin: FuncNodesReactPlugin = {
  RendererPlugin: ChemEditorRendererPlugin,
};

export default Plugin;
