import React, { useEffect, useRef } from 'react'
import ReactPortal from './ReactPortal';
import { CSSTransition } from "react-transition-group";


type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  handleClose: () => void;
}



const Modal: React.FC<Props> = (props: Props) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => (e.key === "Escape" ? props.handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.removeEventListener("keydown", closeOnEscape);

    };
  }, [props.handleClose]);


  return (

    <ReactPortal wrapperId='react-portal-container'>
      <div className='modals-background'>
        <CSSTransition
          in={props.isOpen}
          timeout={{ enter: 0, exit: 300 }}
          unmountOnExit
          classNames="modal"
          nodeRef={nodeRef}
        >
          <div className="modal" ref={nodeRef}>
            <a onClick={props.handleClose} className="flex gap-x-2 rounded-full border-2 bg-none py-2 px-4 text-sm font-medium text-white ring-offset-gray-700/80 hover:bg-gray-700/80 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-base border-white ring-white">
              Close
            </a>
            <div className='modal-content'>{props.children}</div>
          </div>
        </CSSTransition>
      </div>
    </ReactPortal>
  );


}
export default Modal;