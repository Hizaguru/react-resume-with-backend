import React, { useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
React.useLayoutEffect = React.useEffect

type Props = {
  wrapperId: string;
  children: React.ReactNode
}

//Default value if element is not found
interface WrapperProperty {
  wrapperIds: string;

}

const defaultProp: WrapperProperty = {
  wrapperIds: "react-portal-wrapper",
}

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement("div");
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}





const ReactPortal: React.FC<Props> = (props: Props) => {
  const [wrapperElement, setWrapperElement] = useState(null);
  const { wrapperIds } = defaultProp;
  useLayoutEffect(() => {
    let element: any = document.getElementById(wrapperIds)!;
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody(wrapperIds);
    }
    setWrapperElement(element);

    return () => {
      // delete the programatically created element
      if (systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [wrapperIds]);

  // wrapperElement state will be null on the very first render.
  if (wrapperElement === null) return null;

  return createPortal(props.children, wrapperElement);

}
export default ReactPortal;