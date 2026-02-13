import React, {useEffect, useRef} from 'react';
import {CSSTransition} from 'react-transition-group';
import ReactPortal from './ReactPortal';

type Props = {
  isOpen: boolean;
  children: React.ReactNode;
  handleClose: () => void;
  ariaLabel?: string;
};

const Modal: React.FC<Props> = ({isOpen, children, handleClose, ariaLabel}) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  // Keyboard handling: ESC + focus trap
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose]);

  // Scroll lock + restore focus
  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => {
        closeBtnRef.current?.focus();
      });
    }
    return () => {
      document.body.style.overflow = '';
      previousFocus.current?.focus?.();
    };
  }, [isOpen]);

  // Backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <ReactPortal wrapperId="react-portal-container">
      <CSSTransition in={isOpen} timeout={{enter: 640, exit: 420}} appear unmountOnExit classNames="modal" nodeRef={nodeRef}>
        <div ref={nodeRef} className="modal" onMouseDown={handleBackdropClick}>
          <dialog ref={dialogRef} className="modal-content" open aria-modal="true" aria-label={ariaLabel}>
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Close modal"
              className="close-btn"
              onClick={handleClose}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            {children}
          </dialog>
        </div>
      </CSSTransition>
    </ReactPortal>
  );
};
export default Modal;
