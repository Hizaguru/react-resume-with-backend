import React, {useEffect, useRef} from 'react';
import {CSSTransition} from 'react-transition-group';
import ReactPortal from './ReactPortal';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  handleClose: () => void;
};

// Modal.tsx
const Modal: React.FC<Props> = (props: Props) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => (e.key === 'Escape' ? props.handleClose() : null);
    document.body.addEventListener('keydown', closeOnEscape);
    return () => document.body.removeEventListener('keydown', closeOnEscape);
  }, [props.handleClose]);

  return (
    <ReactPortal wrapperId="react-portal-container">
      <CSSTransition
        in={props.isOpen}
        timeout={{enter: 250, exit: 300}}
        unmountOnExit
        classNames="modal"
        nodeRef={nodeRef}>
        {/* Modal root should be fixed & top layer */}
        <div ref={nodeRef} className="modal fixed inset-0 z-[1000]">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/70" onClick={props.handleClose} />
          {/* Content */}
          <div className="modal-content relative z-[1010] mx-auto my-8 max-w-4xl rounded-md bg-white p-4">
            <button
              onClick={props.handleClose}
              className="close-btn absolute right-3 top-3 z-[1020] inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 focus:outline-none focus:ring"
              aria-label="Close">
              &times;
            </button>
            {props.children}
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
};
