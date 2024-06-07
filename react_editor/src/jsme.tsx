import React, { useCallback, useEffect } from "react";
// import jsme from "jsme-editor";
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

let jsmeIsLoaded = false;
const jsmeCallbacks: { [key: string]: () => void } = {};

// Export the setup function so that a user can override the super-lazy loading behaviour and choose to load it more eagerly.
declare global {
  interface Window {
    jsmeOnLoad: () => void;
    JSApplet: {
      JSME: JSMEAppletConstructor;
    };
  }
}

interface JSMEApplet {
  setCallBack: (event: string, callback: (event: any) => void) => void;
  readGenericMolecularInput: (smiles: string) => void;
  setSize: (width: string, height: string) => void;
  options: (options: { options: string }) => void;
}

interface JSMEAppletConstructor {
  new (
    id: string,
    width: string,
    height: string,
    options?: { options?: string }
  ): JSMEApplet;
}

export function setup() {
  //   src = "https://jsme.cloud.douglasconnect.com/JSME_2017-02-26/jsme/jsme.nocache.js"
  //   const script = document.createElement("script");
  //   script.src = src;
  //   document.head.appendChild(script);

  window.jsmeOnLoad = () => {
    Object.values(jsmeCallbacks).forEach((f) => f());
    jsmeIsLoaded = true;
  };
}

interface JsmeProps {
  height: string;
  width: string;
  smiles?: string;
  options?: any;
  onChange?: (smiles: string) => void;
}
const Jsme = ({ height, width, smiles, options, onChange }: JsmeProps) => {
  const myRef = React.useRef(null);
  const id = "jsme" + getRandomInt(1, 100000);
  const [jsmeApplet, setJsmeApplet] = React.useState<JSMEApplet | null>(null);

  const handleChange = useCallback(
    (jsmeEvent: any) => {
      if (onChange) {
        onChange(jsmeEvent.src.smiles());
      }
    },
    [onChange]
  );

  const handleJsmeLoad = () => {
    const applet: JSMEApplet = new window.JSApplet.JSME(
      id,
      width,
      height,
      options ? { options } : {}
    );
    applet.setCallBack("AfterStructureModified", handleChange);
    if (smiles) applet.readGenericMolecularInput(smiles);
    setJsmeApplet(applet);
  };
  useEffect(() => {
    if (myRef.current === null) {
      return;
    }
    if (jsmeIsLoaded) {
      handleJsmeLoad();
    } else {
      if (!window.jsmeOnLoad) {
        setup();
      }
      jsmeCallbacks[id] = handleJsmeLoad;
    }

    return () => {
      delete jsmeCallbacks[id];
    };
  }, [myRef]);

  useEffect(() => {
    if (jsmeApplet !== null && jsmeApplet !== undefined)
      jsmeApplet.setSize(width, height);
  }, [width, height]);

  useEffect(() => {
    if (jsmeApplet !== undefined && jsmeApplet !== null) {
      if (options) {
        jsmeApplet.options({ options });
      }
    }
  }, [options]);

  useEffect(() => {
    if (jsmeApplet !== undefined && jsmeApplet !== null) {
      if (smiles) {
        jsmeApplet.readGenericMolecularInput(smiles);
      }
    }
  }, [smiles]);

  return <div ref={myRef} id={id}></div>;
};

export default Jsme;
