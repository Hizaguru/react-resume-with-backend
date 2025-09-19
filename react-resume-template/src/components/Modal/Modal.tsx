import React, {useEffect, useRef} from 'react';
import ReactPortal from './ReactPortal';
import {CSSTransition} from 'react-transition-group';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  handleClose: () => void;
};

const Modal: React.FC<Props> = (props: Props) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => (e.key === 'Escape' ? props.handleClose() : null);
    document.body.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.removeEventListener('keydown', closeOnEscape);
    };
  }, [props.handleClose]);

  return (
    <ReactPortal wrapperId="react-portal-container">
      <CSSTransition
        in={props.isOpen}
        timeout={{enter: 250, exit: 300}}
        unmountOnExit
        classNames="modal"
        nodeRef={nodeRef}>
        <div className="modal" ref={nodeRef}>
          <div className="modal-content">
            <button onClick={props.handleClose} className="close-btn">
              &times;
            </button>
            {props.children}
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
};
export default Modal;
