declare module "jsme-react" {
  import * as React from "react";
  interface type {
    height: string;
    width: string;
    options: string;
    smiles: string;
    onChange: (smiles: string) => void;
  }
  export class Jsme extends React.Component<type | any> {}
}
