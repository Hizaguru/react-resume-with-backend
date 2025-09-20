import React, {useEffect, useRef} from 'react';
import {CSSTransition} from 'react-transition-group';
import ReactPortal from './ReactPortal';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  handleClose: () => void;
  showCloseButton?: boolean;
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

  // Funktio joka sulkee modaalin kun klikkaat taustan
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      props.handleClose();
    }
  };

  return (
    <ReactPortal wrapperId="react-portal-container">
      <CSSTransition
        in={props.isOpen}
        timeout={{enter: 250, exit: 300}}
        unmountOnExit
        classNames="modal"
        nodeRef={nodeRef}>
        <div className="modal" ref={nodeRef} onClick={handleBackdropClick}>
          <div className="modal-content">
            {props.showCloseButton !== false && (
              <button type="button" aria-label="Close modal" className="close-btn" onClick={props.handleClose}>
                &times;
              </button>
            )}
            {props.children}
          </div>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
};
export default Modal;
